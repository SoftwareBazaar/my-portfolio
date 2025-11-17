"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings, uploadImage } from "./actions";

interface SettingsFormProps {
  settings?: any;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(settings?.profile_image_url || "");
  const [badges, setBadges] = useState<string[]>(settings?.hero_badges || [
    "MT5 & ML Trading Agents",
    "Quant Research & Writing",
    "Fintech Product Architecture"
  ]);
  const [badgeInput, setBadgeInput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("profile_image_url", profileImageUrl);
    formData.set("hero_badges", JSON.stringify(badges));

    try {
      await updateSettings(formData);
      router.refresh();
      alert("Settings updated successfully!");
    } catch (error: any) {
      alert(error.message || "Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "profile-images");

    try {
      const url = await uploadImage(formData);
      setProfileImageUrl(url);
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const addBadge = () => {
    if (badgeInput.trim() && !badges.includes(badgeInput.trim())) {
      setBadges([...badges, badgeInput.trim()]);
      setBadgeInput("");
    }
  };

  const removeBadge = (badge: string) => {
    setBadges(badges.filter((b) => b !== badge));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="text-lg font-semibold text-white">Hero Section</h3>
        <p className="mt-1 text-sm text-slate-400">Main content displayed on your homepage</p>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Status Badge Text</label>
            <input
              name="status_badge"
              type="text"
              defaultValue={settings?.status_badge || "Available for new opportunities"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Greeting Text</label>
            <input
              name="greeting"
              type="text"
              defaultValue={settings?.greeting || "Hi, I'm John Wanyaga"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Hero Title (Line 1)</label>
            <input
              name="hero_title_1"
              type="text"
              defaultValue={settings?.hero_title_1 || "Algorithmic Trader,"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Hero Title (Line 2 - Highlighted)</label>
            <input
              name="hero_title_2"
              type="text"
              defaultValue={settings?.hero_title_2 || "Fintech Builder,"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Hero Title (Line 3)</label>
            <input
              name="hero_title_3"
              type="text"
              defaultValue={settings?.hero_title_3 || "Writer & Article Author"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Hero Description</label>
            <textarea
              name="hero_description"
              rows={3}
              defaultValue={settings?.hero_description || "I design MT5 expert advisors, machine learning trading agents, and full-stack fintech platforms—then document every system through investor decks, product manuals, and long-form articles."}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Hero Badges</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={badgeInput}
                onChange={(e) => setBadgeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBadge())}
                placeholder="Add a badge..."
                className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={addBadge}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
                >
                  {badge}
                  <button type="button" onClick={() => removeBadge(badge)} className="text-slate-500 hover:text-white">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="text-lg font-semibold text-white">Profile Image</h3>
        <p className="mt-1 text-sm text-slate-400">Your hero section profile photo</p>

        <div className="mt-6 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
          {uploading && <p className="text-sm text-slate-400">Uploading...</p>}
          {profileImageUrl && (
            <div className="mt-4">
              <img src={profileImageUrl} alt="Profile preview" className="h-48 w-48 rounded-lg object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="text-lg font-semibold text-white">Call-to-Action Buttons</h3>
        <p className="mt-1 text-sm text-slate-400">Button text and links</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Primary Button Text</label>
            <input
              name="cta_primary_text"
              type="text"
              defaultValue={settings?.cta_primary_text || "View My Work"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Primary Button Link</label>
            <input
              name="cta_primary_link"
              type="text"
              defaultValue={settings?.cta_primary_link || "/projects"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Secondary Button Text</label>
            <input
              name="cta_secondary_text"
              type="text"
              defaultValue={settings?.cta_secondary_text || "Book a Discovery Call"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Secondary Button Link</label>
            <input
              name="cta_secondary_link"
              type="text"
              defaultValue={settings?.cta_secondary_link || "/contact"}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
