
import React from 'react';
import { SurveyData } from '../types';
import SectionWrapper from './SectionWrapper';

interface StepAProps {
  data: SurveyData['generalInfo'];
  updateData: (field: keyof SurveyData['generalInfo'], value: string) => void;
}

const StepA: React.FC<StepAProps> = ({ data, updateData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateData(e.target.name as keyof SurveyData['generalInfo'], e.target.value);
  };

  const capitalOptions = ['Dưới 3 tỷ', 'Từ 3 đến dưới 20 tỷ', 'Từ 20 đến dưới 100 tỷ', 'Trên 100 tỷ'];
  const businessTypeOptions = [
    'Doanh nghiệp nhà nước (Nhà nước nắm giữ trên 50% vốn điều lệ, tổng số cổ phần có quyền biểu quyết)',
    'Doanh nghiệp FDI (DN có nhà đầu tư nước ngoài là thành viên, cổ đông)',
    'Doanh nghiệp ngoài nhà nước trong nước (bao gồm cả doanh nghiệp có cổ phần NN dưới 50%)',
  ];

  return (
    <SectionWrapper title="PHẦN A - THÔNG TIN CHUNG" subtitle="Thông tin cơ bản về doanh nghiệp">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên doanh nghiệp <span className="text-red-500">*</span></label>
          <input type="text" name="companyName" value={data.companyName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ <span className="text-red-500">*</span></label>
          <textarea name="address" value={data.address} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngành nghề sản xuất chính</label>
          <input type="text" name="industry" value={data.industry} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vốn điều lệ <span className="text-red-500">*</span></label>
          <div className="space-y-2">
            {capitalOptions.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input type="radio" name="capital" value={option} checked={data.capital === option} onChange={handleInputChange} className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500" />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quy mô lao động (người)</label>
            <input type="number" name="employeeCount" value={data.employeeCount} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích nhà xưởng sản xuất (m²)</label>
            <input type="number" name="factoryArea" value={data.factoryArea} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loại hình doanh nghiệp <span className="text-red-500">*</span></label>
          <div className="space-y-2">
            {businessTypeOptions.map(option => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer">
                <input type="radio" name="businessType" value={option.split('(')[0].trim()} checked={data.businessType === option.split('(')[0].trim()} onChange={handleInputChange} className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500 mt-1" />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default StepA;
