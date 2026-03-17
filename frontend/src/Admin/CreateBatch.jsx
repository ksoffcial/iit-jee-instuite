import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import axiosClient from '../utils/axisoClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookOpen, Calendar, Clock, User, Plus, Trash2, LayoutGrid } from 'lucide-react';

// Updated Schema to include nested arrays
const batchSchema = z.object({
    BatchName: z.string().min(3, "Batch name should be at least 3 characters"),
    className: z.enum(["12th", "11th", "dropper", "jee", "neet"], { 
        errorMap: () => ({ message: "Please select a valid class" }) 
    }),
    startDate: z.string().min(4, "Enter a valid start date"),
    description: z.string().min(10, "Description is too short"), // Reduced for testing
    timePeriods: z.string().min(3, "Enter the duration"),
    // Adding nested validation
    time: z.array(z.object({
        subject: z.string().min(1, "Subject required"),
        subTime: z.string().min(1, "Time required")
    })),
    subjects: z.array(z.object({
        subjectName: z.string().min(1, "Subject name required"),
        teacherName: z.string().min(1, "Teacher name required")
    }))
});

const CreateBatch = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(batchSchema),
        defaultValues: {
            time: [{ subject: "", subTime: "" }],
            subjects: [{ subjectName: "", teacherName: "" }]
        }
    });

    // Handle Dynamic Fields
    const { fields: timeFields, append: appendTime, remove: removeTime } = useFieldArray({ control, name: "time" });
    const { fields: subjectFields, append: appendSubject, remove: removeSubject } = useFieldArray({ control, name: "subjects" });

    const onSubmit = async (data) => {
        try {
            const response = await axiosClient.post("/batch/create", data);
            console.log("Success:", response.data);
            alert("Batch Created Successfully!");
        } catch (error) {
            console.error("Error creating batch:", error);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-4xl mx-auto card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold flex items-center gap-2 mb-6">
                        <LayoutGrid className="text-primary" /> Create New Batch
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Basic Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label font-semibold">Batch Name</label>
                                <input 
                                    type="text" 
                                    className={`input input-bordered ${errors.BatchName ? 'input-error' : ''}`} 
                                    placeholder="e.g. Alpha JEE 2026" 
                                    {...register("BatchName")} 
                                />
                                {errors.BatchName && <span className="text-error text-sm mt-1">{errors.BatchName.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold">Class/Category</label>
                                <select 
                                    className={`select select-bordered ${errors.className ? 'select-error' : ''}`}
                                    {...register("className")}
                                >
                                    <option value="">Select Category</option>
                                    <option value="11th">11th Standard</option>
                                    <option value="12th">12th Standard</option>
                                    <option value="dropper">Dropper</option>
                                    <option value="jee">IIT-JEE</option>
                                    <option value="neet">NEET</option>
                                </select>
                                {errors.className && <span className="text-error text-sm mt-1">{errors.className.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label font-semibold">Start Date</label>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. 15th April" 
                                        className={`input input-bordered w-full ${errors.startDate ? 'input-error' : ''}`}
                                        {...register("startDate")} 
                                    />
                                </div>
                                {errors.startDate && <span className="text-error text-sm mt-1">{errors.startDate.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold">Course Duration</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 6 Months" 
                                    className={`input input-bordered ${errors.timePeriods ? 'input-error' : ''}`}
                                    {...register("timePeriods")} 
                                />
                                {errors.timePeriods && <span className="text-error text-sm mt-1">{errors.timePeriods.message}</span>}
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label font-semibold">Description</label>
                            <textarea 
                                className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
                                placeholder="Describe the batch objectives and curriculum..."
                                {...register("description")}
                            ></textarea>
                            {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
                        </div>

                        <div className="divider">Schedule & Faculty</div>

                        {/* Dynamic Schedule Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold flex items-center gap-2"><Clock size={18}/> Class Timings</h3>
                                <button type="button" onClick={() => appendTime({ subject: "", subTime: "" })} className="btn btn-ghost btn-sm text-primary">
                                    <Plus size={16}/> Add Time
                                </button>
                            </div>
                            {timeFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start">
                                    <input 
                                        className="input input-sm input-bordered flex-1" 
                                        placeholder="Subject" 
                                        {...register(`time.${index}.subject`)} 
                                    />
                                    <input 
                                        className="input input-sm input-bordered flex-1" 
                                        placeholder="Time (e.g. 10 AM)" 
                                        {...register(`time.${index}.subTime`)} 
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => removeTime(index)} className="btn btn-sm btn-error btn-outline btn-square">
                                            <Trash2 size={16}/>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Faculty Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold flex items-center gap-2"><User size={18}/> Assigned Faculty</h3>
                                <button type="button" onClick={() => appendSubject({ subjectName: "", teacherName: "" })} className="btn btn-ghost btn-sm text-primary">
                                    <Plus size={16}/> Add Teacher
                                </button>
                            </div>
                            {subjectFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start">
                                    <input 
                                        className="input input-sm input-bordered flex-1" 
                                        placeholder="Subject Name" 
                                        {...register(`subjects.${index}.subjectName`)} 
                                    />
                                    <input 
                                        className="input input-sm input-bordered flex-1" 
                                        placeholder="Teacher Name" 
                                        {...register(`subjects.${index}.teacherName`)} 
                                    />
                                    {index > 0 && (
                                        <button type="button" onClick={() => removeSubject(index)} className="btn btn-sm btn-error btn-outline btn-square">
                                            <Trash2 size={16}/>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="card-actions justify-end mt-8">
                            <button 
                                type="submit" 
                                className={`btn btn-primary btn-block md:w-auto ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Batch'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBatch;