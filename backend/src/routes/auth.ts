import express from 'express';
import { verifyTelegramAuth } from '../utils/verifyTelegramAuth';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

router.post('/telegram', async (req, res) => {
  const { initData } = req.body;
  const userData = verifyTelegramAuth(initData, TELEGRAM_BOT_TOKEN);
  if (!userData) return res.status(401).json({ error: 'Invalid Telegram auth' });
  let user = await prisma.user.findUnique({ where: { telegramId: userData.id } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId: userData.id,
        name: `${userData.first_name} ${userData.last_name || ''}`.trim(),
        role: 'owner',
      },
    });
  }
  res.json({ user });
});

export default router;