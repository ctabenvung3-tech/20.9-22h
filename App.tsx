
import React, { useState } from 'react';
import { SurveyData, WasteDataRow, HazardousWasteDataRow } from './types';
import { INITIAL_DATA } from './utils/helpers';
import Stepper from './components/Stepper';
import StepA from './components/StepA';
import StepB1 from './components/StepB1';
import StepB2 from './components/StepB2';
import StepC from './components/StepC';
import Review from './components/Review';
import Success from './components/Success';
import Navigation from './components/Navigation';
import { submitSurvey } from './services/submissionService';

const TOTAL_FORM_STEPS = 5; // A, B1, B2, C, Review

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getInitialState = () => JSON.parse(JSON.stringify(INITIAL_DATA));
  const [data, setData] = useState<SurveyData>(getInitialState());

  const handleNext = async () => {
    if (step < TOTAL_FORM_STEPS - 1) {
      setStep(prev => prev + 1);
    } else {
      // Submit logic
      setIsSubmitting(true);
      const result = await submitSurvey(data);
      if (result.success) {
        setStep(prev => prev + 1);
      } else {
        alert("Có lỗi xảy ra khi gửi khảo sát. Vui lòng thử lại.");
      }
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleReset = () => {
    setData(getInitialState());
    setStep(0);
  }

  const updateGeneralInfo = (field: keyof SurveyData['generalInfo'], value: string) => {
    setData(prev => ({ ...prev, generalInfo: { ...prev.generalInfo, [field]: value } }));
  };

  const updateDomesticWaste = (updatedRows: WasteDataRow[]) => {
    setData(prev => ({ ...prev, domesticWaste: updatedRows }));
  };
  
  const updateIndustrialWaste = (field: keyof SurveyData['industrialWaste'], updatedRows: WasteDataRow[]) => {
    setData(prev => ({ ...prev, industrialWaste: { ...prev.industrialWaste, [field]: updatedRows } }));
  };
  
  const updateHazardousWaste = (updatedRows: HazardousWasteDataRow[]) => {
     setData(prev => ({ ...prev, hazardousWaste: updatedRows }));
  };

  const updateContactInfo = (field: keyof SurveyData['contactInfo'], value: string) => {
    setData(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, [field]: value } }));
  };


  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <StepA data={data.generalInfo} updateData={updateGeneralInfo} />;
      case 1:
        return <StepB1 data={data.domesticWaste} updateData={updateDomesticWaste} />;
      case 2:
        return <StepB2 data={data.industrialWaste} updateData={updateIndustrialWaste} />;
      case 3:
        return <StepC data={{hazardousWaste: data.hazardousWaste, contactInfo: data.contactInfo}} updateHazardousWaste={updateHazardousWaste} updateContactInfo={updateContactInfo} />;
      case 4:
        return <Review data={data} />;
      case 5:
        return <Success onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">KHẢO SÁT THÔNG TIN MÔI TRƯỜNG DOANH NGHIỆP</h1>
          <p className="mt-2 text-md text-gray-600">Chúng tôi cam kết chỉ sử dụng thông tin cho mục đích nghiên cứu khoa học</p>
        </header>
        
        {step < TOTAL_FORM_STEPS && <Stepper currentStep={step} />}

        <main>
          {renderStepContent()}
          {step < TOTAL_FORM_STEPS && (
            <Navigation 
              currentStep={step}
              totalSteps={TOTAL_FORM_STEPS}
              onBack={handleBack}
              onNext={handleNext}
              isSubmitting={isSubmitting}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
