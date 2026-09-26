'use client';

import { useEffect } from 'react';
import { useStore } from '@/context/StoreContext';

export default function Backdrop() {
  const { anyOverlayOpen, closeAll } = useStore();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') closeAll();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeAll]);

  return <div className={`backdrop${anyOverlayOpen ? ' show' : ''}`} onClick={closeAll} />;
}
