
import React from 'react';

import { useState } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PDFDocument from "../PDFDocument"

export default function SummaryForm({ formData, prevStep, mockData }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = () => {
        setIsSubmitting(true)

        // Simuler un appel API pour enregistrer les données
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
        }, 1500)
    }

    // Calculer le coût total des services sélectionnés
    const calculateServicesCost = () => {
        return formData.selectedServices.reduce((total, serviceId) => {
            const service = mockData.additionalServices.find((s) => s.id === serviceId)
            return total + (service ? service.price : 0)
        }, 0)
    }

    // Obtenir les détails des services sélectionnés
    const getSelectedServices = () => {
        return formData.selectedServices
            .map((serviceId) => mockData.additionalServices.find((s) => s.id === serviceId))
            .filter(Boolean)
    }

    const selectedServices = getSelectedServices()
    const servicesCost = calculateServicesCost()

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif de votre inscription</h3>
                <p className="text-sm text-gray-600 mb-6">Vérifiez les informations avant de finaliser votre inscription</p>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Informations Personnelles</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Nom complet</p>
                                <p className="font-medium">
                                    {formData.firstName} {formData.lastName}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Date de naissance</p>
                                <p className="font-medium">{formData.birthDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Lieu de naissance</p>
                                <p className="font-medium">{formData.birthPlace}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-medium">{formData.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Téléphone</p>
                                <p className="font-medium">{formData.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Parent</p>
                                <p className="font-medium">
                                    {formData.parentName} ({formData.parentContact})
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Programme d'Études</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Pays</p>
                                <p className="font-medium">{formData.country}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Université</p>
                                <p className="font-medium">{formData.university}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Filière</p>
                                <p className="font-medium">{formData.field}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Niveau</p>
                                <p className="font-medium">{formData.level}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Hébergement</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Type</p>
                                <p className="font-medium">{formData.accommodation?.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Capacité</p>
                                <p className="font-medium">{formData.accommodation?.capacity}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Prix mensuel</p>
                                <p className="font-medium">{formData.accommodation?.price.toLocaleString()} FCFA</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Services Complémentaires</h4>

                        {selectedServices.length > 0 ? (
                            <div className="space-y-3">
                                {selectedServices.map((service) => (
                                    <div key={service.id} className="flex justify-between items-start p-3 border rounded-md bg-white">
                                        <div>
                                            <p className="font-medium text-gray-900">{service.name}</p>
                                            <p className="text-sm text-gray-600">{service.description}</p>
                                        </div>
                                        <p className="font-medium text-indigo-600 ml-4">{service.price.toLocaleString()} FCFA</p>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-300 font-medium">
                                    <p>Total des services</p>
                                    <p className="text-indigo-600 text-lg">{servicesCost.toLocaleString()} FCFA</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">Aucun service complémentaire sélectionné</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Précédent
                </button>

                <div className="space-x-4">
                    {isSubmitted ? (
                        <PDFDownloadLink
                            document={<PDFDocument formData={formData} mockData={mockData} />}
                            fileName={`inscription_${formData.lastName}_${formData.firstName}.pdf`}
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {({ loading }) => (loading ? "Préparation du PDF..." : "Télécharger le PDF")}
                        </PDFDownloadLink>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                        >
                            {isSubmitting ? "Enregistrement..." : "Finaliser l'inscription"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}






