import { useState } from "react";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServices,
  createService,
  updateService,
  deleteService,
  Service,
} from "@/lib/api";

import {
  Heart,
  GraduationCap,
  Users,
  Building2,
  Camera,
  Sparkles,
  Code,
  Briefcase,
} from "lucide-react";

const iconMap: any = {
  Users,
  GraduationCap,
  Heart,
  Building2,
  Camera,
  Sparkles,
  Code,
  Briefcase,
};

const Services = () => {
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
  });

  // OPEN CREATE
  const openCreate = () => {
    setForm({ title: "", description: "", icon: "" });
    setEditing(null);
    setIsOpen(true);
  };

  // OPEN EDIT
  const openEdit = (service: Service) => {
    setForm({
      title: service.title,
      description: service.description || "",
      icon: service.icon,
    });
    setEditing(service);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  // CREATE
  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      closeModal();
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      closeModal();
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      updateMutation.mutate({ id: editing.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-10">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Services</h1>

        <button
          onClick={openCreate}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Add Service
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Icon</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: Service) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.title}</td>
                <td className="p-4">{item.description}</td>
                <td className="p-4">
                  {iconMap[item.icon]
                    ? React.createElement(iconMap[item.icon], {
                        className: "w-5 h-5",
                      })
                    : item.icon}
                </td>

                <td className="p-4 flex gap-2 justify-center">
                  <button
                    onClick={() => openEdit(item)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMutation.mutate(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Service" : "Create Service"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Icon (lucide name)"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
