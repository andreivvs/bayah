export async function telegramAuth() {
  const initData = window.Telegram?.WebApp?.initData;
  const res = await fetch('/api/auth/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initData }),
  });
  return res.json();
}