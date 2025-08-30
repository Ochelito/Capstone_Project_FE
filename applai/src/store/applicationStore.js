import { create } from "zustand";
import {
  ensureFile,
  loadApplications,
  saveApplications,
} from "@/utils/driveClient";

const useApplicationStore = create((set, get) => ({
  fileId: null,
  applications: [],
  trash: [],
  ready: false,
  mode: null, // "drive" or "local"

  // Initialize store based on user mode
  init: async (mode = "local") => {
    set({ mode });

    try {
      if (mode === "drive") {
        const fileId = await ensureFile();
        const data = await loadApplications(fileId);
        set({
          fileId,
          applications: (data.applications || []).map(a => ({
            ...a,
            status: a.status || "Applied",
            createdAt: a.createdAt || new Date().toISOString(),
          })),
          trash: (data.trash || []).map(a => ({
            ...a,
            status: a.status || "Applied",
            createdAt: a.createdAt || new Date().toISOString(),
          })),
          ready: true,
        });
      } else {
        // localStorage mode
        const dataStr = localStorage.getItem("applications");
        const data = dataStr ? JSON.parse(dataStr) : { applications: [], trash: [] };
        set({
          applications: (Array.isArray(data) ? data : data.applications || []).map(a => ({
            ...a,
            status: a.status || "Applied",
            createdAt: a.createdAt || new Date().toISOString(),
          })),
          trash: (data.trash || []).map(a => ({
            ...a,
            status: a.status || "Applied",
            createdAt: a.createdAt || new Date().toISOString(),
          })),
          ready: true,
        });
      }
    } catch (err) {
      console.error("Failed to initialize applications:", err);
      set({ ready: true }); // avoid freezing the UI
    }
  },

  // Save everything (apps + trash)
  saveAll: async () => {
    const { mode, fileId, applications, trash } = get();
    if (mode === "drive") {
      await saveApplications(fileId, { applications, trash });
    } else {
      localStorage.setItem("applications", JSON.stringify({ applications, trash }));
    }
  },

  // Add new application
  addApplication: async (app) => {
    const newApp = {
      id: Date.now().toString(),
      company: app.company || "",
      position: app.position || "",
      status: app.status || "Applied",
      interviewDate: app.status === "Interview" ? app.interviewDate || null : null,
      createdAt: new Date().toISOString(),
      salaryOffer: app.salaryOffer || "",
      industry: app.industry || "",
      employmentType: app.employmentType || "",
      workLocation: app.workLocation || "",
      experienceFit: app.experienceFit || "",
      notes: app.notes || "",
      priority: app.priority || "Medium",
    };

    const next = [...get().applications, newApp];
    set({ applications: next });
    await get().saveAll();
  },

  // Update application
  updateApplication: async (id, fields) => {
    const next = get().applications.map((a) => {
      if (a.id !== id) return a;

      let updated = { ...a, ...fields };

      // Ensure interviewDate is handled correctly
      if (fields.status) {
        if (fields.status === "Interview") {
          updated.interviewDate = fields.interviewDate || a.interviewDate || null;
        } else {
          updated.interviewDate = null;
        }
      }

      return updated;
    });

    set({ applications: next });
    await get().saveAll();
  },

  // Soft delete
  deleteApplication: async (id) => {
    const apps = get().applications;
    const toDelete = apps.find((a) => a.id === id);
    if (!toDelete) return;

    const nextApps = apps.filter((a) => a.id !== id);
    const nextTrash = [
      ...get().trash,
      { ...toDelete, deletedAt: new Date().toISOString() }
    ];

    set({ applications: nextApps, trash: nextTrash });
    await get().saveAll();
  },

  // Restore from trash
  restoreApplication: async (id) => {
    const trash = get().trash;
    const toRestore = trash.find((a) => a.id === id);
    if (!toRestore) return;

    const nextTrash = trash.filter((a) => a.id !== id);
    const nextApps = [...get().applications, toRestore];

    set({ applications: nextApps, trash: nextTrash });
    await get().saveAll();
  },

  // Permanently delete
  permanentlyDelete: async (id) => {
    const nextTrash = get().trash.filter((a) => a.id !== id);
    set({ trash: nextTrash });
    await get().saveAll();
  },

  // Get stats
  getStats: () => {
    const apps = get().applications;
    return {
      Applied: apps.filter(a => a.status === "Applied").length,
      Interview: apps.filter(a => a.status === "Interview").length,
      Offer: apps.filter(a => a.status === "Offer").length,
      Rejected: apps.filter(a => a.status === "Rejected").length,
    };
  },
}));

export default useApplicationStore;