"use client";

import { FaEnvelope, FaMapMarkerAlt, FaTelegramPlane, FaDiscord, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-32 pt-12 pb-20 px-4 text-sm text-gray-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        {/* Company Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Atomic Funding</h3>
          <p className="text-gray-400">
            Trade smarter with instant capital and lifetime payouts. Powered by MetaTraders. Operated by TradeLuck.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="#affiliate" className="hover:text-white">Affiliate</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:support@atomicfunding.com" className="hover:text-white">
                support@atomic-funding.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>New York, USA</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaTelegramPlane /></a>
            <a href="#" className="hover:text-white"><FaDiscord /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Atomic Funding. All rights reserved.
      </div>
    </footer>
  );
}
