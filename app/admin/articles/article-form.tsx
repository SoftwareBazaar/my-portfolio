"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle, updateArticle, uploadImage } from "./actions";

interface ArticleFormProps {
  article?: any;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState<string[]>(article?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(article?.thumbnail_url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("tags", JSON.stringify(tags));
    formData.set("thumbnail_url", thumbnailUrl);

    try {
      if (article) {
        await updateArticle(article.id, formData);
      } else {
        await createArticle(formData);
      }
    } catch (error: any) {
      alert(error.message || "Failed to save article");
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "article-images");

    try {
      const url = await uploadImage(formData);
      setThumbnailUrl(url);
    } catch (error: any) {
      alert(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Title *</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={article?.title}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Slug *</label>
          <input
            name="slug"
            type="text"
            required
            defaultValue={article?.slug}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Excerpt *</label>
        <input
          name="excerpt"
          type="text"
          required
          defaultValue={article?.excerpt}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Content *</label>
        <textarea
          name="content"
          required
          rows={12}
          defaultValue={article?.content}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Published Date *</label>
          <input
            name="published_at"
            type="date"
            required
            defaultValue={article?.published_at?.split("T")[0] || new Date().toISOString().split("T")[0]}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Reading Time (min) *</label>
          <input
            name="reading_time"
            type="number"
            required
            min="1"
            defaultValue={article?.reading_time || 5}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={article?.featured}
              value="true"
              className="rounded border-slate-800 bg-slate-900 text-primary focus:ring-primary"
            />
            Featured
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Add a tag..."
            className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="text-slate-500 hover:text-white">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Thumbnail Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
        {uploading && <p className="text-sm text-slate-400">Uploading...</p>}
        {thumbnailUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbnailUrl} alt="Thumbnail preview" className="h-32 rounded-lg object-cover" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : article ? "Update Article" : "Create Article"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-700 px-6 py-2 text-sm text-slate-300 transition hover:border-slate-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
