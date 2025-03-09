import { Accommodation } from '../types/index';

export const accommodations: Accommodation[] = [
  {
    id: '1',
    type: 'Student Residence - Single Room',
    basePrice: 600,
    maxRoommates: 1
  },
  {
    id: '2',
    type: 'Student Residence - Double Room',
    basePrice: 450,
    maxRoommates: 2
  },
  {
    id: '3',
    type: 'Shared Apartment',
    basePrice: 800,
    maxRoommates: 4
  },
  {
    id: '4',
    type: 'Studio Apartment',
    basePrice: 900,
    maxRoommates: 1
  }
];