import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { serviceFees } from '../data/programs';
import { useLanguage } from '../contexts/LanguageContext';

export function ProgramDetails({ program, registration, onComplete }) {
  const { t } = useLanguage();
  const [totalFees, setTotalFees] = useState({
    tuition: program.tuitionFee,
    accommodation: registration?.accommodationDetails?.yearlyFee || 0,
    insurance: serviceFees.studentInsurance,
    serviceFees: 0,
    total: 0
  });
  const [additionalServices, setAdditionalServices] = useState({
    hasPassport: false,
    needPassportAssistance: false,
    hasTranslatedDiplomas: false,
    needTranslationService: false,
    hasRussianContact: false,
    needAirportPickup: false,
    needYearlyAssistance: true
  });

  useEffect(() => {
    const servicesTotal = (
      (additionalServices.needPassportAssistance ? serviceFees.passportAssistance : 0) +
      (additionalServices.needTranslationService ? serviceFees.diplomaTranslation : 0) +
      (additionalServices.needAirportPickup ? serviceFees.airportPickup : 0) +
      (additionalServices.needYearlyAssistance ? serviceFees.yearlyAssistance : 0)
    );

    setTotalFees(prev => ({
      ...prev,
      serviceFees: servicesTotal,
      total: prev.tuition + prev.accommodation + prev.insurance + servicesTotal
    }));
  }, [additionalServices]);
  
  const handleComplete = () => {
    onComplete({
      ...program,
      additionalServices
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-6">{t.program.additionalServices}</h3>

        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={additionalServices.hasPassport}
                onChange={(e) => {
                  setAdditionalServices(prev => ({
                    ...prev,
                    hasPassport: e.target.checked,
                    needPassportAssistance: e.target.checked ? false : prev.needPassportAssistance
                  }));
                }}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">{t.services.hasPassport}</span>
            </label>
            
            {!additionalServices.hasPassport && (
              <div className="ml-6 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={additionalServices.needPassportAssistance}
                    onChange={(e) => setAdditionalServices(prev => ({
                      ...prev,
                      needPassportAssistance: e.target.checked
                    }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{t.services.needPassportAssistance}</span>
                </label>
                {additionalServices.needPassportAssistance && (
                  <p className="text-sm text-gray-500 ml-6 mt-1">
                    + €{serviceFees.passportAssistance}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={additionalServices.hasTranslatedDiplomas}
                onChange={(e) => {
                  setAdditionalServices(prev => ({
                    ...prev,
                    hasTranslatedDiplomas: e.target.checked,
                    needTranslationService: e.target.checked ? false : prev.needTranslationService
                  }));
                }}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">{t.services.hasTranslatedDiplomas}</span>
            </label>
            
            {!additionalServices.hasTranslatedDiplomas && (
              <div className="ml-6 mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={additionalServices.needTranslationService}
                    onChange={(e) => setAdditionalServices(prev => ({
                      ...prev,
                      needTranslationService: e.target.checked
                    }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{t.services.needTranslationService}</span>
                </label>
                {additionalServices.needTranslationService && (
                  <p className="text-sm text-gray-500 ml-6 mt-1">
                    + €{serviceFees.diplomaTranslation}
                  </p>
                )}
              </div>
            )}
          </div>

          {program.country === 'Russie' && (
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={additionalServices.hasRussianContact}
                  onChange={(e) => {
                    setAdditionalServices(prev => ({
                      ...prev,
                      hasRussianContact: e.target.checked,
                      needAirportPickup: e.target.checked ? false : prev.needAirportPickup
                    }));
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">{t.services.hasRussianContact}</span>
              </label>
              
              {!additionalServices.hasRussianContact && (
                <div className="ml-6 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={additionalServices.needAirportPickup}
                      onChange={(e) => setAdditionalServices(prev => ({
                        ...prev,
                        needAirportPickup: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2">{t.services.needAirportPickup}</span>
                  </label>
                  {additionalServices.needAirportPickup && (
                    <p className="text-sm text-gray-500 ml-6 mt-1">
                      + €{serviceFees.airportPickup}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={additionalServices.needYearlyAssistance}
                onChange={(e) => setAdditionalServices(prev => ({
                  ...prev,
                  needYearlyAssistance: e.target.checked
                }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">{t.services.yearlyAssistance}</span>
            </label>
            <p className="text-sm text-gray-500 ml-6 mt-1">
              {t.services.yearlyAssistanceDescription}
            </p>
            {additionalServices.needYearlyAssistance && (
              <p className="text-sm text-gray-500 ml-6 mt-1">
                + €{serviceFees.yearlyAssistance}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
        <h3 className="text-xl font-semibold mb-4">{t.program.costs}</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>{t.program.tuitionFee}</span>
            <span>€{totalFees.tuition.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.program.accommodationFee}</span>
            <span>€{totalFees.accommodation.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.program.insurance}</span>
            <span>€{totalFees.insurance.toLocaleString()}</span>
          </div>
          {(additionalServices.needPassportAssistance ||
            additionalServices.needTranslationService ||
            additionalServices.needAirportPickup ||
            additionalServices.needYearlyAssistance) && (
            <div className="flex justify-between">
              <span>{t.program.additionalServices}</span>
              <span>€{totalFees.serviceFees.toLocaleString()}</span>
            </div>
          )}
          <div className="pt-2 mt-2 border-t border-indigo-400">
            <div className="flex justify-between text-lg font-semibold">
              <span>{t.program.totalCost}</span>
              <span>€{totalFees.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="mt-6 w-full bg-white text-indigo-600 py-2 px-4 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
        >
          {t.program.continue}
        </button>
      </div>
    </div>
  );
}

ProgramDetails.propTypes = {
  program: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    subField: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    ranking: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    careers: PropTypes.arrayOf(PropTypes.string).isRequired,
    tuitionFee: PropTypes.number.isRequired,
    accommodationFee: PropTypes.number,
    availability: PropTypes.bool.isRequired,
    additionalServices: PropTypes.shape({
      hasPassport: PropTypes.bool,
      needPassportAssistance: PropTypes.bool,
      hasTranslatedDiplomas: PropTypes.bool,
      needTranslationService: PropTypes.bool,
      hasRussianContact: PropTypes.bool,
      needAirportPickup: PropTypes.bool,
      needYearlyAssistance: PropTypes.bool
    })
  }).isRequired,
  registration: PropTypes.object,
  onComplete: PropTypes.func.isRequired
};

export default ProgramDetails;