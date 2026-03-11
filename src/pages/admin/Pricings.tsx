"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPricings,
  createPricing,
  updatePricing,
  deletePricing,
  Pricing,
} from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const AdminPricings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  /*
  |--------------------------------------------------------------------------
  | FETCH DATA
  |--------------------------------------------------------------------------
  */
  const { data = [], isLoading } = useQuery({
    queryKey: ["pricings"],
    queryFn: async () => {
      const res = await getPricings();

      console.log("🔥 FETCH PRICINGS:", res);

      return res.data ?? res;
    },
  });

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pricing | null>(null);

  const [form, setForm] = useState({
    title: "",
    price: 0,
    features: "",
  });

  /*
  |--------------------------------------------------------------------------
  | MUTATIONS
  |--------------------------------------------------------------------------
  */

  const createMutation = useMutation({
    mutationFn: createPricing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricings"] });
      toast({ title: "Pricing created 🚀" });
      closeModal();
    },
    onError: (err) => {
      console.error("CREATE ERROR:", err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updatePricing(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricings"] });
      toast({ title: "Pricing updated ✨" });
      closeModal();
    },
    onError: (err) => {
      console.error("UPDATE ERROR:", err);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePricing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricings"] });
      toast({ title: "Deleted 🗑️" });
    },
  });

  /*
  |--------------------------------------------------------------------------
  | HANDLERS
  |--------------------------------------------------------------------------
  */

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      price: 0,
      features: "",
    });
    setOpen(true);
  };

  const openEdit = (pkg: Pricing) => {
    setEditing(pkg);

    setForm({
      title: pkg.title,
      price: pkg.price,
      features: Array.isArray(pkg.features)
        ? pkg.features.join(", ")
        : JSON.parse(pkg.features || "[]").join(", "),
    });

    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    console.log("🚀 PAYLOAD:", payload);

    if (editing) {
      updateMutation.mutate({ id: editing.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };
  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pricing Plans</h1>
        <Button onClick={openCreate}>+ Add Pricing</Button>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="text-center text-muted-foreground py-10">
          No pricing yet 🚀
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((pkg: Pricing) => {
          const features =
            typeof pkg.features === "string"
              ? JSON.parse(pkg.features)
              : (pkg.features ?? []);

          return (
            <div
              key={pkg.id}
              className="border rounded-xl p-5 space-y-3 hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg">{pkg.title}</h3>

              <p className="text-sm text-muted-foreground">
                Rp {pkg.price.toLocaleString("id-ID")}
              </p>

              <ul className="text-sm space-y-1">
                {features.map((f: string, i: number) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>

              <div className="flex gap-2 pt-3">
                <Button size="sm" onClick={() => openEdit(pkg)}>
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (confirm("Yakin mau hapus?")) {
                      deleteMutation.mutate(pkg.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Pricing" : "Create Pricing"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />

            <Input
              placeholder="Features (pisahkan dengan koma)"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
            />

            <Button className="w-full" onClick={handleSubmit}>
              {editing ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPricings;
