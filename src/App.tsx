import  { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { StudentForm } from './components/StudentForm';
import { ProgramSelection } from './components/ProgramSelection';
import { AccommodationSelection } from './components/AccommodationSelection';
import { RegistrationSummary } from './components/RegistrationSummary';
import type { Student, Program, Accommodation, Registration } from './types/index';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registration, setRegistration] = useState<Partial<Registration>>({});
  const { t } = useLanguage();

  const canGoBack = currentStep > 1;
  const canGoForward = () => {
    switch (currentStep) {
      case 1:
        return registration.student !== undefined;
      case 2:
        return registration.program !== undefined;
      case 3:
        return registration.accommodation !== undefined;
      default:
        return false;
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4 && (step < currentStep || canGoForward())) {
      setCurrentStep(step);
    }
  };

  const handleStudentSubmit = (student: Student) => {
    setRegistration(prev => ({ ...prev, student }));
    setCurrentStep(2);
  };

  const handleProgramSelect = (program: Program) => {
    setRegistration(prev => ({ ...prev, program }));
    setCurrentStep(3);
  };

  const handleAccommodationSelect = (accommodation: Accommodation, roommateCount: number) => {
    setRegistration(prev => ({ ...prev, accommodation, roommateCount }));
    setCurrentStep(4);
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
                  {currentStep === 2 && <ProgramSelection onSelect={handleProgramSelect} />}
                  {currentStep === 3 && (
                    <AccommodationSelection onSelect={handleAccommodationSelect} />
                  )}
                  {currentStep === 4 && registration.student && registration.program && registration.accommodation && (
                    <RegistrationSummary
                      registration={registration as Registration}
                      onDownload={handleDownload}
                      onRestart={handleRestart}
                      onBack={() => setCurrentStep(3)}
                    />
                  )}
                </div>
                {currentStep < 4 && (
                  <div className="mt-6 flex justify-between">
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
                    {currentStep < 4 && (
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
