import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPortfolios, deletePortfolio } from "../../lib/api";

const Portfolios = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfolios,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });

  return (
    <div className="min-h-screen bg-white text-black p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Portfolios</h1>

        <button
          onClick={() => navigate("/admin/portfolios/create")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Tambah Portfolio
        </button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {data?.map((item: any) => (
          <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <img
              src={`http://127.0.0.1:8000/storage/${item.image}`}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-3"
            />

            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{item.category}</p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/portfolios/edit/${item.id}`)}
                className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                disabled={deleteMutation.isPending}
                onClick={() => {
                  if (confirm("Yakin mau hapus portfolio ini?")) {
                    deleteMutation.mutate(item.id);
                  }
                }}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolios;
