
import React from 'react';
import { SurveyData, HazardousWasteDataRow } from '../types';
import SectionWrapper from './SectionWrapper';

interface StepCProps {
  data: {
    hazardousWaste: SurveyData['hazardousWaste'];
    contactInfo: SurveyData['contactInfo'];
  };
  updateHazardousWaste: (updatedRows: HazardousWasteDataRow[]) => void;
  updateContactInfo: (field: keyof SurveyData['contactInfo'], value: string) => void;
}

const treatmentMethods = [
  "TC - Tận thu/tái chế", "TH - Trung hòa", "PT - Phân tách/chiết/lọc/kết tủa", 
  "OH - Oxy hoá", "SH - Sinh học", "ĐX - Đồng xử lý", "TĐ - Thiêu đốt", 
  "HR - Hoá rắn", "CL - Cô lập/đóng kén", "C - Chôn lấp", "TR - Tẩy rửa", 
  "SC - Sơ chế", "Khác"
];

const treatmentLegend = [
    { code: 'TC', desc: 'Tận thu/tái chế' }, { code: 'TH', desc: 'Trung hòa' }, { code: 'PT', desc: 'Phân tách/chiết/lọc/kết tủa' },
    { code: 'OH', desc: 'Oxy hóa' }, { code: 'SH', desc: 'Sinh học' }, { code: 'ĐX', desc: 'Đồng xử lý' },
    { code: 'TĐ', desc: 'Thiêu đốt' }, { code: 'HR', desc: 'Hóa rắn' }, { code: 'CL', desc: 'Cô lập/đóng kén' },
    { code: 'C', desc: 'Chôn lấp' }, { code: 'TR', desc: 'Tẩy rửa' }, { code: 'SC', desc: 'Sơ chế' },
];

const StepC: React.FC<StepCProps> = ({ data, updateHazardousWaste, updateContactInfo }) => {
  const handleUpdateRow = (rowIndex: number, field: keyof HazardousWasteDataRow, value: string) => {
    const newData = [...data.hazardousWaste];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    updateHazardousWaste(newData);
  };

  const handleAddRow = () => {
    const newRow: HazardousWasteDataRow = { id: Date.now().toString(), name: '', code: '', vol2023: '', vol2024: '', vol2025: '', method: '', receiver: '' };
    updateHazardousWaste([...data.hazardousWaste, newRow]);
  };

  const handleRemoveRow = () => {
    if (data.hazardousWaste.length > 0) {
      updateHazardousWaste(data.hazardousWaste.slice(0, -1));
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateContactInfo(e.target.name as keyof SurveyData['contactInfo'], e.target.value);
  }

  return (
    <SectionWrapper title="PHẦN C - CHẤT THẢI NGUY HẠI" subtitle="Thông tin về chất thải nguy hại và liên hệ">
      <div className="p-6 bg-teal-50/50 rounded-lg border border-teal-200/50">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700"></h3>
            <div className="space-x-2">
                <button type="button" onClick={handleAddRow} className="px-4 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">Thêm dòng</button>
                <button type="button" onClick={handleRemoveRow} className="px-4 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">Xóa dòng cuối</button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-teal-100/60 text-teal-800">
                    <tr>
                        <th className="p-3 font-medium w-12 text-center">STT</th>
                        <th className="p-3 font-medium">Tên chất thải nguy hại</th>
                        <th className="p-3 font-medium">Mã CTNH</th>
                        <th className="p-3 font-medium">Khối lượng 2023 (kg)</th>
                        <th className="p-3 font-medium">Khối lượng 2024 (kg/năm)</th>
                        <th className="p-3 font-medium">Khối lượng 6 tháng đầu 2025 (kg)</th>
                        <th className="p-3 font-medium">Phương pháp xử lý</th>
                        <th className="p-3 font-medium">Tổ chức/cá nhân tiếp nhận</th>
                    </tr>
                </thead>
                <tbody>
                    {data.hazardousWaste.map((row, rowIndex) => (
                    <tr key={row.id} className="border-b border-gray-200 last:border-b-0">
                        <td className="p-2 text-center">{rowIndex + 1}</td>
                        <td className="p-2"><input type="text" value={row.name} onChange={e => handleUpdateRow(rowIndex, 'name', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md"/></td>
                        <td className="p-2"><input type="text" value={row.code} onChange={e => handleUpdateRow(rowIndex, 'code', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md"/></td>
                        <td className="p-2"><input type="number" value={row.vol2023} onChange={e => handleUpdateRow(rowIndex, 'vol2023', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md"/></td>
                        <td className="p-2"><input type="number" value={row.vol2024} onChange={e => handleUpdateRow(rowIndex, 'vol2024', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md"/></td>
                        <td className="p-2"><input type="number" value={row.vol2025} onChange={e => handleUpdateRow(rowIndex, 'vol2025', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md"/></td>
                        <td className="p-2">
                           <select value={row.method} onChange={e => handleUpdateRow(rowIndex, 'method', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white">
                                <option value="">Chọn...</option>
                                {treatmentMethods.map(m => <option key={m} value={m}>{m.split(' - ')[0]}</option>)}
                           </select>
                        </td>
                        <td className="p-2"><input type="text" value={row.receiver} onChange={e => handleUpdateRow(rowIndex, 'receiver', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded-md"/></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Ghi chú các ký hiệu phương pháp xử lý:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-xs text-gray-600">
            {treatmentLegend.map(item => <div key={item.code}><strong>{item.code}</strong>: {item.desc}</div>)}
        </div>
      </div>

      <div className="mt-6 p-6 border border-red-300 rounded-lg bg-red-50/50">
          <h4 className="font-semibold text-gray-800 mb-4 text-center">Thông tin liên hệ</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên người liên hệ <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={data.contactInfo.name} onChange={handleContactChange} className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-md" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="text" name="phone" value={data.contactInfo.phone} onChange={handleContactChange} className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-md" />
              </div>
          </div>
      </div>
    </SectionWrapper>
  );
};

export default StepC;
