import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

export interface MediaItem {
  _id: string;
  name: string;
  slug: string;
  url: string;
  publicId: string;
  type: "image" | "video" | "pdf" | "blueprint" | "document";
  size: string;
  folder: string;
  dimensions?: string;
  altText?: string;
  tags: string[];
  description?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface FolderItem {
  _id: string;
  name: string;
  itemCount: number;
  lastUpdated: string;
}

interface MediaState {
  items: MediaItem[];
  folders: FolderItem[];
  loading: boolean;
  
  fetchMedia: (folder?: string) => Promise<void>;
  fetchFolders: () => Promise<void>;
  uploadMedia: (formData: FormData) => Promise<boolean>;
  deleteMedia: (id: string) => Promise<boolean>;
  createFolder: (name: string) => Promise<boolean>;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  items: [],
  folders: [],
  loading: false,

  fetchMedia: async (folder) => {
    set({ loading: true });
    try {
      const url = folder ? `/api/media?folder=${folder}` : '/api/media';
      const res = await axios.get(url);
      if (res.data.success) {
        set({ items: res.data.data, loading: false });
      }
    } catch (error: any) {
      set({ loading: false });
      toast.error("Failed to fetch media assets");
    }
  },

  fetchFolders: async () => {
    try {
      const res = await axios.get('/api/folders');
      if (res.data.success) {
        set({ folders: res.data.data });
      }
    } catch (error: any) {
      toast.error("Failed to fetch studio folders");
    }
  },

  uploadMedia: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post('/api/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        set((state) => ({ 
          items: [res.data.data, ...state.items],
          loading: false 
        }));
        toast.success("Asset uploaded to studio repository");
        get().fetchFolders(); // Refresh counts
        return true;
      }
      return false;
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.response?.data?.error || "Upload failed");
      return false;
    }
  },

  deleteMedia: async (id) => {
    try {
      const res = await axios.delete(`/api/media/${id}`);
      if (res.data.success) {
        set((state) => ({
          items: state.items.filter(i => i._id !== id)
        }));
        toast.success("Asset removed from library");
        get().fetchFolders(); // Refresh counts
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error("De-synchronization failure");
      return false;
    }
  },

  createFolder: async (name) => {
    try {
      const res = await axios.post('/api/folders', { name });
      if (res.data.success) {
        set((state) => ({ folders: [...state.folders, res.data.data] }));
        toast.success("New studio folder created");
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error("Folder creation failed");
      return false;
    }
  }
}));
