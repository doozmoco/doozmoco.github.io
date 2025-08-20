import React, { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { Order, OrderStatus } from '../../types';

const StatCard: React.FC<{ title: string; value: string; subtext: string }> = ({ title, value, subtext }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{subtext}</p>
    </div>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    ordersToday: 0,
    totalRevenue: 0,
    processingOrders: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const orders = await api.getOrders();
        const today = new Date().toISOString().split('T')[0];
        const ordersToday = orders.filter(o => o.createdAt.startsWith(today)).length;
        const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
        const processingOrders = orders.filter(o => o.status === OrderStatus.PROCESSING).length;
        setStats({ ordersToday, totalRevenue, processingOrders });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      {isLoading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Orders Today" value={stats.ordersToday.toString()} subtext="New orders received today" />
          <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} subtext="All time revenue" />
          <StatCard title="Processing Orders" value={stats.processingOrders.toString()} subtext="Orders needing fulfillment" />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;