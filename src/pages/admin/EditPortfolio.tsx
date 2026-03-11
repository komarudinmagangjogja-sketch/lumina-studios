import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

const EditPortfolio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // 🔥 GET DATA BY ID
  const { data, isLoading } = useQuery({
    queryKey: ["portfolio", id],
    queryFn: async () => {
      const res = await api.get(`/portfolios/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // SET DATA KE FORM
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setCategory(data.category);
      setDescription(data.description || "");
    }
  }, [data]);

  // 🔥 UPDATE MUTATION
  const updateMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const res = await api.post(
        `/admin/portfolios/${id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      navigate("/admin/portfolios");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <h1 className="text-3xl font-bold mb-8">Edit Portfolio</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-6 bg-gray-100 p-6 rounded-lg shadow"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded border"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded border"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded border"
            rows={4}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">Image (optional)</label>
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/portfolios")}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

        {updateMutation.isError && (
          <p className="text-red-500">Error updating portfolio</p>
        )}
      </form>
    </div>
  );
};

export default EditPortfolio;
