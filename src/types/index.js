/**
 * @typedef {Object} Student
 * @property {string} country
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} birthDate
 * @property {string} birthPlace
 * @property {string} phone
 * @property {string} email
 * @property {string} parentName
 * @property {string} parentContact
 */

/**
 * @typedef {Object} AdditionalServices
 * @property {boolean} hasPassport
 * @property {boolean} needPassportAssistance
 * @property {boolean} hasTranslatedDiplomas
 * @property {boolean} needTranslationService
 * @property {boolean} hasRussianContact
 * @property {boolean} needAirportPickup
 * @property {boolean} needYearlyAssistance
 */

/**
 * @typedef {Object} Program
 * @property {string} id
 * @property {string} city
 * @property {string} country
 * @property {string} university
 * @property {string} field
 * @property {string} subField
 * @property {string} level
 * @property {string} duration
 * @property {number} ranking
 * @property {string} description
 * @property {string[]} careers
 * @property {number} tuitionFee
 * @property {number} [accommodationFee]
 * @property {boolean} availability
 * @property {AdditionalServices} additionalServices
 * @property {{tuition: number, serviceFees: number}} totalFees
 */

/**
 * @typedef {Object} Accommodation
 * @property {string} id
 * @property {string} type
 * @property {number} basePrice
 * @property {number} maxRoommates
 */

/**
 * @typedef {Object} ServiceFees
 * @property {number} passportAssistance
 * @property {number} diplomaTranslation
 * @property {number} airportPickup
 * @property {number} yearlyAssistance
 * @property {number} studentInsurance
 */

/**
 * @typedef {Object} Registration
 * @property {Student} student
 * @property {Program} program
 * @property {Accommodation} accommodation
 * @property {number} roommateCount
 * @property {{monthlyFee: number, yearlyFee: number}} accommodationDetails
 * @property {AdditionalServices} additionalServices
 * @property {{
*   tuition: number,
*   accommodation: number,
*   insurance: number,
*   services: number,
*   total: number
* }} totalFees
*/

/** @type {Student} */
export const Student = {};

/** @type {AdditionalServices} */
export const AdditionalServices = {};

/** @type {Program} */
export const Program = {};

/** @type {Accommodation} */
export const Accommodation = {};

/** @type {ServiceFees} */
export const ServiceFees = {};

/** @type {Registration} */
export const Registration = {};