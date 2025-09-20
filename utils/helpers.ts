
import { WasteDataRow } from '../types';

export const formatNumber = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) {
    return '0,00';
  }
  return num.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const calculateTotal = (rows: WasteDataRow[], key: keyof WasteDataRow): number => {
  return rows.reduce((acc, row) => {
    const value = parseFloat(String(row[key]).replace(',', '.'));
    return acc + (isNaN(value) ? 0 : value);
  }, 0);
};

export const INITIAL_DATA = {
  generalInfo: {
    companyName: 'Công ty A',
    address: '123 Đường B, Quận C, Thành phố D',
    industry: 'Dệt may',
    capital: 'Từ 3 đến dưới 20 tỷ',
    employeeCount: '44',
    factoryArea: '500',
    businessType: 'Doanh nghiệp nhà nước',
  },
  domesticWaste: [
    { id: 'dw1', name: 'Rác giấy', vol2023: '23', vol2024: '234', vol2025: '22', receiver: 'Urenco' }
  ],
  industrialWaste: {
    directUse: [
        { id: 'iwdu1', name: 'Bùn', vol2023: '33', vol2024: '66', vol2025: '55', receiver: 'Urenco' }
    ],
    reuse: [
        { id: 'iwrr1', name: 'Giấy thải', vol2023: '123', vol2024: '23', vol2025: '22', receiver: 'Urenco211' }
    ],
    treatment: [
        { id: 'iwt1', name: 'Thủy tinh thải', vol2023: '44', vol2024: '67', vol2025: '76', receiver: 'Urenco311' }
    ],
  },
  hazardousWaste: [
    { id: 'hw1', name: 'Giẻ lau dính dầu', code: '180204', vol2023: '33', vol2024: '77', vol2025: '66', method: 'TC - Tận thu/tái chế', receiver: 'Urenco 11' },
    { id: 'hw2', name: 'Bóng đèn dính dầu', code: '333333', vol2023: '23', vol2024: '22', vol2025: '55', method: 'TR - Tẩy rửa', receiver: 'Urenco' },
  ],
  contactInfo: {
    name: 'Hùng Hoa Bình',
    phone: '0902496254',
  },
};
