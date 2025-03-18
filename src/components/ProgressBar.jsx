import React from "react";

const ProgressBar = ({ step, totalSteps }) => {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="w-full flex flex-col items-center mb-6">
      <div className="flex items-center gap-4">
        <span className="text-primary font-bold">{step + 1}</span>
        <progress className="progress progress-primary w-56" value={progress} max="100"></progress>
        <span className="text-gray-500">{totalSteps}</span>
      </div>
    </div>
  );
};

export default ProgressBar;