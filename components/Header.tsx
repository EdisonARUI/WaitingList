'use client';

import Image from 'next/image';

/**
 * Fixed header component displaying the brand logo and tagline.
 * Positioned absolutely to stay visible across all fullpage.js sections.
 * @returns The header component with logo and tagline
 */
export default function Header() {
  return (
    <header className="header bg-white shadow-sm absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="logo-block flex items-center">
          <div className="logo-image mr-3">
            <Image
              src="/images/logo.svg"
              alt="FREEHOMES Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="logo text-2xl font-bold text-blue-600">
            FREEHOMES
          </div>
          <div className="slogan ml-4 text-sm text-gray-600 hidden md:block">
            Making homeownership accessible for everyone
          </div>
        </div>
      </div>
    </header>
  );
} 