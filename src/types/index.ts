export interface Student {
    country: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    birthPlace: string;
    phone: string;
    email: string;
    parentName: string;
    parentContact: string;
  }
  
  export interface Program {
    id: string;
    city: string;
    country: string;
    university: string;
    field: string;
    tuitionFee: number;
  }
  
  export interface Accommodation {
    id: string;
    type: string;
    basePrice: number;
    maxRoommates: number;
  }
  
  export interface Registration {
    student: Student;
    program: Program;
    accommodation: Accommodation;
    roommateCount: number;
  }