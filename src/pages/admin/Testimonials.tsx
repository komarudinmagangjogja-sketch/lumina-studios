import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

type Testimonial = {
  id: number;
  name: string;
  role?: string;
  message: string;
  rating?: number;
  photo?: string;
};

export default function Testimonials() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    message: "",
    rating: 5,
    photo: null as File | null,
  });

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/testimonials");
      setData(res.data);
    } catch {
      toast.error("Failed load testimonials");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      message: "",
      rating: 5,
      photo: null,
    });
    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const openEdit = (item: Testimonial) => {
    setForm({
      name: item.name,
      role: item.role || "",
      message: item.message,
      rating: item.rating || 5,
      photo: null,
    });

    setEditingId(item.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("message", form.message);
    formData.append("rating", String(form.rating));

    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      if (editingId) {
        formData.append("_method", "PUT");

        await api.post(`/admin/testimonials/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Testimonial updated");
      } else {
        await api.post("/admin/testimonials", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Testimonial added");
      }

      setShowModal(false);
      fetchData();
      resetForm();
    } catch {
      toast.error("Failed save testimonial");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;

    try {
      await api.delete(`/admin/testimonials/${id}`);
      toast.success("Deleted");
      fetchData();
    } catch {
      toast.error("Failed delete");
    }
  };

  const sortByRating = () => {
    const sorted = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    setData(sorted);
  };

  return (
    <div className="p-6">
      {/* HEADER */}

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Testimonials</h1>

        <div className="flex gap-2">
          <button onClick={sortByRating} className="border px-3 py-2 rounded">
            Sort Rating
          </button>

          <button
            onClick={openAdd}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add Testimonial
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  <img
                    src={
                      item.photo
                        ? `http://127.0.0.1:8000/storage/${item.photo}`
                        : "https://ui-avatars.com/api/?name=" + item.name
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="p-3 font-medium">{item.name}</td>

                <td className="p-3">{item.role}</td>

                <td className="p-3 text-yellow-500">
                  {"★".repeat(item.rating || 0)}
                </td>

                <td className="p-3 max-w-xs truncate">{item.message}</td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border w-full p-2 rounded"
            />

            <input
              type="text"
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="border w-full p-2 rounded"
            />

            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="border w-full p-2 rounded"
            />

            {/* RATING */}

            <div className="flex gap-1 text-2xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  className={
                    star <= form.rating ? "text-yellow-500" : "text-gray-300"
                  }
                >
                  ★
                </button>
              ))}
            </div>

            {/* PHOTO */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  photo: e.target.files?.[0] || null,
                })
              }
            />

            {form.photo && (
              <img
                src={URL.createObjectURL(form.photo)}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-black text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
