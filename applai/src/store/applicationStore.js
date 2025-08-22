import { create } from "zustand";
import {
  ensureFile,
  loadApplications,
  saveApplications,
} from "@/utils/driveClient";

const useApplicationStore = create((set, get) => ({
  fileId: null,
  applications: [],
  trash: [],   // 🆕 keep deleted apps here
  ready: false,

  // Initialize from Google Drive
  initFromDrive: async () => {
    const fileId = await ensureFile();
    const data = await loadApplications(fileId);

    // If old data doesn't have trash, default to empty
    set({
      fileId,
      applications: data.applications || data,
      trash: data.trash || [],
      ready: true,
    });
  },

  // Save everything (apps + trash)
  saveAll: async () => {
    const { fileId, applications, trash } = get();
    await saveApplications(fileId, { applications, trash });
  },

  // Add new application
  addApplication: async (app) => {
    const newApp = {
      id: Date.now().toString(),
      company: app.company || "",
      position: app.position || "",
      status: app.status || "applied",
      interviewDate:
        app.status === "interview" ? app.interviewDate || null : null,
      createdAt: new Date().toISOString(),
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

      if (fields.status) {
        if (fields.status === "interview") {
          updated.interviewDate =
            fields.interviewDate || a.interviewDate || null;
        } else {
          updated.interviewDate = null;
        }
      }

      return updated;
    });

    set({ applications: next });
    await get().saveAll();
  },

  // Move to trash (soft delete)
  deleteApplication: async (id) => {
    const apps = get().applications;
    const toDelete = apps.find((a) => a.id === id);

    if (!toDelete) return;

    const nextApps = apps.filter((a) => a.id !== id);
    const nextTrash = [...get().trash, { ...toDelete, deletedAt: new Date().toISOString() }];

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
      applied: apps.filter((a) => a.status === "applied").length,
      interviews: apps.filter((a) => a.status === "interview").length,
      offers: apps.filter((a) => a.status === "offer").length,
    };
  },
}));

export default useApplicationStore;