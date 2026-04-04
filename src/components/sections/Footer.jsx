import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo2.png" alt="WorldPac Logistics" className="h-8 brightness-200" />
        </Link>
        <p className="text-sm">&copy; {new Date().getFullYear()} WorldPac Logistics. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/services" className="text-xs uppercase tracking-wider hover:text-white transition-colors">Services</Link>
          <Link href="/about-us" className="text-xs uppercase tracking-wider hover:text-white transition-colors">About</Link>
          <Link href="/contact-us" className="text-xs uppercase tracking-wider hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
