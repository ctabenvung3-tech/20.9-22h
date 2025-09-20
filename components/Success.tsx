
import React from 'react';

const Success: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  return (
    <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Gửi khảo sát thành công!</h2>
      <p className="mt-2 text-gray-600">Cảm ơn bạn đã hoàn thành khảo sát. Thông tin của bạn đã được ghi nhận.</p>
       <button
            type="button"
            onClick={onReset}
            className="mt-6 px-6 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors"
        >
            Thực hiện khảo sát mới
        </button>
    </div>
  );
};

export default Success;
