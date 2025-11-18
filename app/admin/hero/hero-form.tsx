"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateHero, uploadImage } from "./actions";

interface HeroFormProps {
  hero?: any;
}

export function HeroForm({ hero }: HeroFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState(hero?.hero_image_url || "");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(hero?.background_image_url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("hero_image_url", heroImageUrl);
    formData.set("background_image_url", backgroundImageUrl);

    try {
      await updateHero(formData);
      router.refresh();
      alert("Hero section updated successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to update hero section");
    } finally {
      setLoading(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "hero-images");

    try {
      const url = await uploadImage(formData);
      setHeroImageUrl(url);
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleBackgroundImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "hero-images");

    try {
      const url = await uploadImage(formData);
      setBackgroundImageUrl(url);
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Hero Title *</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={hero?.title || ""}
          placeholder="Welcome to My Portfolio"
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Subtitle</label>
        <input
          name="subtitle"
          type="text"
          defaultValue={hero?.subtitle || ""}
          placeholder="Building innovative solutions"
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={hero?.description || ""}
          placeholder="A brief introduction about yourself..."
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Primary Button Text</label>
          <input
            name="primary_button_text"
            type="text"
            defaultValue={hero?.primary_button_text || ""}
            placeholder="View Projects"
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Primary Button Link</label>
          <input
            name="primary_button_link"
            type="text"
            defaultValue={hero?.primary_button_link || ""}
            placeholder="/projects"
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Secondary Button Text</label>
          <input
            name="secondary_button_text"
            type="text"
            defaultValue={hero?.secondary_button_text || ""}
            placeholder="Contact Me"
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Secondary Button Link</label>
          <input
            name="secondary_button_link"
            type="text"
            defaultValue={hero?.secondary_button_link || ""}
            placeholder="/contact"
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Hero Image</label>
        <p className="text-xs text-slate-500">Main image displayed in the hero section (e.g., your photo)</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleHeroImageUpload}
          disabled={uploading}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
        {uploading && <p className="text-sm text-slate-400">Uploading...</p>}
        {heroImageUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImageUrl} alt="Hero preview" className="h-48 rounded-lg object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Background Image</label>
        <p className="text-xs text-slate-500">Background image for the hero section (optional)</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundImageUpload}
          disabled={uploading}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
        {uploading && <p className="text-sm text-slate-400">Uploading...</p>}
        {backgroundImageUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={backgroundImageUrl} alt="Background preview" className="h-32 rounded-lg object-cover" />
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update Hero Section"}
        </button>
      </div>
    </form>
  );
}
