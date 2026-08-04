"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, ArrowUp, ArrowDown } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  mainImage: string;
  slug: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      setProjects(Array.isArray(data) ? (data as Project[]) : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      setProjects((currentProjects) => currentProjects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const persistProjectOrder = async (orderedProjects: Project[]) => {
    setReordering(true);
    try {
      const res = await fetch("/api/projects/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectIds: orderedProjects.map((project) => project.id) }),
      });

      if (!res.ok) {
        throw new Error("Failed to save project order");
      }
    } catch (error) {
      console.error("Error reordering projects:", error);
      alert("Unable to save the new project order. Restoring the previous order.");
      fetchProjects();
    } finally {
      setReordering(false);
    }
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    if (reordering) return;

    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= projects.length) return;

    const reordered = [...projects];
    const [movedProject] = reordered.splice(index, 1);
    reordered.splice(nextIndex, 0, movedProject);

    setProjects(reordered);
    persistProjectOrder(reordered);
  };

  return (
    <main className="min-h-screen bg-[#DFD6CD] py-32">
      <Container>
        <div className="flex justify-between items-end mb-12 pb-8 border-b border-[#9A8E84]/20">
          <div>
            <h1 className="font-serif text-4xl mb-2">Portfolio Management</h1>
            <p className="text-[#9A8E84] text-[10px] uppercase tracking-widest">Admin Dashboard</p>
            <p className="text-[#9A8E84] text-[10px] uppercase tracking-widest mt-2">
              Use arrows to set portfolio order
              {reordering ? " - saving..." : ""}
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="bg-[#B08E68] text-[#DFD6CD] px-8 py-3 text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#9A8E84] transition-colors"
          >
            <Plus size={14} /> Add Project
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#9A8E84] uppercase tracking-widest text-[11px]">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-[#9A8E84]/20">
            <p className="text-[#9A8E84] mb-6">No projects found</p>
            <Link href="/admin/projects/new" className="text-primary uppercase tracking-widest text-[11px] font-bold">
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.id} className="group bg-[#DFD6CD] border border-[#9A8E84]/20 overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#6A5A49]/0 group-hover:bg-[#6A5A49]/20 transition-colors duration-500" />
                </div>
                <div className="p-8">
                  <p className="text-[10px] uppercase tracking-widest text-[#9A8E84] mb-2">{project.category}</p>
                  <h3 className="font-serif text-2xl mb-4">{project.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#9A8E84]">Position {index + 1}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveProject(index, "up")}
                        disabled={reordering || index === 0}
                        className="flex items-center justify-center border border-[#9A8E84]/35 h-8 w-8 text-[#6A5A49]/70 hover:bg-[#DFD6CD] hover:text-[#6A5A49] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                        aria-label={`Move ${project.title} up`}
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => moveProject(index, "down")}
                        disabled={reordering || index === projects.length - 1}
                        className="flex items-center justify-center border border-[#9A8E84]/35 h-8 w-8 text-[#6A5A49]/70 hover:bg-[#DFD6CD] hover:text-[#6A5A49] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                        aria-label={`Move ${project.title} down`}
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="flex-1 flex items-center justify-center gap-2 border border-[#9A8E84]/35 py-3 text-[10px] uppercase tracking-widest hover:bg-[#DFD6CD] transition-colors"
                    >
                      <Edit size={12} /> Edit
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="flex items-center justify-center gap-2 border border-[#9A8E84]/35 py-3 px-4 text-[10px] uppercase tracking-widest hover:bg-[#9A8E84]/15 hover:text-[#6A5A49] hover:border-[#9A8E84] transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 border border-[#9A8E84]/35 py-3 px-4 text-[10px] uppercase tracking-widest hover:bg-[#DFD6CD] transition-colors"
                    >
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
