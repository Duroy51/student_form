import React from 'react';
import PropTypes from 'prop-types';
import { programs, countries, fields, serviceFees } from '../data/programs';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Trophy, Clock, Briefcase } from 'lucide-react';

export function ProgramSelection({ onSelect }) {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [selectedUniversity, setSelectedUniversity] = React.useState('');
  const [selectedField, setSelectedField] = React.useState('');
  const [selectedSubField, setSelectedSubField] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('');
  const [showDetails, setShowDetails] = React.useState(false);

  const availableUniversities = React.useMemo(() => {
    return Array.from(new Set(
      programs
        .filter(p => !selectedCountry || p.country === selectedCountry)
        .map(p => p.university)
    ));
  }, [selectedCountry]);

  const selectedProgram = React.useMemo(() => {
    const program = programs.find(p => 
      p.country === selectedCountry &&
      p.university === selectedUniversity &&
      p.field === selectedField &&
      p.subField === selectedSubField &&
      p.level.toLowerCase() === selectedLevel.toLowerCase()
    );
    
    if (program) {
      setShowDetails(true);
    } else if (selectedCountry && selectedUniversity && selectedField && selectedSubField && selectedLevel) {
      setShowDetails(true); // Show "not available" message
    }
    
    return program;
  }, [selectedCountry, selectedUniversity, selectedField, selectedSubField, selectedLevel]);
  
  return (
    <div className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-semibold mb-8">{t.program.selection}</h3>
      
      <div>
        <label htmlFor="country" className="block text-lg font-medium text-gray-700 mb-3">
          {t.program.country}
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedUniversity('');
            setSelectedField('');
            setSelectedSubField('');
            setSelectedLevel('');
          }}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-3"
        >
          <option value="">{t.program.selectCountry}</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div className="mt-4">
          <label htmlFor="university" className="block text-lg font-medium text-gray-700 mb-3">
            {t.program.university}
          </label>
          <select
            id="university"
            value={selectedUniversity}
            onChange={(e) => {
              setSelectedUniversity(e.target.value);
              setSelectedField('');
              setSelectedSubField('');
              setSelectedLevel('');
            }}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-3"
          >
            <option value="">{t.program.selectUniversity}</option>
            {availableUniversities.map(university => (
              <option key={university} value={university}>{university}</option>
            ))}
          </select>
        </div>
      )}

      {selectedUniversity && (
        <div className="mt-4">
          <label htmlFor="field" className="block text-lg font-medium text-gray-700 mb-3">
            {t.program.field}
          </label>
          <select
            id="field"
            value={selectedField}
            onChange={(e) => {
              setSelectedField(e.target.value);
              setSelectedSubField('');
              setSelectedLevel('');
            }}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-3"
          >
            <option value="">{t.program.selectField}</option>
            {Object.keys(fields).map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>
        </div>
      )}

      {selectedField && (
        <div className="mt-4">
          <label htmlFor="level" className="block text-lg font-medium text-gray-700 mb-3">
            {t.program.level}
          </label>
          <select
            id="level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-3"
          >
            <option value="">{t.program.selectLevel}</option>
            <option value="Licence">{t.program.license}</option>
            <option value="Master">{t.program.master}</option>
            <option value="Doctorat">{t.program.doctorat}</option>
          </select>
        </div>
      )}

      {selectedLevel && (
        <div className="mt-4">
          <label htmlFor="subField" className="block text-lg font-medium text-gray-700 mb-3">
            {t.program.subField}
          </label>
          <select
            id="subField"
            value={selectedSubField}
            onChange={(e) => {
              setSelectedSubField(e.target.value);
              const program = programs.find(p => 
                p.university === selectedUniversity &&
                p.field === selectedField &&
                p.subField === e.target.value
              );
              if (program) {
                setSelectedLevel(program.level.charAt(0).toUpperCase() + program.level.slice(1));
              }
            }}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-3"
          >
            <option value="">{t.program.selectSubField}</option>
            {(selectedField ? fields[selectedField] : []).map(subField => (
              <option key={subField} value={subField}>{subField}</option>
            ))}
          </select>
          <button
            onClick={() => setShowDetails(true)}
            disabled={!selectedSubField}
            className={`mt-6 w-full py-4 px-6 rounded-lg font-medium text-xl ${
              selectedSubField 
                ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t.program.showDetails}
          </button>
        </div>
      )}
      
      {showDetails && (selectedProgram ? (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold mb-8">{t.program.details}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{t.program.location}</h4>
                <p className="text-lg text-gray-600">{selectedProgram.city}, {selectedProgram.country}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Trophy className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{t.program.ranking}</h4>
                <p className="text-lg text-gray-600">#{selectedProgram.ranking} {t.program.worldRanking}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{t.program.duration}</h4>
                <p className="text-lg text-gray-600">{selectedProgram.duration}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Briefcase className="w-6 h-6 text-indigo-500 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-900">{t.program.careers}</h4>
                <p className="text-lg text-gray-600">{selectedProgram.careers.join(', ')}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="font-medium text-gray-900 mb-2">{t.program.description}</h4>
            <p className="text-gray-600">{selectedProgram.description}</p>
          </div>
          
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">{t.program.tuition}</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-700">{t.program.tuitionFee}</span>
                <span className="text-xl font-semibold text-indigo-600">€{selectedProgram.tuitionFee.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => onSelect(selectedProgram)}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-xl"
            >
              {t.program.continue}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="text-xl font-medium text-yellow-800 mb-2">{t.program.notAvailable}</h3>
          <p className="text-yellow-700">
            {t.program.notAvailableMessage}
          </p>
        </div>
      ))}
    </div>
  );
}

ProgramSelection.propTypes = {
  onSelect: PropTypes.func.isRequired
};

export default ProgramSelection;