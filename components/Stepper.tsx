
import React from 'react';

interface StepperProps {
  currentStep: number;
}

const steps = ['A', 'B1', 'B2', 'C'];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const activeStepIndex = Math.min(currentStep, steps.length - 1);
  const progressPercentage = (activeStepIndex / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-teal-500 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className="flex justify-between items-center relative">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                index <= activeStepIndex ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
