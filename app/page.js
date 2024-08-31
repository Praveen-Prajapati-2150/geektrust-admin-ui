import Image from 'next/image';
import AdminUI from './admin-ui';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Geektrust Admin-UI</h1>
      <AdminUI />
    </main>
  );
}
