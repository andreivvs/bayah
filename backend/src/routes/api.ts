import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

// PROPERTIES
router.get('/properties', async (req, res) => {
  const properties = await prisma.property.findMany({
    include: { calendarSlots: true, shares: true }
  });
  res.json(properties);
});

// SHARES
router.get('/shares', async (req, res) => {
  const { userId } = req.query;
  const shares = await prisma.share.findMany({
    where: { userId: Number(userId) },
    include: { property: true }
  });
  res.json(shares);
});

// CALENDAR
router.get('/calendar', async (req, res) => {
  const { propertyId } = req.query;
  const slots = await prisma.calendarSlot.findMany({
    where: { propertyId: Number(propertyId) },
    orderBy: { weekStart: 'asc' }
  });
  res.json(slots);
});

// BOOKINGS (очередность)
router.post('/bookings/request', async (req, res) => {
  const { shareId, slotId, comment } = req.body;
  const slot = await prisma.calendarSlot.findUnique({ where: { id: slotId } });
  if (!slot?.isAvailable) return res.status(400).json({ error: 'Slot not available' });

  const shareBookings = await prisma.booking.findMany({
    where: { shareId, status: 'confirmed' }
  });
  const status = shareBookings.length < 2 ? 'pending' : 'queue';

  const booking = await prisma.booking.create({
    data: { shareId, slotId, comment, status }
  });
  res.json(booking);
});

router.post('/bookings/:id/confirm', async (req, res) => {
  const booking = await prisma.booking.update({
    where: { id: Number(req.params.id) },
    data: { status: 'confirmed' }
  });
  await prisma.calendarSlot.update({
    where: { id: booking.slotId },
    data: { isAvailable: false }
  });
  res.sendStatus(200);
});
router.post('/bookings/:id/reject', async (req, res) => {
  await prisma.booking.update({
    where: { id: Number(req.params.id) },
    data: { status: 'rejected' }
  });
  res.sendStatus(200);
});

// История
router.get('/history', async (req, res) => {
  const { userId, type, periodStart, periodEnd } = req.query;
  const shares = await prisma.share.findMany({ where: { userId: Number(userId) } });

  const bookings = await prisma.booking.findMany({
    where: {
      shareId: { in: shares.map(s => s.id) },
      ...(type === 'booking' && { status: { not: 'rejected' } }),
      ...(periodStart && periodEnd && {
        slot: { weekStart: { gte: new Date(periodStart as string) }, weekEnd: { lte: new Date(periodEnd as string) } }
      })
    },
    include: { slot: true }
  });

  const swaps = await prisma.swap.findMany({
    where: {
      OR: [
        { fromShareId: { in: shares.map(s => s.id) } },
        { toShareId: { in: shares.map(s => s.id) } }
      ],
      ...(type === 'swap' && { status: { not: 'rejected' } }),
      ...(periodStart && periodEnd && {
        week: { gte: new Date(periodStart as string), lte: new Date(periodEnd as string) }
      })
    }
  });

  res.json({ bookings, swaps });
});

// SWAPS
router.post('/swaps/request', async (req, res) => {
  const { fromShareId, toShareId, week, message } = req.body;
  const booking = await prisma.booking.findFirst({
    where: { shareId: fromShareId, slot: { weekStart: new Date(week) }, status: 'confirmed' }
  });
  if (!booking) return res.status(400).json({ error: 'Week not booked by owner' });

  const swap = await prisma.swap.create({
    data: { fromShareId, toShareId, week: new Date(week), status: 'pending', message }
  });
  res.json(swap);
});

router.post('/swaps/:id/accept', async (req, res) => {
  const swap = await prisma.swap.update({
    where: { id: Number(req.params.id) },
    data: { status: 'confirmed' }
  });
  await prisma.booking.updateMany({
    where: { shareId: swap.fromShareId, slot: { weekStart: swap.week } },
    data: { shareId: swap.toShareId }
  });
  res.sendStatus(200);
});
router.post('/swaps/:id/reject', async (req, res) => {
  await prisma.swap.update({
    where: { id: Number(req.params.id) },
    data: { status: 'rejected' }
  });
  res.sendStatus(200);
});

// PROFILE
router.get('/profile', async (req, res) => {
  const { userId } = req.query;
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  const shares = await prisma.share.findMany({ where: { userId: Number(userId) }, include: { property: true } });
  res.json({ user, shares });
});

export default router;