import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from './LogoIcon';

// Simple SVG icons for social media, designed to fit the site's aesthetic.
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round"></line>
    </svg>
);
  
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);
  
const PinterestIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.737 9.47.075-.285.093-.62.234-.938.14-.313.864-3.663.864-3.663s-.217-.433-.217-1.073c0-1.006.582-1.762 1.31-1.762.62 0 .914.464.914 1.022 0 .62-.394 1.547-.598 2.408-.16.71.35 1.293 1.045 1.293 1.25 0 2.22-1.32 2.22-3.23 0-1.69-.988-2.845-2.954-2.845-2.022 0-3.196 1.51-3.196 3.018 0 .58.18 1.21.414 1.552.05.07.06.13.04.22-.02.09-.07.28-.1.35-.02.07-.05.1-.1.15-.22.25-.36.25-.56.09-.6-.47-.98-1.82-.98-2.95 0-2.32 1.7-4.27 4.9-4.27 2.58 0 4.54 1.84 4.54 4.07 0 2.57-1.63 4.58-3.88 4.58-.75 0-1.45-.38-1.69-.82 0 0-.36 1.44-.45 1.83-.12.52-.02 1.13.09 1.57.36.15.73.22 1.12.22 4.418 0 8-3.582 8-8s-3.582-8-8-8z" />
    </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary text-slate-300 border-t-4 border-brand-accent">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div className="md:col-span-2 lg:col-span-1">
             <Link to="/" className="group inline-flex items-center transition-colors duration-300 text-white hover:text-brand-light">
                <LogoIcon className="h-8 w-8 text-brand-accent" />
                <span className="ml-3 text-2xl font-serif font-medium tracking-tight">
                  6 Yards by Katyayini
                </span>
             </Link>
             <p className="mt-4 text-sm text-slate-400">
                Celebrating the timeless elegance of the saree, we bring you curated collections that blend tradition with contemporary artistry.
             </p>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Help & Support</h3>
            <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Track Your Order</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
                <li className="text-slate-400">Email: <a href="mailto:support@6yards.com" className="hover:text-white transition-colors">support@6yards.com</a></li>
                <li className="text-slate-400">Phone: <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Pinterest"><PinterestIcon /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} 6 Yards by Katyayini. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;