import { create } from "zustand";
import { ensureFile, loadApplications, saveApplications } from "@/utils/driveClient";

const useApplicationStore = create((set, get)) => ({
    fileId: null,
    applications: [],
    ready: false,

    initFromDrive: async () => {
        const fileId = await ensureFile();  //creates if missing
        const apps = await loadApplications(fileId);
        set({ fileId, applications: apps, ready: true });
    },

    addApplication: async (app) => {
        const next = [ ...get().applications, app];
        set({ applications: next });
        await saveApplications(get().fileId, next);
    },

    updateApplications: async (id, fields) => {
        const next = get().applications.map(a => a.id === id ? { ...a, ...fields } : a);
        set({ applications: next });
        await saveApplications(get().fileId, next);
    },

    getStats: () => {
        const apps = get().applications;
        return {
            applied: apps.filter(a => a.status === "applied").length,
            interviews: apps.filter(a => a.status === "interview").length,
            offers: apps.filter(a => a.status === "offer").length,
        };
    },
}));

export default useApplicationStore;