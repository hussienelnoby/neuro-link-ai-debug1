'use client';

import { useState, useEffect } from 'react';
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from '@solana/web3.js';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      publicKey?: { toString(): string };
      connect(): Promise<{ publicKey: any }>;
      on(event: 'connect', handler: () => void): void;
    };
  }
}

export default function WalletConnect({
  onConnect,
}: {
  onConnect: (pk: string) => void;
}) {
  const [addr, setAddr] = useState<string | null>(null);

  useEffect(() => {
    if (window.solana?.isPhantom) {
      window.solana.on('connect', () => {
        const pk = window.solana!.publicKey!.toString();
        setAddr(pk);
        onConnect(pk);
      });
    }
  }, [onConnect]);

  const connect = async () => {
    if (window.solana?.isPhantom) {
      try {
        const resp = await window.solana.connect();
        // في بعض نسخ Phantom لا تُطلق حدث 'connect' آلياً،
        // فنعالج هنا:
        const pk = resp.publicKey.toString();
        setAddr(pk);
        onConnect(pk);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('رجاءً ثبّت إضافة Phantom في متصفحك أولاً');
    }
  };

  return (
    <button
      onClick={connect}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded"
    >
      {addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : 'Connect Phantom'}
    </button>
  );
}
