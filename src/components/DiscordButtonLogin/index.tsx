import { DiscordLogo } from 'phosphor-react';
import { useRouter } from 'next/router';

export default function DiscordButtonLogin() {
  const router = useRouter();

  async function handleLoginDiscord() {
    router.push('http://localhost:1337/api/connect/discord');
  }
  return (
    <button
      type="button"
      onClick={handleLoginDiscord}
      style={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      Login com o Discord <DiscordLogo size={30} color="#1849e9" />
    </button>
  );
}
