import React from 'react';
import PropTypes from 'prop-types';
import { FileDown, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function RegistrationSummary({ registration, onDownload, onRestart, onBack }) {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-indigo-600">
          <h3 className="text-2xl font-bold text-white">{t.summary.title}</h3>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <h4 className="text-lg font-semibold text-indigo-900 mb-4">{t.steps.personalInfo}</h4>
            <dl className="grid grid-cols-1 gap-6">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.student.firstName}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.student.firstName}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.student.lastName}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.student.lastName}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.student.birthDate}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {new Date(registration.student.birthDate).toLocaleDateString()}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.student.birthPlace}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.student.birthPlace}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.student.email}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.student.email}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.student.phone}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.student.phone}
                </dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100">
            <h4 className="text-lg font-semibold text-emerald-900 mb-4">{t.steps.program}</h4>
            <dl className="grid grid-cols-1 gap-6">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.field}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.program.field} - {registration.program.subField}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.university}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.program.university}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.city}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.program.city}, {registration.program.country}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.duration}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.program.duration}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.tuitionFee}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  €{registration.totalFees.tuition.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h4 className="text-lg font-semibold text-blue-900 mb-4">{t.steps.accommodation}</h4>
            <dl className="grid grid-cols-1 gap-6">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.accommodation.type}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  {registration.accommodation.type} ({registration.roommateCount} {registration.roommateCount === 1 ? t.accommodation.person : t.accommodation.people})
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.accommodationFee}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  €{registration.totalFees.accommodation.toLocaleString()} ({t.summary.academicYear})
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.insurance}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  €{registration.totalFees.insurance.toLocaleString()}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.program.additionalServices}</dt>
                <dd className="mt-1 text-base font-medium text-gray-900 sm:col-span-2 sm:mt-0">
                  €{registration.totalFees.services.toLocaleString()}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{t.validation.totalCost}</dt>
                <dd className="mt-1 text-xl font-bold text-emerald-600 sm:col-span-2 sm:mt-0">
                  €{registration.totalFees.total.toLocaleString()} ({t.summary.academicYear})
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{t.previous}</span>
          </button>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>{t.summary.startNew}</span>
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
            >
              <FileDown className="h-4 w-4 mr-2" />
              <span>{t.summary.download}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

RegistrationSummary.propTypes = {
  registration: PropTypes.shape({
    student: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      birthDate: PropTypes.string,
      birthPlace: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    }),
    program: PropTypes.shape({
      field: PropTypes.string,
      subField: PropTypes.string,
      university: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      duration: PropTypes.string
    }),
    accommodation: PropTypes.shape({
      type: PropTypes.string
    }),
    roommateCount: PropTypes.number,
    totalFees: PropTypes.shape({
      tuition: PropTypes.number,
      accommodation: PropTypes.number,
      insurance: PropTypes.number,
      services: PropTypes.number,
      total: PropTypes.number
    })
  }).isRequired,
  onDownload: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};

export default RegistrationSummary;