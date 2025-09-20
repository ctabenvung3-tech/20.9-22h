
import React from 'react';
import { WasteDataRow } from '../types';
import { formatNumber, calculateTotal } from '../utils/helpers';

interface DynamicTableProps<T> {
  title: string;
  rows: T[];
  columns: { key: keyof T, header: string, type?: 'text' | 'number' }[];
  onUpdateRow: (rowIndex: number, field: keyof T, value: string) => void;
  onAddRow: () => void;
  onRemoveRow: () => void;
  showTotals: boolean;
}

const DynamicTable = <T extends WasteDataRow,>({ title, rows, columns, onUpdateRow, onAddRow, onRemoveRow, showTotals }: DynamicTableProps<T>) => {
  const handleInputChange = (rowIndex: number, field: keyof T, value: string) => {
    onUpdateRow(rowIndex, field, value);
  };
  
  return (
    <div className="p-6 bg-teal-50/50 rounded-lg border border-teal-200/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="space-x-2">
          <button type="button" onClick={onAddRow} className="px-4 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600 transition-colors">Thêm dòng</button>
          <button type="button" onClick={onRemoveRow} className="px-4 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">Xóa dòng cuối</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-teal-100/60 text-teal-800">
            <tr>
              <th className="p-3 font-medium w-12 text-center">STT</th>
              {columns.map(col => (
                <th key={String(col.key)} className="p-3 font-medium">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 last:border-b-0">
                <td className="p-2 text-center text-gray-600">{rowIndex + 1}</td>
                {columns.map(col => (
                  <td key={String(col.key)} className="p-2">
                    <input
                      type={col.type || 'text'}
                      value={String(row[col.key])}
                      onChange={(e) => handleInputChange(rowIndex, col.key, e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-white focus:ring-teal-500 focus:border-teal-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
            {showTotals && (
              <tr className="bg-teal-100/60 font-bold text-teal-900">
                <td colSpan={2} className="p-3 text-right">Tổng cộng</td>
                <td className="p-3">{formatNumber(calculateTotal(rows as WasteDataRow[], 'vol2023'))}</td>
                <td className="p-3">{formatNumber(calculateTotal(rows as WasteDataRow[], 'vol2024'))}</td>
                <td className="p-3">{formatNumber(calculateTotal(rows as WasteDataRow[], 'vol2025'))}</td>
                <td className="p-3 bg-gray-100"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
