import axios from "axios";

/*
|--------------------------------------------------------------------------
| AXIOS INSTANCE
|--------------------------------------------------------------------------
*/

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| REQUEST INTERCEPTOR
|--------------------------------------------------------------------------
*/

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Jangan kirim token saat login
  if (token && !config.url?.includes("/admin/login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/*
|--------------------------------------------------------------------------
| RESPONSE INTERCEPTOR (AUTO LOGOUT IF 401)
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin";
    }

    return Promise.reject(error);
  },
);

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

// ✅ Updated: Tambah created_at & updated_at
export type Service = {
  id: number;
  title: string;
  description: string | null;
  icon: string | null; // ✅ nullable sesuai DB
  is_active: number; // ✅ tinyint(1) = 0/1
  created_at: string | null; // ✅ timestamp dari Laravel
  updated_at: string | null;
};

// ✅ Tipe input untuk create/update (tanpa id & timestamps)
export type ServiceInput = {
  title: string;
  description: string;
  icon: string;
  is_active?: number; // ✅ optional, default 1 di backend
};

export type Portfolio = {
  id: number;
  title: string;
  category: string;
  description: string | null;
  image: string;
};

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

export const loginAdmin = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await api.post("/admin/login", { email, password });
  return res.data;
};

export const logoutAdmin = async () => {
  const res = await api.post("/admin/logout");
  return res.data;
};

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

/*
|--------------------------------------------------------------------------
| SERVICES CRUD
|--------------------------------------------------------------------------
*/

export const getServices = async (): Promise<Service[]> => {
  const res = await api.get("/services");
  return res.data;
};

// ✅ Updated: Terima ServiceInput (termasuk is_active)
export const createService = async (data: ServiceInput): Promise<Service> => {
  const res = await api.post("/admin/services", data);
  return res.data;
};

// ✅ Updated: Terima Partial<ServiceInput> untuk update
export const updateService = async (
  id: number,
  data: Partial<ServiceInput>,
): Promise<Service> => {
  const res = await api.put(`/admin/services/${id}`, data);
  return res.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await api.delete(`/admin/services/${id}`);
};

/*
|--------------------------------------------------------------------------
| PORTFOLIOS
|--------------------------------------------------------------------------
*/

export const getPortfolios = async (): Promise<Portfolio[]> => {
  const res = await api.get("/portfolios");
  return res.data;
};

export const deletePortfolio = async (id: number) => {
  await api.delete(`/admin/portfolios/${id}`);
};

export const createPortfolio = async (data: FormData) => {
  const res = await api.post("/admin/portfolios", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/*
|--------------------------------------------------------------------------
| pricing
|--------------------------------------------------------------------------
*/

export const getPricings = async () => {
  const res = await api.get("/pricings");
  return res.data;
};

export type Pricing = {
  id: number;
  title: string;
  price: number;
  features: string[];
  is_popular: boolean;
};

export type PricingInput = {
  title: string;
  price: number;
  features: string[];
  is_popular?: boolean;
};

export const createPricing = async (data: PricingInput): Promise<Pricing> => {
  const res = await api.post("/admin/pricings", data);
  return res.data;
};

export const updatePricing = async (
  id: number,
  data: PricingInput,
): Promise<Pricing> => {
  const res = await api.put(`/admin/pricings/${id}`, data);
  return res.data;
};

export const deletePricing = async (id: number) => {
  await api.delete(`/admin/pricings/${id}`);
};

/*
|--------------------------------------------------------------------------
| testimonials
|--------------------------------------------------------------------------
*/
