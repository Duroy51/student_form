import React from 'react';
import { Accommodation } from '../types/index';
import { accommodations } from '../data/accommodation';
import { Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  onSelect: (accommodation: Accommodation, roommateCount: number) => void;
}

export function AccommodationSelection({ onSelect }: Props) {
  const { t } = useLanguage();
  const [selectedAccommodation, setSelectedAccommodation] = React.useState<Accommodation | null>(null);
  const [roommateCount, setRoommateCount] = React.useState(1);

  const handleSelect = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setRoommateCount(1);
  };

  const calculatePrice = (accommodation: Accommodation) => {
    if (!accommodation) return 0;
    return Math.round(accommodation.basePrice / (roommateCount || 1));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {accommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            className={`relative rounded-lg border ${
              selectedAccommodation?.id === accommodation.id
                ? 'border-indigo-500 ring-2 ring-indigo-500'
                : 'border-gray-300'
            } bg-white px-6 py-5 shadow-sm hover:border-indigo-500 hover:ring-1 hover:ring-indigo-500 cursor-pointer`}
            onClick={() => handleSelect(accommodation)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Home className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{accommodation.type}</h3>
                <p className="text-sm text-gray-500">
                  Up to {accommodation.maxRoommates} {accommodation.maxRoommates === 1 ? t.accommodation.person : t.accommodation.people}
                </p>
                <p className="text-sm font-semibold text-indigo-600">
                  From €{accommodation.basePrice.toLocaleString()} per month
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAccommodation && (
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="roommateCount" className="block text-sm font-medium text-gray-700">
              {t.accommodation.roommates}
            </label>
            <select
              id="roommateCount"
              value={roommateCount}
              onChange={(e) => setRoommateCount(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {Array.from({ length: selectedAccommodation.maxRoommates }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? t.accommodation.person : t.accommodation.people}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <h4 className="text-lg font-medium text-gray-900">{t.accommodation.basePrice}</h4>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">{t.accommodation.basePrice}</span>
                <span className="text-sm font-medium text-gray-900">
                  €{selectedAccommodation.basePrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">{t.accommodation.splitBetween} {roommateCount} {roommateCount === 1 ? t.accommodation.person : t.accommodation.people}</span>
                <span className="text-sm font-medium text-gray-900">
                  €{calculatePrice(selectedAccommodation).toLocaleString()} {t.accommodation.pricePerPerson}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onSelect(selectedAccommodation, roommateCount)}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {t.accommodation.continue}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}