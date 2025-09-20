
export interface WasteDataRow {
  id: string;
  name: string;
  vol2023: string;
  vol2024: string;
  vol2025: string;
  receiver: string;
}

export interface HazardousWasteDataRow {
  id: string;
  name: string;
  code: string;
  vol2023: string;
  vol2024: string;
  vol2025: string;
  method: string;
  receiver: string;
}

export interface SurveyData {
  generalInfo: {
    companyName: string;
    address: string;
    industry: string;
    capital: string;
    employeeCount: string;
    factoryArea: string;
    businessType: string;
  };
  domesticWaste: WasteDataRow[];
  industrialWaste: {
    directUse: WasteDataRow[];
    reuse: WasteDataRow[];
    treatment: WasteDataRow[];
  };
  hazardousWaste: HazardousWasteDataRow[];
  contactInfo: {
    name: string;
    phone: string;
  };
}
