import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  PlusCircle, 
  Trash2, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Save,
  HelpCircle
} from 'lucide-react';
import axiosClient from '../utils/axisoClient';

// Enhanced Schema for full validation
const testSchema = z.object({
  TestName: z.string().min(3, "Test name must be at least 3 characters"),
  ClassName: z.string().min(1, "Class name is required"),
  questions: z.array(z.object({
    quest: z.string().min(5, "Question text is too short"),
    option1: z.string().min(1, "Option 1 is required"),
    option2: z.string().min(1, "Option 2 is required"),
    option3: z.string().min(1, "Option 3 is required"),
    option4: z.string().min(1, "Option 4 is required"),
    answer: z.string().min(1, "Please select the correct answer"),
  })).min(1, "Add at least one question")
});

const CreateTest = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(testSchema),
    defaultValues: {
      TestName: "",
      ClassName: "",
      questions: [{ quest: "", option1: "", option2: "", option3: "", option4: "", answer: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response = await axiosClient.post("/test/create", data);
      console.log("Success:", response.data);
      alert("Test Created Successfully!");
    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="text-primary" /> Create New Assessment
            </h1>
            <p className="text-base-content/60">Fill in the details and add your questions below.</p>
          </div>
          <div className="stats shadow bg-base-100">
            <div className="stat py-2 px-4">
              <div className="stat-title text-xs">Total Questions</div>
              <div className="stat-value text-2xl text-primary">{fields.length}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Basic Info Card */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-lg border-b pb-2 mb-4"><Layers size={20}/> Basic Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label text-xs font-bold uppercase">Test Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mid-Term Physics" 
                    className={`input input-bordered w-full ${errors.TestName ? 'input-error' : ''}`}
                    {...register("TestName")} 
                  />
                  {errors.TestName && <span className="text-error text-xs mt-1">{errors.TestName.message}</span>}
                </div>
                <div className="form-control w-full">
                  <label className="label text-xs font-bold uppercase">Class Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Class 12-A" 
                    className={`input input-bordered w-full ${errors.ClassName ? 'input-error' : ''}`}
                    {...register("ClassName")} 
                  />
                  {errors.ClassName && <span className="text-error text-xs mt-1">{errors.ClassName.message}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <HelpCircle className="text-secondary" /> Questions
              </h2>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="card bg-base-100 shadow-md border border-base-300 animate-in fade-in slide-in-from-bottom-2">
                <div className="card-body p-5">
                  <div className="flex justify-between items-start mb-4">
                    <span className="badge badge-secondary badge-outline font-bold p-3">
                      Question #{index + 1}
                    </span>
                    {fields.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => remove(index)} 
                        className="btn btn-ghost btn-xs text-error"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    )}
                  </div>

                  <div className="form-control w-full mb-4">
                    <textarea 
                      className={`textarea textarea-bordered w-full leading-tight ${errors.questions?.[index]?.quest ? 'textarea-error' : ''}`}
                      placeholder="Write your question here..."
                      {...register(`questions.${index}.quest`)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['option1', 'option2', 'option3', 'option4'].map((opt, i) => (
                      <div key={opt} className="join w-full">
                        <span className="join-item btn btn-sm no-animation bg-base-200">{i + 1}</span>
                        <input 
                          type="text" 
                          placeholder={`Option ${i + 1}`}
                          className="input input-bordered input-sm join-item w-full"
                          {...register(`questions.${index}.${opt}`)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <CheckCircle2 size={18} className="text-success" /> Select Correct Answer:
                    </div>
                    <select 
                      className="select select-bordered select-sm flex-1 md:max-w-xs"
                      {...register(`questions.${index}.answer`)}
                    >
                      <option value="">-- Choose --</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                      <option value="option4">Option 4</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => append({ quest: "", option1: "", option2: "", option3: "", option4: "", answer: "" })}
              className="btn btn-outline btn-secondary flex-1 gap-2"
            >
              <PlusCircle size={20} /> Add Another Question
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary flex-1 gap-2"
            >
              {isSubmitting ? <span className="loading loading-spinner"></span> : <Save size={20} />}
              Publish Test
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateTest;