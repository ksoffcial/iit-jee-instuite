import React from 'react';
import { Home, CheckCircle2, XCircle, Award } from 'lucide-react';

// Assuming 'navigate' and 'resultdata' are passed as props or available in scope
const ResultCard = ({ resultdata, navigate }) => {
  if (!resultdata) return null;

  // Calculate percentage for dynamic UI states
  const percentage = Math.round((resultdata.obtainedMarks / resultdata.totalMarks) * 100);
  const isPassed = percentage >= 40; // Adjust passing criteria as needed

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border-t-8 border-current animate-fade-in text-center">
        
        {/* Dynamic Status Header */}
        <div className={`card-body items-center ${isPassed ? 'text-success' : 'text-error'}`}>
          <div className="avatar placeholder mb-2">
            <div className={`w-16 rounded-full bg-current bg-opacity-10`}>
              {isPassed ? (
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              ) : (
                <XCircle className="w-8 h-8 stroke-[2.5]" />
              )}
            </div>
          </div>
          
          <h2 className="card-title text-2xl font-bold text-base-content">
            {resultdata.message || "Quiz Completed!"}
          </h2>
          
          <div className={`badge ${isPassed ? 'badge-success' : 'badge-error'} badge-md gap-1 font-semibold text-white`}>
            {isPassed ? "Passed" : "Failed"}
          </div>
        </div>

        {/* Score Stats Section */}
        <div className="px-6 py-4 bg-base-200 bg-opacity-50 flex justify-around items-center">
          {/* Radial Progress Visual */}
          <div 
            className={`radial-progress ${isPassed ? 'text-success' : 'text-error'} font-bold`} 
            style={{ "--value": percentage, "--size": "4.5rem", "--thickness": "6px" }}
            role="progressbar"
          >
            {percentage}%
          </div>

          {/* Breakdown Stats */}
          <div className="stats stats-vertical bg-transparent shadow-none text-left">
            <div className="stat p-1 py-0">
              <div className="stat-title text-xs flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-neutral-400" /> Score Obtained
              </div>
              <div className="stat-value text-xl text-primary">{resultdata.obtainedMarks}</div>
            </div>
            
            <div className="stat p-1 py-0 border-none mt-1">
              <div className="stat-title text-xs">Out of Total</div>
              <div className="stat-desc text-sm font-semibold text-base-content">{resultdata.totalMarks} Marks</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions p-6 pt-4">
          <button 
            className="btn btn-primary btn-block gap-2 group normal-case font-bold"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            Go to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultCard;