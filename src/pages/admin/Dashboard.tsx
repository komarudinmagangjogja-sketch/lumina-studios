import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Navigate } from "react-router-dom";
import {
  Briefcase,
  Image as ImageIcon,
  DollarSign,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/admin" replace />;

  const { data } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const stats = {
    portfolios: data?.total_portfolios ?? 0,
    services: data?.total_services ?? 0,
    pricings: data?.total_pricings ?? 0,
    testimonials: data?.total_testimonials ?? 0,
    faqs: data?.total_faqs ?? 0,
  };

  const chartData = [
    { name: "Portfolios", total: stats.portfolios },
    { name: "Services", total: stats.services },
    { name: "Pricing", total: stats.pricings },
    { name: "Testimonials", total: stats.testimonials },
    { name: "FAQ", total: stats.faqs },
  ];

  const colors = ["#6366F1", "#6366F1", "#6366F1", "#6366F1", "#6366F1"];

  return (
    <div className="space-y-8">
      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">
          Monitor your system performance 🚀
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card title="Portfolios" value={stats.portfolios} icon={ImageIcon} />
        <Card title="Services" value={stats.services} icon={Briefcase} />
        <Card title="Pricing" value={stats.pricings} icon={DollarSign} />
        <Card
          title="Testimonials"
          value={stats.testimonials}
          icon={MessageSquare}
        />
        <Card title="FAQ" value={stats.faqs} icon={HelpCircle} />
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Overview Analytics
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            {/* GRID */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              tickLine={false}
              axisLine={false}
            />

            <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} />

            <Tooltip
              cursor={{ fill: "rgba(99,102,241,0.1)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #eee",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            />

            <Bar
              dataKey="total"
              radius={[10, 10, 0, 0]}
              animationDuration={800}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

function Card({ title, value, icon: Icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{title}</p>

        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
          <Icon size={18} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
    </div>
  );
}

export default Dashboard;
