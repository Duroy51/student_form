"use client"

import React from 'react';
import { useState } from "react"
import { GraduationCap } from "lucide-react"
import PersonalInfoForm from "./form_steep/PersonnalInfoForm.jsx"
import ProgramSelectionForm from "./form_steep/ProgrammSelectionForm.jsx"
import AccommodationForm from "./form_steep/AccomodationForm.jsx"
import AdditionalServicesForm from "./form_steep/AdditionalServiceForm.jsx"
import SummaryForm from "./form_steep/SummuryForm.jsx"
import StepIndicator from "./SteepIndicator.jsx"

// Données simulées pour les pays, universités, filières, etc.
const mockData = {
    countries: ["France", "Canada", "Belgique", "Suisse", "Maroc", "Sénégal"],
    universities: {
        France: ["Université Paris-Sorbonne", "École Polytechnique", "Sciences Po Paris"],
        Canada: ["Université de Montréal", "McGill University", "Université Laval"],
        Belgique: ["Université Libre de Bruxelles", "Université de Liège", "KU Leuven"],
        Suisse: ["ETH Zurich", "Université de Genève", "EPFL"],
        Maroc: ["Université Mohammed V", "Université Hassan II", "ENSA"],
        Sénégal: ["Université Cheikh Anta Diop", "Université Gaston Berger", "ISM Dakar"],
    },
    fields: {
        "Université Paris-Sorbonne": ["Lettres", "Histoire", "Philosophie", "Droit"],
        "École Polytechnique": ["Mathématiques", "Physique", "Informatique", "Génie Civil"],
        "Sciences Po Paris": ["Sciences Politiques", "Relations Internationales", "Économie"],
        "Université de Montréal": ["Médecine", "Informatique", "Psychologie", "Économie"],
        "McGill University": ["Génie", "Commerce", "Médecine", "Droit"],
        "Université Laval": ["Agriculture", "Foresterie", "Sciences Sociales", "Éducation"],
        "Université Libre de Bruxelles": ["Droit", "Économie", "Sciences Sociales", "Médecine"],
        "Université de Liège": ["Ingénierie", "Sciences", "Médecine Vétérinaire", "Psychologie"],
        "KU Leuven": ["Ingénierie", "Sciences", "Médecine", "Économie et Gestion"],
        "ETH Zurich": ["Ingénierie", "Architecture", "Sciences Naturelles", "Informatique"],
        "Université de Genève": ["Relations Internationales", "Droit", "Médecine", "Sciences"],
        EPFL: ["Informatique", "Génie Civil", "Microtechnique", "Sciences de la Vie"],
        "Université Mohammed V": ["Droit", "Économie", "Médecine", "Sciences"],
        "Université Hassan II": ["Commerce", "Sciences", "Lettres", "Ingénierie"],
        ENSA: ["Génie Civil", "Génie Électrique", "Génie Informatique", "Architecture"],
        "Université Cheikh Anta Diop": ["Médecine", "Pharmacie", "Sciences", "Lettres"],
        "Université Gaston Berger": ["Économie", "Droit", "Lettres", "Sciences Appliquées"],
        "ISM Dakar": ["Management", "Finance", "Marketing", "Informatique"],
    },
    accommodations: [
        { type: "Chambre Simple", capacity: "1 personne", price: 150000 },
        { type: "Chambre Double", capacity: "2 personnes", price: 100000 },
        { type: "Studio", capacity: "1 personne", price: 250000 },
        { type: "Appartement T1", capacity: "1-2 personnes", price: 350000 },
        { type: "Appartement T2", capacity: "2-3 personnes", price: 450000 },
        { type: "Résidence Universitaire", capacity: "1 personne", price: 80000 },
    ],
}

export default function FormContainer() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
        // Étape 1: Informations personnelles
        firstName: "",
        lastName: "",
        birthDate: "",
        birthPlace: "",
        email: "",
        phone: "",
        parentName: "",
        parentContact: "",

        // Étape 2: Programme d'étude
        country: "",
        university: "",
        field: "",
        level: "",

        // Étape 3: Hébergement
        accommodation: null,

        // Étape 4: Services complémentaires
        needPassport: false,
        needTranslation: false,
        hasContact: false,
        contactDetails: "",
    })

    const [errors, setErrors] = useState({})

    const validateStep = (step) => {
        const newErrors = {}
        let isValid = true

        if (step === 1) {
            // Validation des informations personnelles
            if (!formData.firstName.trim()) {
                newErrors.firstName = "Le prénom est requis"
                isValid = false
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = "Le nom est requis"
                isValid = false
            }

            if (!formData.birthDate) {
                newErrors.birthDate = "La date de naissance est requise"
                isValid = false
            }

            if (!formData.birthPlace.trim()) {
                newErrors.birthPlace = "Le lieu de naissance est requis"
                isValid = false
            }

            if (!formData.email.trim()) {
                newErrors.email = "L'email est requis"
                isValid = false
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "L'email est invalide"
                isValid = false
            }

            if (!formData.phone.trim()) {
                newErrors.phone = "Le numéro de téléphone est requis"
                isValid = false
            }

            if (!formData.parentName.trim()) {
                newErrors.parentName = "Le nom du parent est requis"
                isValid = false
            }

            if (!formData.parentContact.trim()) {
                newErrors.parentContact = "Le contact du parent est requis"
                isValid = false
            }
        } else if (step === 2) {
            // Validation du programme d'étude
            if (!formData.country) {
                newErrors.country = "Le pays est requis"
                isValid = false
            }

            if (!formData.university) {
                newErrors.university = "L'université est requise"
                isValid = false
            }

            if (!formData.field) {
                newErrors.field = "La filière est requise"
                isValid = false
            }

            if (!formData.level) {
                newErrors.level = "Le niveau d'études est requis"
                isValid = false
            }
        } else if (step === 3) {
            // Validation de l'hébergement
            if (!formData.accommodation) {
                newErrors.accommodation = "Le choix d'hébergement est requis"
                isValid = false
            }
        }

        setErrors(newErrors)
        return isValid
    }

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleAccommodationSelect = (accommodation) => {
        setFormData({
            ...formData,
            accommodation,
        })
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoForm formData={formData} handleChange={handleChange} nextStep={nextStep} errors={errors} />
            case 2:
                return (
                    <ProgramSelectionForm
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        errors={errors}
                        mockData={mockData}
                    />
                )
            case 3:
                return (
                    <AccommodationForm
                        formData={formData}
                        handleAccommodationSelect={handleAccommodationSelect}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        errors={errors}
                        accommodations={mockData.accommodations}
                    />
                )
            case 4:
                return (
                    <AdditionalServicesForm
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )
            case 5:
                return <SummaryForm formData={formData} prevStep={prevStep} mockData={mockData} />
            default:
                return null
        }
    }

    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-white">
                <div className="flex items-center gap-3 mb-8">
                    <GraduationCap className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Inscription aux Études à l'Étranger</h1>
                    <div className="ml-auto">
                        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium">FR</button>
                    </div>
                </div>

                <StepIndicator currentStep={currentStep} />

                <div className="mt-8">{renderStep()}</div>
            </div>
        </div>
    )
}

