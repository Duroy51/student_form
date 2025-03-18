import React, { useState } from 'react';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { StudentForm } from './components/StudentForm';
import { ProgramSelection } from './components/ProgramSelection';
import { AccommodationSelection } from './components/AccommodationSelection';
import { ProgramDetails } from './components/ProgramDetails';
import { RegistrationSummary } from './components/RegistrationSummary';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitch } from './components/LanguageSwitch';
import { serviceFees } from './data/programs';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registration, setRegistration] = useState({});
  const [runningTotal, setRunningTotal] = useState(0);
  const { t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState(null);

  const canGoBack = currentStep > 1;
  const canGoForward = () => {
    switch (currentStep) {
      case 1:
        return registration.student !== undefined;
      case 2:
        return selectedProgram !== null;
      case 3:
        return registration.accommodation !== undefined;
      case 4:
        return selectedProgram?.additionalServices !== undefined;
      default:
        return false;
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 5 && (step < currentStep || canGoForward())) {
      setCurrentStep(step);
    }
  };

  const handleStudentSubmit = (student) => {
    setRegistration(prev => ({ ...prev, student }));
    setCurrentStep(2);
  };

  const handleProgramPreSelect = (program) => {
    setRunningTotal(program.tuitionFee);
    setSelectedProgram(program);
    setCurrentStep(3);
  };

  const handleAccommodationSelect = (accommodation, roommateCount) => {
    const monthlyAccommodationFee = Math.round(accommodation.basePrice / roommateCount);
    const accommodationTotal = monthlyAccommodationFee * 10; // 10 mois
    setRunningTotal(prev => prev + accommodationTotal);
    
    setRegistration(prev => ({ 
      ...prev, 
      accommodation, 
      roommateCount,
      accommodationDetails: {
        monthlyFee: monthlyAccommodationFee,
        yearlyFee: accommodationTotal
      },
    }));
    
    if (selectedProgram) {
      setSelectedProgram({
        ...selectedProgram,
        accommodationFee: accommodationTotal,
      });
    }
    
    setCurrentStep(4);
  };

  const handleProgramFinalize = (program) => {
    // Calculate service fees based on selected services
    const serviceFeesTotal = (
      (program.additionalServices.needPassportAssistance ? serviceFees.passportAssistance : 0) +
      (program.additionalServices.needTranslationService ? serviceFees.diplomaTranslation : 0) +
      (program.additionalServices.needAirportPickup ? serviceFees.airportPickup : 0) +
      (program.additionalServices.needYearlyAssistance ? serviceFees.yearlyAssistance : 0)
    );
    
    // Calculate accommodation fees for the academic year (10 months)
    const yearlyAccommodationFee = registration.accommodationDetails?.yearlyFee || 0;
    
    // Calculate total cost
    const total = program.tuitionFee + yearlyAccommodationFee + serviceFees.studentInsurance + serviceFeesTotal;
    
    const updatedProgram = {
      ...program,
      additionalServices: program.additionalServices,
      accommodationFee: yearlyAccommodationFee
    };

    setRegistration(prev => ({
      ...prev,
      program: updatedProgram,
      additionalServices: program.additionalServices,
      totalFees: {
        tuition: program.tuitionFee,
        accommodation: yearlyAccommodationFee,
        insurance: serviceFees.studentInsurance,
        services: serviceFeesTotal,
        total: total
      }
    }));
    
    setRunningTotal(total);
    setSelectedProgram(updatedProgram);
    
    setCurrentStep(5);
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    alert('Registration form download would start here');
  };

  const handleRestart = () => {
    setRegistration({});
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <header className="mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-10 w-10 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <LanguageSwitch />
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <nav className="flex items-center space-x-4">
                    <div className="flex items-center space-x-12">
                      {[
                        t.steps.personalInfo,
                        t.steps.program,
                        t.steps.accommodation,
                        t.program.additionalServices,
                        t.steps.summary
                      ].map((stepName, index) => (
                        <div
                          key={stepName}
                          className="flex items-center"
                        >
                          <div className="relative">
                            <div
                              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                                currentStep > index + 1
                                  ? 'bg-emerald-500 cursor-pointer'
                                  : currentStep === index + 1
                                  ? 'bg-indigo-600'
                                  : 'bg-gray-200'
                              }`}
                              onClick={() => goToStep(index + 1)}
                            >
                              <span className="text-sm font-medium text-white">
                                {index + 1}
                              </span>
                            </div>
                            {index < 3 && (
                              <div
                                className={`absolute top-1/2 left-full w-12 h-0.5 -translate-y-1/2 transition-colors ${
                                  currentStep > index + 1 ? 'bg-emerald-500' : 'bg-gray-200'
                                }`}
                              />
                            )}
                          </div>
                          <span
                            className={`ml-3 text-sm font-medium transition-colors whitespace-nowrap ${
                              currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'
                            }`}
                          >
                            {stepName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  {currentStep === 1 && <StudentForm onSubmit={handleStudentSubmit} initialData={registration.student} />}
                  {currentStep === 2 && <ProgramSelection onSelect={handleProgramPreSelect} />}
                  {currentStep === 3 && (
                    <AccommodationSelection 
                      program={selectedProgram}
                      onSelect={handleAccommodationSelect}
                    />
                  )}
                  {currentStep === 4 && selectedProgram && (
                    <ProgramDetails
                      program={selectedProgram}
                      registration={registration}
                      onComplete={handleProgramFinalize}
                    />
                  )}
                  {currentStep === 5 && (
                    <RegistrationSummary
                      registration={registration}
                      onDownload={handleDownload}
                      onRestart={handleRestart}
                      onBack={() => setCurrentStep(4)}
                    />
                  )}
                </div>
                {currentStep < 5 && (
                  <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => goToStep(currentStep - 1)}
                        disabled={!canGoBack}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          canGoBack ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50' : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        {t.previous}
                      </button>
                      {currentStep < 5 && (
                        <button
                          type="button"
                          onClick={() => goToStep(currentStep + 1)}
                          disabled={!canGoForward()}
                          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                            canGoForward() ? 'text-white bg-emerald-500 hover:bg-emerald-600' : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                          }`}
                        >
                          {t.next}
                          <ChevronRight className="w-5 h-5 ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;