
import React from 'react';
import { SurveyData, WasteDataRow } from '../types';
import SectionWrapper from './SectionWrapper';
import DynamicTable from './DynamicTable';

interface StepB1Props {
  data: SurveyData['domesticWaste'];
  updateData: (updatedRows: WasteDataRow[]) => void;
}

const StepB1: React.FC<StepB1Props> = ({ data, updateData }) => {
  const handleUpdateRow = (rowIndex: number, field: keyof WasteDataRow, value: string) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    updateData(newData);
  };

  const handleAddRow = () => {
    const newRow: WasteDataRow = { id: Date.now().toString(), name: '', vol2023: '', vol2024: '', vol2025: '', receiver: '' };
    updateData([...data, newRow]);
  };

  const handleRemoveRow = () => {
    if (data.length > 1) {
      updateData(data.slice(0, -1));
    }
  };

  const columns = [
    { key: 'name' as keyof WasteDataRow, header: 'Tên chất thải rắn sinh hoạt' },
    { key: 'vol2023' as keyof WasteDataRow, header: 'Khối lượng 2023 (kg/năm)', type: 'number' as const },
    { key: 'vol2024' as keyof WasteDataRow, header: 'Khối lượng 2024 (kg/năm)', type: 'number' as const },
    { key: 'vol2025' as keyof WasteDataRow, header: 'Khối lượng 6 tháng đầu 2025 (kg)', type: 'number' as const },
    { key: 'receiver' as keyof WasteDataRow, header: 'Tổ chức/cá nhân tiếp nhận' },
  ];

  return (
    <SectionWrapper title="PHẦN B1 - HIỆN TRẠNG PHÁT SINH CHẤT THẢI SINH HOẠT" subtitle="Thông tin về chất thải rắn sinh hoạt">
      <DynamicTable<WasteDataRow>
        title=""
        rows={data}
        columns={columns}
        onUpdateRow={handleUpdateRow}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
        showTotals={true}
      />
    </SectionWrapper>
  );
};

export default StepB1;
