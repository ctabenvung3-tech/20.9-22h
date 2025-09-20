
import React from 'react';

interface SectionWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, subtitle, children }) => {
  return (
    <div className="p-8 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SectionWrapper;
