"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Upload, 
  X, 
  Save, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters."),
  category: z.string().min(1, "Please select a category."),
  location: z.string().min(2, "Location is required."),
  description: z.string().min(10, "Description should be at least 10 characters long."),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectForm({ 
  initialData, 
  onSuccess 
}: { 
  initialData?: ProjectFormValues,
  onSuccess?: () => void 
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      location: "",
      description: "",
    },
  });

  const onSubmit = async (data: ProjectFormValues) => {
    // Mocking API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Submitted:", data);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Project Image Upload Mock */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">Project Cover Image</Label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              <Upload size={20} className="text-[#C25E4B]" />
            </div>
            <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">SVG, PNG, JPG (max 2MB)</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Project Name
            </Label>
            <Input 
              id="name" 
              {...register("name")} 
              className="bg-white border-gray-200 h-11 focus:ring-[#C25E4B] transition-all"
              placeholder="e.g. Skyline Villa"
            />
            {errors.name && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Category
            </Label>
            <select
              id="category"
              {...register("category")}
              className="w-full h-11 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#C25E4B] transition-all appearance-none"
            >
              <option value="">Select Category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Interior">Interior</option>
              <option value="Hospitality">Hospitality</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Location
          </Label>
          <Input 
            id="location" 
            {...register("location")} 
            className="bg-white border-gray-200 h-11 focus:ring-[#C25E4B] transition-all"
            placeholder="e.g. Jaipur, India"
          />
          {errors.location && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={10} /> {errors.location.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Description
          </Label>
          <Textarea 
            id="description" 
            {...register("description")} 
            rows={4} 
            className="bg-white border-gray-200 resize-none focus:ring-[#C25E4B] transition-all"
            placeholder="Describe the architectural concept and materials used..."
          />
          {errors.description && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={10} /> {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Button 
          type="button" 
          variant="ghost" 
          className="text-gray-500 font-bold uppercase tracking-widest text-xs h-11"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-[#121212] hover:bg-black text-white px-8 h-11 font-bold uppercase tracking-widest text-xs flex items-center gap-2"
        >
          {isSubmitting ? "Saving..." : <><Save size={14} /> Save Project</>}
        </Button>
      </div>
    </form>
  );
}
