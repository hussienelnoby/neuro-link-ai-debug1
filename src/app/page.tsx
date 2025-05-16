// src/app/page.tsx
import WalletConnect from '../components/WalletConnect';;

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">NeuroLinkAI Presale</h1>
      <WalletConnect onConnect={pk => console.log('Connected:', pk)} />
    </main>
  );
}
