import Link from 'next/link';

export const metadata = {
  title: 'Admin - Zwijsen Rekenen',
  description: 'Content editor dashboard'
};

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f0ff 0%, #fff9f0 100%)' }}>
      <header className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 shadow-lg" style={{ borderBottom: '4px solid #0099CC' }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl">🔧</div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <Link href="/" className="text-white hover:text-blue-100 font-semibold">
            ← Terug naar app
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
