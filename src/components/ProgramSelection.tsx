import React from 'react';
import { Program } from '../types/index';
import { programs } from '../data/programs';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onSelect: (program: Program) => void;
}

export function ProgramSelection({ onSelect }: Props) {
  const { t } = useLanguage();
  const [selectedField, setSelectedField] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const fields = Array.from(new Set(programs.map(p => p.field)));

  const filteredPrograms = programs.filter(program => {
    const matchesField = !selectedField || program.field === selectedField;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      program.university.toLowerCase().includes(searchLower) ||
      program.city.toLowerCase().includes(searchLower) ||
      program.country.toLowerCase().includes(searchLower) ||
      program.field.toLowerCase().includes(searchLower);
    return matchesField && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 bg-gradient-to-br from-indigo-50 to-white p-8 rounded-xl shadow-lg border border-indigo-100">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            {t.program.search}
          </label>
          <div className="mt-2 relative group">
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-xl border-gray-300 pl-5 pr-12 py-4 text-base placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 hover:border-gray-400 group-hover:shadow-md"
              placeholder={t.program.searchPlaceholder}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="h-6 w-6 text-indigo-500 opacity-75" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div>
        <label htmlFor="field" className="block text-sm font-medium text-gray-700">
          {t.program.field}
        </label>
        <select
          id="field"
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
          className="mt-2 block w-full rounded-xl border-gray-300 py-4 text-base focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200 hover:border-gray-400 shadow-sm hover:shadow-md"
        >
          <option value="">{t.program.allFields}</option>
          {fields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-indigo-500 hover:shadow-md hover:scale-[1.02] cursor-pointer"
            onClick={() => onSelect(program)}
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{program.university}</h3>
              <p className="text-sm text-gray-500">{program.city}, {program.country}</p>
              <p className="text-sm text-gray-500">{program.field}</p>
              <p className="text-sm font-semibold text-emerald-600 bg-emerald-50 inline-block px-3 py-1 rounded-full">
                {t.program.tuition}: €{program.tuitionFee.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}