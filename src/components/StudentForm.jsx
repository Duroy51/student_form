import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar } from 'lucide-react';
import { countries } from '../data/countries';

export function StudentForm({ onSubmit, initialData = {} }) {
  const { t, language } = useLanguage();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    country: 'CM',
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    birthDate: initialData.birthDate || '',
    birthPlace: initialData.birthPlace || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    parentName: initialData.parentName || '',
    parentContact: initialData.parentContact || ''
  });

  const validateField = (name, value) => {
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
        {
          const [day, month, year] = value.split('/').map(Number);
          if (!day || !month || !year) return '';
          
          const date = new Date(year, month - 1, day);
          const now = new Date();
          const minAge = new Date();
          minAge.setFullYear(now.getFullYear() - 15);
          
          if (
            date.getDate() !== day ||
            date.getMonth() !== month - 1 ||
            date.getFullYear() !== year
          ) {
            return t.validation.invalidDate;
          }
          
          if (date > minAge) {
            return t.validation.tooYoung;
          }
        }
        break;
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'country') {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const error = validateField(name, value);
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

  const formatDateString = (digits) => {
    let formattedDate = '';
    
    if (digits.length >= 2) {
      formattedDate = digits.substring(0, 2);
    } else {
      formattedDate = digits;
    }
    
    if (digits.length >= 4) {
      formattedDate += '/' + digits.substring(2, 4);
    } else if (digits.length > 2) {
      formattedDate += '/' + digits.substring(2);
    }
    
    if (digits.length >= 6) {
      formattedDate += '/' + digits.substring(4, 8);
    } else if (digits.length > 4) {
      formattedDate += '/' + digits.substring(4);
    }
    
    return formattedDate;
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
              type="text"
              id="birthDate"
              name="birthDate"
              inputMode="numeric"
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="JJ/MM/AAAA"
              value={formData.birthDate}
              onChange={(e) => {
                const value = e.target.value;
                const digits = value.replace(/\D/g, '');
                const formattedDate = formatDateString(digits);
                if (formattedDate.length <= 10) {
                  setFormData(prev => ({ ...prev, birthDate: formattedDate }));
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  const { value, selectionStart } = e.currentTarget;
                  if (value[selectionStart - 1] === '/') {
                    e.preventDefault();
                    const newValue = value.slice(0, selectionStart - 2) + value.slice(selectionStart);
                    setFormData(prev => ({ ...prev, birthDate: newValue }));
                  }
                }
                
                if (!/^\d$/.test(e.key) || e.ctrlKey || e.altKey || e.metaKey) {
                  if (!['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                    e.preventDefault();
                  }
                  return;
                }
                
                const { value, selectionStart } = e.currentTarget;
                const digits = value.replace(/\D/g, '') + e.key;
                
                if (digits.length > 8) {
                  e.preventDefault();
                  return;
                }
                
                e.preventDefault();
                const formattedDate = formatDateString(digits);
                const newCursorPos = formattedDate.length;
                
                setFormData(prev => {
                  requestAnimationFrame(() => {
                    const input = document.getElementById('birthDate');
                    if (input) {
                      input.setSelectionRange(newCursorPos, newCursorPos);
                    }
                  });
                  return { ...prev, birthDate: formattedDate };
                });
              }}
              required
              className={`block w-full rounded-md border ${errors.birthDate ? 'border-red-300' : 'border-gray-300'} bg-white px-4 py-3 text-base shadow-sm hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 appearance-none`}
            />
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
            )}
            <button
              type="button"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'date';
                input.onchange = (e) => {
                  const date = new Date(e.target.value);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = date.getFullYear();
                  setFormData(prev => ({ ...prev, birthDate: `${day}/${month}/${year}` }));
                };
                input.click();
              }}
              className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent border-0"
            >
              <Calendar className="h-5 w-5 text-gray-400" />
            </button>
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
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d+]/g, '');
                const country = countries.find(c => c.code === formData.country);
                const phoneCode = country?.phoneCode || '';
                const phoneNumber = value.startsWith('+') ? value : value.replace(/^\D+/g, '');
                setFormData(prev => ({
                  ...prev,
                  phone: phoneNumber.startsWith(phoneCode) ? phoneNumber : phoneCode + phoneNumber
                }));
              }}
              onPaste={(e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text');
                const cleanedNumber = pastedText.replace(/[^\d+]/g, '');
                const country = countries.find(c => c.code === formData.country);
                const phoneCode = country?.phoneCode || '';
                const phoneNumber = cleanedNumber.startsWith('+') ? cleanedNumber : cleanedNumber.replace(/^\D+/g, '');
                setFormData(prev => ({
                  ...prev,
                  phone: phoneNumber.startsWith(phoneCode) ? phoneNumber : phoneCode + phoneNumber
                }));
              }}
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
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d+]/g, '');
                setFormData(prev => ({
                  ...prev,
                  parentContact: value
                }));
              }}
              onPaste={(e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text');
                const cleanedNumber = pastedText.replace(/[^\d+]/g, '');
                setFormData(prev => ({
                  ...prev,
                  parentContact: cleanedNumber
                }));
              }}
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

StudentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.string,
    birthPlace: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    parentName: PropTypes.string,
    parentContact: PropTypes.string
  })
};

export default StudentForm;