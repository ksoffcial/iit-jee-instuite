
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axisoClient';
import { UserPlus, Image, Star, BookOpen, GraduationCap, Briefcase, Phone, Send } from 'lucide-react';

// Enhanced Schema for validation
const mentorSchema = z.object({
  mentorName: z.string().min(3, "Mentor name must be at least 3 letters"),
  image: z.string().url("Please enter a valid image URL").or(z.string().min(1, "Image URL is required")),
  rating: z.string().min(1, "Rating is required"),
  subject: z.string().min(2, "Subject is required"),
  degree: z.string().min(2, "Degree/Qualification is required"),
  experince: z.string().min(1, "Experience is required"),
  contactNumber: z.string().length(10, "Contact must be 10 digits"),
});

const AddMentor = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(mentorSchema), // Connect Zod to React Hook Form
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosClient.post("/mentor/create", data);
      console.log("Success:", response.data);
      alert("Form submitted successfully!");
      reset();
      // Optional: Add a success toast here
    } catch (error) {
      console.error("Error adding mentor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-2xl mx-auto card bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary text-primary-content rounded-xl">
              <UserPlus size={28} />
            </div>
            <h1 className="text-3xl font-bold">Add Mentor Details</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Mentor Name */}
            <div className="form-control">
              <label className="label font-semibold">Mentor Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <UserPlus size={18} />
                </span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`input input-bordered w-full pl-10 ${errors.mentorName ? 'input-error' : ''}`}
                  {...register("mentorName")}
                />
              </div>
              {errors.mentorName && <span className="text-error text-sm mt-1">{errors.mentorName.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image URL */}
              <div className="form-control">
                <label className="label font-semibold">Image URL</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Image size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="https://image-link.com"
                    className="input input-bordered w-full pl-10"
                    {...register("image")}
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="form-control">
                <label className="label font-semibold">Rating</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Star size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. 4.5"
                    className="input input-bordered w-full pl-10"
                    {...register("rating")}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject */}
              <div className="form-control">
                <label className="label font-semibold">Subject Expertise</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <BookOpen size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Physics, Math, etc."
                    className="input input-bordered w-full pl-10"
                    {...register("subject")}
                  />
                </div>
              </div>

              {/* Degree */}
              <div className="form-control">
                <label className="label font-semibold">Qualification</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <GraduationCap size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="B.Tech, PhD, etc."
                    className="input input-bordered w-full pl-10"
                    {...register("degree")}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Experience */}
              <div className="form-control">
                <label className="label font-semibold">Experience</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Briefcase size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. 5 Years"
                    className="input input-bordered w-full pl-10"
                    {...register("experince")}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="form-control">
                <label className="label font-semibold">Contact Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Phone size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="10 digit number"
                    className="input input-bordered w-full pl-10"
                    {...register("contactNumber")}
                  />
                </div>
                {errors.contactNumber && <span className="text-error text-sm mt-1">{errors.contactNumber.message}</span>}
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary w-full gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Details
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMentor;