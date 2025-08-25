import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

// Users
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Properties
router.get('/properties', async (req, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

// Calendar slots
router.get('/calendar/:propertyId', async (req, res) => {
  const slots = await prisma.calendarSlot.findMany({
    where: { propertyId: Number(req.params.propertyId) },
  });
  res.json(slots);
});

// Swaps moderation
router.get('/swaps/pending', async (req, res) => {
  const swaps = await prisma.swap.findMany({
    where: { status: 'pending' },
  });
  res.json(swaps);
});

router.post('/swaps/:id/confirm', async (req, res) => {
  await prisma.swap.update({
    where: { id: Number(req.params.id) },
    data: { status: 'confirmed' },
  });
  res.sendStatus(200);
});

router.post('/swaps/:id/reject', async (req, res) => {
  await prisma.swap.update({
    where: { id: Number(req.params.id) },
    data: { status: 'rejected' },
  });
  res.sendStatus(200);
});

// Calendar slot management
router.post('/calendar/:propertyId/add', async (req, res) => {
  const { weekStart, weekEnd, isPriority } = req.body;
  await prisma.calendarSlot.create({
    data: {
      propertyId: Number(req.params.propertyId),
      weekStart: new Date(weekStart),
      weekEnd: new Date(weekEnd),
      isPriority,
      isAvailable: true,
    }
  });
  res.sendStatus(201);
});

router.post('/calendar/:slotId/block', async (req, res) => {
  await prisma.calendarSlot.update({
    where: { id: Number(req.params.slotId) },
    data: { isAvailable: false, isPriority: true },
  });
  res.sendStatus(200);
});

export default router;