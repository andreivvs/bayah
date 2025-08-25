import express from 'express';
import { sendTelegramMessage } from '../utils/sendTelegramMessage';
const router = express.Router();

router.post('/', async (req, res) => {
  const { telegramId, message } = req.body;
  try {
    await sendTelegramMessage(telegramId, message);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to send Telegram notification' });
  }
});

export default router;