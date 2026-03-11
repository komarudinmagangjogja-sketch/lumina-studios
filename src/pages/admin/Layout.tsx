import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { logoutAdmin } from "../../lib/api";
import {
  LayoutDashboard,
  Briefcase,
  Image,
  DollarSign,
  MessageSquare,
  HelpCircle,
  LogOut,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const pageTitle = location.pathname.split("/").pop();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch (error) {}
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Services", path: "/admin/services", icon: Briefcase },
    { name: "Portfolios", path: "/admin/portfolios", icon: Image },
    { name: "Pricing", path: "/admin/pricings", icon: DollarSign },
    { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { name: "FAQ", path: "/admin/faqs", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 p-4 flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          {/* Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mb-6 p-2 rounded-lg hover:bg-gray-100 transition w-full flex justify-center"
          >
            ☰
          </button>

          {/* Logo */}
          <button
            onClick={() => navigate("http://localhost:8080/")}
            className="text-2xl font-bold mb-10 hover:opacity-70 transition w-full text-center"
          >
            {isCollapsed ? "L" : "LUXFRAME"}
          </button>

          {/* Menu */}
          <nav className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.path} className="relative group">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isCollapsed ? "justify-center" : "gap-3"
                      } px-4 py-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
                          : "hover:bg-gray-100 text-gray-600"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {!isCollapsed && item.name}
                  </NavLink>

                  {/* Tooltip */}
                  {isCollapsed && (
                    <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "gap-2"
          } bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-xl transition`}
        >
          <LogOut size={16} />
          {!isCollapsed && "Logout"}
        </button>
      </aside>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold capitalize text-gray-800">
            {pageTitle}
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">Welcome, Admin 👑</div>

            <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
