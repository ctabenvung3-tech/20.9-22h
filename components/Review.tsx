
import React from 'react';
import { SurveyData, WasteDataRow, HazardousWasteDataRow } from '../types';
import SectionWrapper from './SectionWrapper';
import { formatNumber } from '../utils/helpers';

interface ReviewProps {
  data: SurveyData;
}

const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 border-b border-gray-100">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
  </div>
);

const ReviewTable: React.FC<{title: string, data: (WasteDataRow | HazardousWasteDataRow)[], columns: {key: keyof (WasteDataRow & HazardousWasteDataRow), header: string}[]}> = ({ title, data, columns }) => (
    <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-2">{title}</h4>
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(col => <th key={String(col.key)} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col.header}</th>)}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? data.map((row, index) => (
                        <tr key={index}>
                            {columns.map(col => <td key={String(col.key)} className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{String(row[col.key]) || '-'}</td>)}
                        </tr>
                    )) : (
                        <tr><td colSpan={columns.length} className="px-4 py-3 text-center text-sm text-gray-500">Không có dữ liệu</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);


const Review: React.FC<ReviewProps> = ({ data }) => {
  const { generalInfo, domesticWaste, industrialWaste, hazardousWaste, contactInfo } = data;

  const industrialCols = [
      { key: 'name' as const, header: 'Tên chất thải' }, { key: 'vol2023' as const, header: '2023 (kg/năm)' },
      { key: 'vol2024' as const, header: '2024 (kg/năm)' }, { key: 'vol2025' as const, header: '6 tháng 2025 (kg)' },
      { key: 'receiver' as const, header: 'Tiếp nhận' },
  ];
  
  const hazardousCols = [
      { key: 'name' as const, header: 'Tên chất thải' }, { key: 'code' as const, header: 'Mã CTNH' },
      { key: 'vol2023' as const, header: '2023 (kg)' }, { key: 'vol2024' as const, header: '2024 (kg/năm)' },
      { key: 'vol2025' as const, header: '6 tháng 2025 (kg)' }, { key: 'method' as const, header: 'Phương pháp' },
      { key: 'receiver' as const, header: 'Tiếp nhận' },
  ];

  return (
    <SectionWrapper title="Xem lại thông tin" subtitle="Vui lòng kiểm tra lại thông tin trước khi gửi khảo sát">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-teal-700 border-b pb-2 mb-3">THÔNG TIN CHUNG</h3>
          <dl>
            <InfoRow label="Tên doanh nghiệp" value={generalInfo.companyName} />
            <InfoRow label="Địa chỉ" value={generalInfo.address} />
            <InfoRow label="Ngành nghề sản xuất" value={generalInfo.industry} />
            <InfoRow label="Vốn điều lệ" value={generalInfo.capital} />
            <InfoRow label="Quy mô lao động" value={`${generalInfo.employeeCount} người`} />
            <InfoRow label="Diện tích nhà xưởng" value={`${generalInfo.factoryArea} m²`} />
            <InfoRow label="Loại hình doanh nghiệp" value={generalInfo.businessType} />
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-teal-700 border-b pb-2 mb-3">CHẤT THẢI RẮN SINH HOẠT</h3>
           <ReviewTable title="" data={domesticWaste} columns={industrialCols} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-teal-700 border-b pb-2 mb-3">CHẤT THẢI RẮN CÔNG NGHIỆP</h3>
          <ReviewTable title="Sử dụng trực tiếp làm nguyên liệu" data={industrialWaste.directUse} columns={industrialCols} />
          <ReviewTable title="Tái sử dụng, tái chế" data={industrialWaste.reuse} columns={industrialCols} />
          <ReviewTable title="Chất thải phải xử lý" data={industrialWaste.treatment} columns={industrialCols} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-teal-700 border-b pb-2 mb-3">CHẤT THẢI NGUY HẠI</h3>
          <ReviewTable title="" data={hazardousWaste} columns={hazardousCols} />
            <dl className="mt-4">
                <InfoRow label="Người liên hệ" value={contactInfo.name} />
                <InfoRow label="Số điện thoại" value={contactInfo.phone} />
            </dl>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Review;
