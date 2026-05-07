import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

export interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  category: string;
  altText?: string;
  tags: string[];
  description?: string;
  size?: string;
  uploadedBy?: string;
  createdAt: string;
}

interface GalleryState {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
  
  fetchItems: () => Promise<void>;
  addItem: (formData: FormData) => Promise<boolean>;
  updateItem: (id: string, data: Partial<GalleryItem>) => Promise<boolean>;
  deleteItem: (id: string) => Promise<boolean>;
}

export const useGalleryStore = create<GalleryState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/api/gallery');
      if (res.data.success) {
        set({ items: res.data.data, loading: false });
      }
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Failed to fetch gallery';
      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },

  addItem: async (formData: FormData) => {
    set({ loading: true });
    try {
      const res = await axios.post('/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        set((state) => ({ 
          items: [res.data.data, ...state.items],
          loading: false 
        }));
        toast.success('Asset uploaded successfully');
        return true;
      }
      return false;
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Upload failed';
      set({ loading: false });
      toast.error(msg);
      return false;
    }
  },

  updateItem: async (id: string, data: Partial<GalleryItem>) => {
    try {
      const res = await axios.patch(`/api/gallery/${id}`, data);
      if (res.data.success) {
        set((state) => ({
          items: state.items.map((item) => item._id === id ? res.data.data : item)
        }));
        toast.success('Asset updated');
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Update failed');
      return false;
    }
  },

  deleteItem: async (id: string) => {
    try {
      const res = await axios.delete(`/api/gallery/${id}`);
      if (res.data.success) {
        set((state) => ({
          items: state.items.filter((item) => item._id !== id)
        }));
        toast.success('Asset deleted');
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Delete failed');
      return false;
    }
  }
}));
