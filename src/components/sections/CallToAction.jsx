import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          Ready to Optimize Your Supply Chain?
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
          Partner with WorldPac Logistics for end-to-end freight and logistics solutions tailored to your business.
        </p>
        <Link
          href="/contact-us"
          className="inline-block bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-4 px-10 rounded-full uppercase tracking-wider transition-all duration-300"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
