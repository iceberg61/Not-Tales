"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Loader2, Trash2, Check } from "lucide-react";
import api from "@/lib/api";

const CATEGORIES = ["jeans", "clothes", "caps"];

// A curated palette instead of free-typed hex codes — covers the tones
// already used across the seeded catalog, shown to the admin by name.
const COLOR_OPTIONS = [
  { name: "Black", hex: "#1A1410" },
  { name: "Charcoal", hex: "#2E2E2E" },
  { name: "Grey", hex: "#8A8A8A" },
  { name: "White", hex: "#F4EFE4" },
  { name: "Navy", hex: "#2E3A4F" },
  { name: "Sky Blue", hex: "#7BA7C9" },
  { name: "Sage", hex: "#8FA98C" },
  { name: "Maroon", hex: "#7A2E2E" },
  { name: "Mustard", hex: "#E8A33D" },
  { name: "Brown", hex: "#6B4A32" },
  { name: "Dark Brown", hex: "#4A3323" },
  { name: "Tan", hex: "#8A6A4C" },
];

// Size options depend on category — jeans use waist sizes, caps are
// one-size, clothes use letter sizes.
const SIZE_OPTIONS_BY_CATEGORY = {
  clothes: ["S", "M", "L", "XL", "XXL"],
  jeans: ["28", "30", "32", "34", "36", "38"],
  caps: ["One size"],
};

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "clothes",
  price: "",
  stock: "",
};

// Uploads a single file to Cloudinary via POST /api/upload and returns the
// resulting URL — shared by both the cover-image and gallery pickers below.
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await api.post("/upload", formData);
  return data.url;
}

export default function ProductFormModal({ product, onClose, onSaved }) {
  const isEdit = Boolean(product);
  const [form, setForm] = useState(EMPTY_FORM);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [image, setImage] = useState(""); // cover image URL
  const [images, setImages] = useState([]); // gallery URLs
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "clothes",
        price: product.price ?? "",
        stock: product.stock ?? "",
      });
      setColors(product.colors || []);
      setSizes(product.sizes || []);
      setImage(product.image || "");
      setImages(product.images || []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Switching category invalidates sizes picked under the old one
    // (e.g. "32" doesn't mean anything once category becomes "caps").
    if (name === "category") setSizes([]);
  };

  const toggleColor = (hex) =>
    setColors((prev) => (prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]));

  const toggleSize = (size) =>
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    setError("");
    try {
      setImage(await uploadFile(file));
    } catch (err) {
      setError(err.response?.data?.message || "Cover image upload failed.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingGallery(true);
    setError("");
    try {
      const uploaded = await Promise.all(files.map(uploadFile));
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err.response?.data?.message || "Gallery upload failed.");
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (url) => setImages((prev) => prev.filter((i) => i !== url));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price || !form.category || !image) {
      setError("Name, price, category, and a cover image are all required.");
      return;
    }

    const payload = {
      name: form.name,
      description: form.description,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock) || 0,
      colors,
      sizes,
      image,
      images,
    };

    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/products/${product.id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't save this product.");
    } finally {
      setSaving(false);
    }
  };

  const sizeOptions = SIZE_OPTIONS_BY_CATEGORY[form.category] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />

      <div className="relative bg-cream rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold">{isEdit ? "Edit product" : "Add product"}</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>
          )}

          {/* Cover image */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Cover image</label>
            <div className="flex items-center gap-3">
              {image ? (
                <Image src={image} alt="Cover" width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-cream-2 flex items-center justify-center text-ink/30">
                  <Upload size={18} />
                </div>
              )}
              <label className="cursor-pointer bg-cream-2 rounded-pill px-4 py-2 text-sm font-medium hover:bg-ink/5 transition-colors">
                {uploadingCover ? <Loader2 size={14} className="animate-spin inline" /> : image ? "Replace" : "Upload"}
                <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleCoverUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Gallery images */}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Gallery images (optional)</label>
            <div className="flex flex-wrap gap-3">
              {images.map((url) => (
                <div key={url} className="relative w-16 h-16">
                  <Image src={url} alt="Gallery" width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(url)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ink text-cream flex items-center justify-center"
                    aria-label="Remove image"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
              <label className="w-16 h-16 rounded-lg bg-cream-2 flex items-center justify-center cursor-pointer hover:bg-ink/5 transition-colors">
                {uploadingGallery ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} className="text-ink/40" />}
                <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleGalleryUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full bg-cream-2 rounded-xl px-4 py-2.5 text-sm outline-none" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full bg-cream-2 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full bg-cream-2 rounded-xl px-4 py-2.5 text-sm outline-none capitalize">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Price (₦)</label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange} className="w-full bg-cream-2 rounded-xl px-4 py-2.5 text-sm outline-none" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Stock</label>
            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} className="w-full bg-cream-2 rounded-xl px-4 py-2.5 text-sm outline-none" />
          </div>

          {/* Color picker */}
          <div>
            <label className="text-sm font-medium mb-2 block">Colors</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {COLOR_OPTIONS.map((c) => {
                const selected = colors.includes(c.hex);
                return (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => toggleColor(c.hex)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selected ? "bg-ink text-cream" : "bg-cream-2 text-ink/70 hover:bg-ink/5"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-ink/10 shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                    >
                      {selected && <Check size={10} className={c.hex === "#F4EFE4" ? "text-ink" : "text-cream"} />}
                    </span>
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size picker */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    sizes.includes(s) ? "bg-ink text-cream" : "bg-cream-2 text-ink/60 hover:bg-ink/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || uploadingCover || uploadingGallery}
            className="w-full bg-ink text-cream rounded-pill py-3 font-medium hover:bg-brown-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Save changes" : "Create product"}
          </button>
        </form>
      </div>
    </div>
  );
}