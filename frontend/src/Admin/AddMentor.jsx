import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axisoClient";
import {
  UserPlus,
  Star,
  BookOpen,
  GraduationCap,
  Briefcase,
  Phone,
  Send,
} from "lucide-react";

const mentorSchema = z.object({
  mentorName: z.string().min(3, "Mentor name must be at least 3 letters"),

  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required"),

  rating: z.string().min(1, "Rating is required"),
  subject: z.string().min(2, "Subject is required"),
  degree: z.string().min(2, "Degree/Qualification is required"),
  experince: z.string().min(1, "Experience is required"),

  contactNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Contact must be 10 digits"),
});

const AddMentor = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(mentorSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("mentorName", data.mentorName);
      formData.append("image", data.image[0]);
      formData.append("rating", data.rating);
      formData.append("subject", data.subject);
      formData.append("degree", data.degree);
      formData.append("experince", data.experince);
      formData.append("contactNumber", data.contactNumber);

      const response = await axiosClient.post("/mentor/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success:", response.data);
      alert("Mentor added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding mentor:", error);
      alert(error?.response?.data?.message || "Something went wrong");
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
            <div className="form-control">
              <label className="label font-semibold">Mentor Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className={`input input-bordered w-full ${
                  errors.mentorName ? "input-error" : ""
                }`}
                {...register("mentorName")}
              />
              {errors.mentorName && (
                <span className="text-error text-sm mt-1">
                  {errors.mentorName.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className={`file-input file-input-bordered w-full ${
                    errors.image ? "file-input-error" : ""
                  }`}
                  {...register("image")}
                />
                {errors.image && (
                  <span className="text-error text-sm mt-1">
                    {errors.image.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-semibold">Rating</label>
                <input
                  type="text"
                  placeholder="e.g. 4.5"
                  className="input input-bordered w-full"
                  {...register("rating")}
                />
                {errors.rating && (
                  <span className="text-error text-sm mt-1">
                    {errors.rating.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold">Subject Expertise</label>
                <input
                  type="text"
                  placeholder="Physics, Math, etc."
                  className="input input-bordered w-full"
                  {...register("subject")}
                />
                {errors.subject && (
                  <span className="text-error text-sm mt-1">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-semibold">Qualification</label>
                <input
                  type="text"
                  placeholder="B.Tech, PhD, etc."
                  className="input input-bordered w-full"
                  {...register("degree")}
                />
                {errors.degree && (
                  <span className="text-error text-sm mt-1">
                    {errors.degree.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold">Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Years"
                  className="input input-bordered w-full"
                  {...register("experince")}
                />
                {errors.experince && (
                  <span className="text-error text-sm mt-1">
                    {errors.experince.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-semibold">Contact Number</label>
                <input
                  type="text"
                  placeholder="10 digit number"
                  className="input input-bordered w-full"
                  {...register("contactNumber")}
                />
                {errors.contactNumber && (
                  <span className="text-error text-sm mt-1">
                    {errors.contactNumber.message}
                  </span>
                )}
              </div>
            </div>

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMentor;