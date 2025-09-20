
import React from 'react';

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentStep, totalSteps, onBack, onNext, isSubmitting }) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
      <div>
        {!isFirstStep && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Quay lại
          </button>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Đang gửi...' : (isLastStep ? 'Hoàn thành khảo sát' : 'Tiếp theo')}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
