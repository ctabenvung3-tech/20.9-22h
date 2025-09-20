
import React from 'react';
import { SurveyData, WasteDataRow } from '../types';
import SectionWrapper from './SectionWrapper';
import DynamicTable from './DynamicTable';
import { formatNumber, calculateTotal } from '../utils/helpers';

interface StepB2Props {
  data: SurveyData['industrialWaste'];
  updateData: (field: keyof SurveyData['industrialWaste'], updatedRows: WasteDataRow[]) => void;
}

const StepB2: React.FC<StepB2Props> = ({ data, updateData }) => {

  const createTableHandlers = (field: keyof SurveyData['industrialWaste']) => ({
    handleUpdateRow: (rowIndex: number, rowField: keyof WasteDataRow, value: string) => {
      const newData = [...data[field]];
      newData[rowIndex] = { ...newData[rowIndex], [rowField]: value };
      updateData(field, newData);
    },
    handleAddRow: () => {
      const newRow: WasteDataRow = { id: Date.now().toString(), name: '', vol2023: '', vol2024: '', vol2025: '', receiver: '' };
      updateData(field, [...data[field], newRow]);
    },
    handleRemoveRow: () => {
      if (data[field].length > 0) {
        updateData(field, data[field].slice(0, -1));
      }
    },
  });

  const directUseHandlers = createTableHandlers('directUse');
  const reuseHandlers = createTableHandlers('reuse');
  const treatmentHandlers = createTableHandlers('treatment');

  const columns = [
    { key: 'name' as keyof WasteDataRow, header: 'Tên chất thải' },
    { key: 'vol2023' as keyof WasteDataRow, header: 'Khối lượng 2023 (kg/năm)', type: 'number' as const },
    { key: 'vol2024' as keyof WasteDataRow, header: 'Khối lượng 2024 (kg/năm)', type: 'number' as const },
    { key: 'vol2025' as keyof WasteDataRow, header: 'Khối lượng 6 tháng đầu 2025 (kg)', type: 'number' as const },
    { key: 'receiver' as keyof WasteDataRow, header: 'Tổ chức/cá nhân tiếp nhận' },
  ];
  
  const total2023 = calculateTotal(data.directUse, 'vol2023') + calculateTotal(data.reuse, 'vol2023') + calculateTotal(data.treatment, 'vol2023');
  const total2024 = calculateTotal(data.directUse, 'vol2024') + calculateTotal(data.reuse, 'vol2024') + calculateTotal(data.treatment, 'vol2024');
  const total2025 = calculateTotal(data.directUse, 'vol2025') + calculateTotal(data.reuse, 'vol2025') + calculateTotal(data.treatment, 'vol2025');

  return (
    <SectionWrapper title="PHẦN B2 - CHẤT THẢI RẮN CÔNG NGHIỆP THÔNG THƯỜNG" subtitle="Thông tin về chất thải rắn công nghiệp">
      <div className="space-y-8">
        <DynamicTable<WasteDataRow>
          title="I. Sử dụng trực tiếp làm nguyên liệu"
          rows={data.directUse}
          columns={columns}
          onUpdateRow={directUseHandlers.handleUpdateRow}
          onAddRow={directUseHandlers.handleAddRow}
          onRemoveRow={directUseHandlers.handleRemoveRow}
          showTotals={true}
        />
        <DynamicTable<WasteDataRow>
          title="II. Tái sử dụng, tái chế"
          rows={data.reuse}
          columns={columns}
          onUpdateRow={reuseHandlers.handleUpdateRow}
          onAddRow={reuseHandlers.handleAddRow}
          onRemoveRow={reuseHandlers.handleRemoveRow}
          showTotals={true}
        />
        <DynamicTable<WasteDataRow>
          title="III. Chất thải phải xử lý"
          rows={data.treatment}
          columns={columns}
          onUpdateRow={treatmentHandlers.handleUpdateRow}
          onAddRow={treatmentHandlers.handleAddRow}
          onRemoveRow={treatmentHandlers.handleRemoveRow}
          showTotals={true}
        />
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">Tổng cộng toàn bộ chất thải công nghiệp</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-gray-600">Tổng 2023</p>
                <p className="text-xl font-bold text-teal-700">{formatNumber(total2023)} kg/năm</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-gray-600">Tổng 2024</p>
                <p className="text-xl font-bold text-teal-700">{formatNumber(total2024)} kg/năm</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-gray-600">Tổng 6 tháng 2025</p>
                <p className="text-xl font-bold text-teal-700">{formatNumber(total2025)} kg</p>
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default StepB2;
