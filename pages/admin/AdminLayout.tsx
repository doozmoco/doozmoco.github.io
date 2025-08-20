
import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, RectangleStackIcon, ShoppingBagIcon, ArchiveBoxIcon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? 'bg-red-100 text-brand-primary'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;
    
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-6 py-4 border-b">
          <Link to="/" className="text-2xl font-serif font-bold text-slate-900">
            6 Yards by Katyayini
            <span className="block text-xs font-sans font-medium text-gray-500">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink to="/admin" end className={navLinkClasses}>
            <HomeIcon className="h-5 w-5 mr-3" /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={navLinkClasses}>
            <ShoppingBagIcon className="h-5 w-5 mr-3" /> Products
          </NavLink>
          <NavLink to="/admin/collections" className={navLinkClasses}>
            <RectangleStackIcon className="h-5 w-5 mr-3" /> Collections
          </NavLink>
          <NavLink to="/admin/orders" className={navLinkClasses}>
            <ArchiveBoxIcon className="h-5 w-5 mr-3" /> Orders
          </NavLink>
        </nav>
        <div className="px-4 py-4 border-t space-y-2">
          <Link to="/" className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" /> Back to Site
          </Link>
          <button onClick={logout} className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100">
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;