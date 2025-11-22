"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject, uploadImage } from "./actions";

interface ProjectFormProps {
  project?: any;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState<string[]>(project?.tech_tags || []);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnail_url || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("tech_tags", JSON.stringify(tags));
    formData.set("thumbnail_url", thumbnailUrl);

    try {
      console.log("Submitting with thumbnail URL:", thumbnailUrl);
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
    } catch (error: any) {
      console.error("Save error:", error);
      alert(error.message || "Failed to save project");
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "project-images");

    try {
      const url = await uploadImage(formData);
      setThumbnailUrl(url);
      console.log("Image uploaded successfully:", url);
    } catch (error: any) {
      console.error("Image upload error:", error);
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
            defaultValue={project?.title}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Slug *</label>
          <input
            name="slug"
            type="text"
            required
            defaultValue={project?.slug}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Summary *</label>
        <input
          name="summary"
          type="text"
          required
          defaultValue={project?.summary}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Description *</label>
        <textarea
          name="description"
          required
          rows={8}
          defaultValue={project?.description}
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
            defaultValue={project?.published_at?.split("T")[0] || new Date().toISOString().split("T")[0]}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Status *</label>
          <select
            name="status"
            required
            defaultValue={project?.status || "Completed"}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          >
            <option value="Live">Live</option>
            <option value="In Development">In Development</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <input
              name="featured"
              type="checkbox"
              defaultChecked={project?.featured}
              value="true"
              className="rounded border-slate-800 bg-slate-900 text-primary focus:ring-primary"
            />
            Featured
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Tech Tags</label>
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Live URL</label>
          <input
            name="live_url"
            type="url"
            defaultValue={project?.live_url}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">GitHub URL</label>
          <input
            name="github_url"
            type="url"
            defaultValue={project?.github_url}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-white focus:border-primary focus:outline-none"
          />
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
          {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
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
