"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Plus, Trash2, Image as ImageIcon, Type, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ContentBlock {
  type: "IMAGE" | "TEXT";
  content: string;
}

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  const addBlock = (type: "IMAGE" | "TEXT") => {
    setBlocks([...blocks, { type, content: "" }]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, content: string) => {
    const newBlocks = [...blocks];
    newBlocks[index].content = content;
    setBlocks(newBlocks);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (index === undefined) {
        setMainImage(data.url);
      } else {
        updateBlock(index, data.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const projectData = {
      title: formData.get("title"),
      location: formData.get("location"),
      category: formData.get("category"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      mainImage,
      content: blocks,
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const errData = await res.json();
        alert(`Failed to save: ${errData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("A network error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 py-32">
      <Container>
        <div className="mb-12">
          <Link href="/admin/dashboard" className="inline-flex items-center text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors mb-6">
            <ArrowLeft size={14} className="mr-2" /> Back to Dashboard
          </Link>
          <h1 className="font-serif text-4xl">Add New Project</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Basic Info */}
            <section className="bg-white p-10 border border-neutral-100 shadow-sm space-y-8">
              <h2 className="text-[10px] uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">General Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Project Title</label>
                  <input name="title" required className="w-full border-b border-neutral-100 py-2 focus:border-black outline-none transition-colors" placeholder="e.g. 5 Ballygunge" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Slug (URL)</label>
                  <input name="slug" required className="w-full border-b border-neutral-100 py-2 focus:border-black outline-none transition-colors" placeholder="e.g. ballygunge-residence" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Location</label>
                  <input name="location" required className="w-full border-b border-neutral-100 py-2 focus:border-black outline-none transition-colors" placeholder="e.g. Kolkata, India" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Category</label>
                  <select name="category" required className="w-full border-b border-neutral-100 py-2 focus:border-black outline-none bg-transparent">
                    <option value="Private Residential">Private Residential</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Heritage & Commercial">Heritage & Commercial</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Short Description</label>
                <textarea name="description" rows={3} required className="w-full border border-neutral-100 p-4 focus:border-black outline-none transition-colors font-light text-sm" placeholder="A brief overview for the grid..." />
              </div>
            </section>

            {/* Dynamic Content Blocks */}
            <section className="bg-white p-10 border border-neutral-100 shadow-sm space-y-8">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                <h2 className="text-[10px] uppercase tracking-widest text-neutral-400">Project Detail Blocks</h2>
                <div className="flex gap-4">
                  <button type="button" onClick={() => addBlock("TEXT")} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-neutral-500 hover:text-black transition-colors">
                    <Type size={14} /> Add Text
                  </button>
                  <button type="button" onClick={() => addBlock("IMAGE")} className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-neutral-500 hover:text-black transition-colors">
                    <ImageIcon size={14} /> Add Image
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {blocks.length === 0 && (
                  <p className="text-center py-12 text-neutral-300 italic text-sm">Add text or images to build the project detail page...</p>
                )}
                {blocks.map((block, index) => (
                  <div key={index} className="group relative border border-neutral-50 p-6 bg-neutral-50/30 hover:border-neutral-200 transition-colors">
                    <button
                      type="button"
                      onClick={() => removeBlock(index)}
                      className="absolute top-4 right-4 text-neutral-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    {block.type === "TEXT" ? (
                      <div>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 mb-4">
                          <Type size={12} /> Text Block
                        </div>
                        <textarea
                          value={block.content}
                          onChange={(e) => updateBlock(index, e.target.value)}
                          rows={6}
                          className="w-full border border-neutral-100 p-4 focus:border-black outline-none bg-white font-light leading-relaxed"
                          placeholder="Write project details here..."
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 mb-4">
                          <ImageIcon size={12} /> Image Block
                        </div>
                        {block.content ? (
                          <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                            <img src={block.content} alt="Block" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => updateBlock(index, "")}
                              className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] uppercase tracking-widest"
                            >
                              Replace Image
                            </button>
                          </div>
                        ) : (
                          <div className="aspect-video w-full border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center bg-white">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, index)}
                              className="hidden"
                              id={`block-image-${index}`}
                            />
                            <label htmlFor={`block-image-${index}`} className="cursor-pointer flex flex-col items-center">
                              <Plus size={24} className="text-neutral-300 mb-2" />
                              <span className="text-[10px] uppercase tracking-widest text-neutral-400">Upload Block Image</span>
                            </label>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-white p-10 border border-neutral-100 shadow-sm space-y-6 sticky top-32">
              <h2 className="text-[10px] uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-4">Thumbnail</h2>
              {mainImage ? (
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                  <img src={mainImage} alt="Thumbnail" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setMainImage("")}
                    className="absolute inset-0 bg-black/40 text-white opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] uppercase tracking-widest"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="aspect-square w-full border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="hidden"
                    id="main-image"
                  />
                  <label htmlFor="main-image" className="cursor-pointer flex flex-col items-center">
                    <Plus size={24} className="text-neutral-300 mb-2" />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 text-center px-4">Upload Portfolio Thumbnail</span>
                  </label>
                </div>
              )}
              
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || !mainImage}
                  className="w-full bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-200"
                >
                  <Save size={14} /> {loading ? "Saving..." : "Publish Project"}
                </button>
                {!mainImage && <p className="text-[9px] text-red-400 mt-2 text-center uppercase tracking-tighter">Thumbnail is required</p>}
              </div>
            </section>
          </div>
        </form>
      </Container>
    </main>
  );
}
