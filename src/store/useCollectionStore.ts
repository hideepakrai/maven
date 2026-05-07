import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

export interface CollectionItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  mediaItems: string[];
  status: "published" | "draft";
  showOn: string[];
  tags: string[];
  seo: {
    title?: string;
    description?: string;
  };
  updatedAt: string;
}

interface CollectionState {
  collections: CollectionItem[];
  currentCollection: CollectionItem | null;
  loading: boolean;
  
  fetchCollections: (status?: string) => Promise<void>;
  fetchCollectionById: (id: string) => Promise<void>;
  createCollection: (data: Partial<CollectionItem>) => Promise<boolean>;
  updateCollection: (id: string, data: Partial<CollectionItem>) => Promise<boolean>;
  deleteCollection: (id: string) => Promise<boolean>;
  reorderMedia: (id: string, mediaIds: string[]) => Promise<boolean>;
}

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  currentCollection: null,
  loading: false,

  fetchCollections: async (status) => {
    set({ loading: true });
    try {
      const url = status && status !== "All" ? `/api/collections?status=${status}` : '/api/collections';
      const res = await axios.get(url);
      if (res.data.success) {
        set({ collections: res.data.data, loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to fetch gallery collections");
    }
  },

  fetchCollectionById: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/collections/${id}`);
      if (res.data.success) {
        set({ currentCollection: res.data.data, loading: false });
      }
    } catch (error) {
      set({ loading: false });
      toast.error("Failed to load collection details");
    }
  },

  createCollection: async (data) => {
    try {
      const res = await axios.post('/api/collections', data);
      if (res.data.success) {
        set((state) => ({ collections: [res.data.data, ...state.collections] }));
        toast.success("Curated collection created successfully");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Collection creation failure");
      return false;
    }
  },

  updateCollection: async (id, data) => {
    try {
      const res = await axios.patch(`/api/collections/${id}`, data);
      if (res.data.success) {
        set((state) => ({
          collections: state.collections.map(c => c._id === id ? res.data.data : c),
          currentCollection: state.currentCollection?._id === id ? res.data.data : state.currentCollection
        }));
        toast.success("Showcase settings updated");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Update failure");
      return false;
    }
  },

  deleteCollection: async (id) => {
    try {
      const res = await axios.delete(`/api/collections/${id}`);
      if (res.data.success) {
        set((state) => ({
          collections: state.collections.filter(c => c._id !== id),
          currentCollection: state.currentCollection?._id === id ? null : state.currentCollection
        }));
        toast.success("Collection purged from studio system");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Purge failure");
      return false;
    }
  },

  reorderMedia: async (id, mediaIds) => {
    try {
      const res = await axios.patch(`/api/collections/${id}`, { mediaItems: mediaIds });
      if (res.data.success) {
        set((state) => ({
          currentCollection: state.currentCollection?._id === id ? res.data.data : state.currentCollection
        }));
        // Note: No toast for reorder to keep UX smooth
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Sequence synchronization failure");
      return false;
    }
  }
}));
