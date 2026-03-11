import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Services from "./pages/admin/Services";
import Portfolios from "./pages/admin/Portfolios";
import CreatePortfolio from "./pages/admin/CreatePortfolio";
import EditPortfolio from "./pages/admin/EditPortfolio";
import AdminLogin from "./pages/AdminLogin";
import Pricings from "./pages/admin/Pricings";
import Testimonials from "./pages/admin/Testimonials";
import Faqs from "./pages/admin/Faqs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Index />} />

          {/* ================= LOGIN ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= PROTECTED ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect /admin -> /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="pricings" element={<Pricings />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="faqs" element={<Faqs />} />

            {/* Portfolio Nested Route */}
            <Route path="portfolios">
              <Route index element={<Portfolios />} />
              <Route path="create" element={<CreatePortfolio />} />
              <Route path="edit/:id" element={<EditPortfolio />} />
            </Route>
          </Route>

          {/* ================= 404 ================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
