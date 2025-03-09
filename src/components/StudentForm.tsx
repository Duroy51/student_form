import React from 'react';
import { Student } from '../types/index';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar} from 'lucide-react';
import { countries } from '../data/countries';

interface Props {
  onSubmit: (student: Student) => void;
  initialData?: Partial<Student>;
}

export function StudentForm({ onSubmit, initialData }: Props) {
  const { t, language } = useLanguage();
  const [errors, setErrors] = React.useState<Partial<Record<keyof Student, string>>>({});
  const [formData, setFormData] = React.useState<Student>({
    country: 'CM',
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    birthDate: initialData?.birthDate || '',
    birthPlace: initialData?.birthPlace || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    parentName: initialData?.parentName || '',
    parentContact: initialData?.parentContact || ''
  });

  const validateField = (name: keyof Student, value: string): string => {
    switch (name) {
      case 'phone':
      case 'parentContact':
        if (!/^\+\d{1,4}\d{6,}$/.test(value)) {
          return t.validation.invalidPhone;
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return t.validation.invalidEmail;
        }
        break;
      case 'firstName':
      case 'lastName':
      case 'birthPlace':
      case 'parentName':
        if (value.length < 2) {
          return t.validation.tooShort;
        }
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
          return t.validation.invalidName;
        }
        break;
      case 'birthDate':
        { const date = new Date(value);
        const now = new Date();
        const minAge = new Date();
        minAge.setFullYear(now.getFullYear() - 15);
        if (date > minAge) {
          return t.validation.tooYoung;
        }
        break; }
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Student, string>> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'country') {
        const error = validateField(key as keyof Student, value);
        if (error) {
          newErrors[key as keyof Student] = error;
        }
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone' || name === 'parentContact') {
      // Only allow numbers and + symbol
      if (!/^[0-9+]*$/.test(value)) {
        return;
      }
    }
    
    const error = validateField(name as keyof Student, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (name === 'country') {
      const country = countries.find(c => c.code === value);
      setFormData(prev => ({
        ...prev,
        country: value,
        phone: prev.phone.startsWith('+') ? country?.phoneCode || '' : prev.phone
      }));
    } else if (name === 'phone') {
      const country = countries.find(c => c.code === formData.country);
      const phoneCode = country?.phoneCode || '';
      const phoneNumber = value.startsWith('+') ? value : value.replace(/^\D+/g, '');
      setFormData(prev => ({
        ...prev,
        phone: phoneNumber.startsWith(phoneCode) ? phoneNumber : phoneCode + phoneNumber
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            {t.student.firstName}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            {t.student.lastName}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            {t.student.birthDate}
          </label>
          <div className="mt-1 relative">
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              required
              value={formData.birthDate}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.birthDate ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 appearance-none`}
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
            )}
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-5 w-5" />
          </div>
        </div>

        <div>
          <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700">
            {t.student.birthPlace}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="birthPlace"
              name="birthPlace"
              required
              value={formData.birthPlace}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.birthPlace ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            />
            {errors.birthPlace && (
              <p className="mt-1 text-sm text-red-600">{errors.birthPlace}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            {t.student.phone}
          </label>
          <div className="mt-1 grid grid-cols-3 gap-2">
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name[language]} ({country.phoneCode})
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className={`block w-full col-span-2 rounded-md border ${errors.phone ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t.student.email}
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
            {t.student.parentName}
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="parentName"
              name="parentName"
              required
              value={formData.parentName}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.parentName ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            />
            {errors.parentName && (
              <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="parentContact" className="block text-sm font-medium text-gray-700">
            {t.student.parentContact}
          </label>
          <div className="mt-1">
            <input
              type="tel"
              id="parentContact"
              name="parentContact"
              required
              value={formData.parentContact}
              onChange={handleChange}
              className={`block w-full rounded-md border ${errors.parentContact ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            />
            {errors.parentContact && (
              <p className="mt-1 text-sm text-red-600">{errors.parentContact}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {t.next}
        </button>
      </div>
    </form>
  );
}