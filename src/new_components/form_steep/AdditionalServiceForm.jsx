"use client"
import React from 'react';

export default function AdditionalServicesForm({ formData, handleServiceToggle, nextStep, prevStep, services }) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Services Complémentaires</h3>
                <p className="text-sm text-gray-600 mb-6">Sélectionnez les services complémentaires dont vous avez besoin</p>

                <div className="space-y-4">
                    {services.map((service) => (
                        <div key={service.id} className="flex items-start p-4 border rounded-md">
                            <input
                                type="checkbox"
                                id={service.id}
                                checked={formData.selectedServices.includes(service.id)}
                                onChange={() => handleServiceToggle(service.id)}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                            />
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between">
                                    <label htmlFor={service.id} className="font-medium text-gray-900">
                                        {service.name}
                                    </label>
                                    <span className="text-indigo-600 font-medium">{service.price.toLocaleString()} FCFA</span>
                                </div>
                                <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    ))}
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

                <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Continuer vers Résumé
                </button>
            </div>
        </div>
    )
}





