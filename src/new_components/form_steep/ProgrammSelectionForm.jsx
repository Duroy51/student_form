"use client"

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export default function ProgramSelectionForm({ formData, handleChange, nextStep, prevStep, errors }) {
    const [subStep, setSubStep] = useState(1);

    // Data states
    const [countries, setCountries] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [noResults, setNoResults] = useState(false);

    // Custom entry states
    const [customUniversity, setCustomUniversity] = useState('');
    const [customField, setCustomField] = useState('');

    // Search & pagination states per step
    const [countrySearch, setCountrySearch] = useState('');
    const [countryPage, setCountryPage] = useState(1);
    const [uniSearch, setUniSearch] = useState('');
    const [uniPage, setUniPage] = useState(1);
    const [fieldSearch, setFieldSearch] = useState('');
    const [fieldPage, setFieldPage] = useState(1);

    const PAGE_SIZE = 10;

    // Fetch countries on mount
    useEffect(() => {
        async function fetchCountries() {
            setLoading(true);
            try {
                const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
                if (!res.ok) throw new Error('Failed to fetch countries');

                const data = await res.json();
                const list = data
                    .map(c => c.name.common)
                    .sort((a, b) => a.localeCompare(b, 'en'));
                setCountries(list);
            } catch (err) {
                console.error('Failed to load countries', err);
                setCountries([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCountries();
    }, []);

    // Fetch universities when country changes
    useEffect(() => {
        let isMounted = true;
        let timeoutId = null;

        async function fetchUnis() {
            if (!formData.country) {
                setUniversities([]);
                setNoResults(false);
                setApiError(false);
                return;
            }

            setLoading(true);
            setNoResults(false);
            setApiError(false);
            setUniversities([]);

            // Set a timeout for API timeout
            timeoutId = setTimeout(() => {
                if (isMounted && loading) {
                    setLoading(false);
                    setApiError(true);
                }
            }, 8000);

            try {
                const res = await fetch(
                    `https://universities.hipolabs.com/search?country=${encodeURIComponent(formData.country)}`
                );

                // Clear the timeout as we got a response
                clearTimeout(timeoutId);

                if (!isMounted) return;

                if (!res.ok) throw new Error('Failed to fetch universities');

                const data = await res.json();
                const names = Array.from(new Set(data.map(u => u.name))).sort();

                if (isMounted) {
                    if (names.length > 0) {
                        setUniversities(names);
                        setNoResults(false);
                    } else {
                        setUniversities([]);
                        setNoResults(true);
                    }
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to load universities', err);

                // Clear the timeout as we handled the error
                clearTimeout(timeoutId);

                if (isMounted) {
                    setUniversities([]);
                    setApiError(true);
                    setLoading(false);
                }
            }
        }

        fetchUnis();

        // Cleanup function
        return () => {
            isMounted = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [formData.country]);

    // Generate fields for selected university
    useEffect(() => {
        if (!formData.university) {
            setFields([]);
            return;
        }

        setLoading(true);
        try {
            // Simple list of common fields
            const commonFields = [
                'Computer Science',
                'Mathematics',
                'Physics',
                'Chemistry',
                'Biology',
                'Medicine',
                'Law',
                'Economics',
                'Business Administration',
                'Psychology',
                'Sociology',
                'Political Science',
                'History',
                'Literature',
                'Engineering',
                'Architecture',
                'Education',
                'Philosophy',
                'Arts',
                'Communication'
            ];

            setFields(commonFields.sort());
        } catch (err) {
            console.error('Failed to load fields', err);
            setFields([]);
        } finally {
            setLoading(false);
        }
    }, [formData.university]);

    // Helpers: filter + paginate
    const filterItems = (items, search) => {
        if (!search.trim()) return items;
        const searchLower = search.toLowerCase();
        return items.filter(item => item.toLowerCase().includes(searchLower));
    };

    const paginate = (list, page) => {
        const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
        // Ensure page is within valid range
        const validPage = Math.min(Math.max(1, page), totalPages);
        const start = (validPage - 1) * PAGE_SIZE;
        return {
            items: list.slice(start, start + PAGE_SIZE),
            currentPage: validPage,
            totalPages
        };
    };

    // Handle manual entry submissions
    const handleCustomUniversitySubmit = (e) => {
        e.preventDefault();
        if (customUniversity.trim()) {
            const value = customUniversity.trim();
            handleChange({ target: { name: 'university', value } });
            setCustomUniversity('');
            // Force next step after selection
            setTimeout(() => setSubStep(3), 100);
        }
    };

    const handleCustomFieldSubmit = (e) => {
        e.preventDefault();
        if (customField.trim()) {
            const value = customField.trim();
            handleChange({ target: { name: 'field', value } });
            setCustomField('');
            // Force next step after selection
            setTimeout(() => setSubStep(4), 100);
        }
    };

    // Handle selections with auto-advance
    const handleSelectCountry = (value) => {
        handleChange({ target: { name: 'country', value } });
        // Auto-advance to next step
        setTimeout(() => setSubStep(2), 100);
    };

    const handleSelectUniversity = (value) => {
        handleChange({ target: { name: 'university', value } });
        // Auto-advance to next step
        setTimeout(() => setSubStep(3), 100);
    };

    const handleSelectField = (value) => {
        handleChange({ target: { name: 'field', value } });
        // Auto-advance to next step
        setTimeout(() => setSubStep(4), 100);
    };

    const handleSelectLevel = (value) => {
        handleChange({ target: { name: 'level', value } });
    };

    // Helpers for focusing input field
    const universityInputRef = React.useRef(null);

    const focusUniversityInput = () => {
        if (universityInputRef.current) {
            universityInputRef.current.focus();
        }
    };

    // Memoized filtered and paginated data
    const filteredCountries = useMemo(() =>
            filterItems(countries, countrySearch),
        [countries, countrySearch]
    );

    const pagedCountryData = useMemo(() =>
            paginate(filteredCountries, countryPage),
        [filteredCountries, countryPage]
    );

    const filteredUnis = useMemo(() =>
            filterItems(universities, uniSearch),
        [universities, uniSearch]
    );

    const pagedUniData = useMemo(() =>
            paginate(filteredUnis, uniPage),
        [filteredUnis, uniPage]
    );

    const filteredFields = useMemo(() =>
            filterItems(fields, fieldSearch),
        [fields, fieldSearch]
    );

    const pagedFieldData = useMemo(() =>
            paginate(filteredFields, fieldPage),
        [filteredFields, fieldPage]
    );

    // Navigation
    const canProceed = () => {
        switch (subStep) {
            case 1: return !!formData.country;
            case 2: return !!formData.university;
            case 3: return !!formData.field;
            case 4: return !!formData.level;
            default: return false;
        }
    };

    const handleSubStepNext = () => {
        if (!canProceed()) return;

        if (subStep < 4) {
            setSubStep(subStep + 1);
        } else {
            nextStep();
        }
    };

    const handleSubStepPrev = () => {
        if (subStep > 1) {
            setSubStep(subStep - 1);
        } else {
            prevStep();
        }
    };

    // Renderers for selection lists
    const renderItemList = (items, onSelect, selectedValue) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {items.map(item => (
                    <div
                        key={item}
                        onClick={() => onSelect(item)}
                        className={`p-4 border rounded-md cursor-pointer transition-colors ${
                            selectedValue === item
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                    >
                        <div className="font-medium">{item}</div>
                    </div>
                ))}
            </div>
        );
    };

    const renderSearchAndPagination = ({
                                           items,
                                           search,
                                           setSearch,
                                           currentPage,
                                           totalPages,
                                           setPage
                                       }) => {
        return (
            <>
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full p-2 border rounded"
                        disabled={loading}
                    />
                    {loading && (
                        <div className="absolute right-3 top-2">
                            <div className="animate-spin h-5 w-5 border-2 border-indigo-500 rounded-full border-t-transparent"></div>
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center space-x-2 mb-4">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={currentPage <= 1 || loading}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Précédent
                        </button>
                        <span className="px-3 py-1">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage >= totalPages || loading}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </>
        );
    };

    const renderCustomEntryForm = (value, setValue, handleSubmit, placeholder, inputRef) => {
        return (
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={placeholder}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className="flex-grow p-2 border rounded-l"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={!value.trim() || loading}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-r disabled:opacity-50"
                    >
                        Ajouter
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    Vous ne trouvez pas ce que vous cherchez ? Ajoutez-le manuellement.
                </p>
            </form>
        );
    };

    const renderStepProgress = () => {
        const steps = [
            { label: 'Pays', active: subStep >= 1, complete: !!formData.country },
            { label: 'Université', active: subStep >= 2, complete: !!formData.university },
            { label: 'Filière', active: subStep >= 3, complete: !!formData.field },
            { label: 'Niveau', active: subStep >= 4, complete: !!formData.level }
        ];

        return (
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center
                                        ${step.active
                                        ? step.complete
                                            ? 'bg-green-500 text-white'
                                            : 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    {step.complete ? '✓' : index + 1}
                                </div>
                                <div className="text-xs mt-1">{step.label}</div>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-0.5 mx-2 
                                        ${steps[index + 1].active ? 'bg-indigo-600' : 'bg-gray-200'}`}
                                ></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    const renderSelectedValue = (label, value) => {
        if (!value) return null;
        return (
            <div className="bg-gray-50 p-3 rounded mb-4 flex justify-between items-center">
                <span>
                    {label}: <strong>{value}</strong>
                </span>
                <button
                    onClick={() => {
                        const key = label.toLowerCase();
                        handleChange({ target: { name: key, value: '' } });

                        // Reset dependent fields
                        if (key === 'country') {
                            handleChange({ target: { name: 'university', value: '' } });
                            handleChange({ target: { name: 'field', value: '' } });
                            handleChange({ target: { name: 'level', value: '' } });
                            setSubStep(1);
                        } else if (key === 'university') {
                            handleChange({ target: { name: 'field', value: '' } });
                            handleChange({ target: { name: 'level', value: '' } });
                            setSubStep(2);
                        } else if (key === 'field') {
                            handleChange({ target: { name: 'level', value: '' } });
                            setSubStep(3);
                        }
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                >
                    Modifier
                </button>
            </div>
        );
    };

    const renderCountryStep = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Sélection du Pays</h3>

            {renderSearchAndPagination({
                items: filteredCountries,
                search: countrySearch,
                setSearch: setCountrySearch,
                currentPage: pagedCountryData.currentPage,
                totalPages: pagedCountryData.totalPages,
                setPage: setCountryPage
            })}

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent mb-4"></div>
                    <p>Chargement des pays...</p>
                </div>
            ) : pagedCountryData.items.length > 0 ? (
                renderItemList(pagedCountryData.items, handleSelectCountry, formData.country)
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Aucun pays trouvé. Veuillez modifier votre recherche.
                </div>
            )}

            {errors.country && <p className="text-sm text-red-600 mt-2">{errors.country}</p>}
        </div>
    );

    const renderUniversityStep = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Sélection de l'Université</h3>
            {renderSelectedValue('Pays', formData.country)}

            {renderCustomEntryForm(
                customUniversity,
                setCustomUniversity,
                handleCustomUniversitySubmit,
                "Entrez le nom de votre université...",
                universityInputRef
            )}

            {!loading && !apiError && !noResults && (
                renderSearchAndPagination({
                    items: filteredUnis,
                    search: uniSearch,
                    setSearch: setUniSearch,
                    currentPage: pagedUniData.currentPage,
                    totalPages: pagedUniData.totalPages,
                    setPage: setUniPage
                })
            )}

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent mb-4"></div>
                    <p>Chargement des universités...</p>
                </div>
            ) : apiError ? (
                <div className="text-center py-8 bg-amber-50 rounded-lg border border-amber-200 p-6">
                    <div className="text-amber-600 text-4xl mb-3">⚠️</div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                        Impossible de charger les universités
                    </h4>
                    <p className="text-gray-600 mb-4">
                        Nous rencontrons des difficultés pour accéder à notre base de données d'universités pour {formData.country}.
                    </p>
                    <button
                        onClick={focusUniversityInput}
                        className="inline-flex items-center px-4 py-2 border border-indigo-300 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
                    >
                        Entrer manuellement mon université
                    </button>
                </div>
            ) : noResults ? (
                <div className="text-center py-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
                    <div className="text-blue-600 text-4xl mb-3">🎓</div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                        Aucune université trouvée pour {formData.country}
                    </h4>
                    <p className="text-gray-600 mb-4">
                        Notre base de données ne contient pas encore d'universités pour ce pays. Vous pouvez facilement ajouter votre université ci-dessus.
                    </p>
                    <button
                        onClick={focusUniversityInput}
                        className="inline-flex items-center px-4 py-2 border border-indigo-300 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
                    >
                        Entrer manuellement mon université
                    </button>
                </div>
            ) : pagedUniData.items.length > 0 ? (
                renderItemList(pagedUniData.items, handleSelectUniversity, formData.university)
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Aucune université trouvée pour votre recherche. Vous pouvez en ajouter une manuellement ci-dessus.
                </div>
            )}

            {errors.university && <p className="text-sm text-red-600 mt-2">{errors.university}</p>}
        </div>
    );

    const renderFieldStep = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Sélection de la Filière</h3>
            {renderSelectedValue('Université', formData.university)}

            {renderCustomEntryForm(
                customField,
                setCustomField,
                handleCustomFieldSubmit,
                "Entrez le nom de votre filière..."
            )}

            {renderSearchAndPagination({
                items: filteredFields,
                search: fieldSearch,
                setSearch: setFieldSearch,
                currentPage: pagedFieldData.currentPage,
                totalPages: pagedFieldData.totalPages,
                setPage: setFieldPage
            })}

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent mb-4"></div>
                    <p>Chargement des filières...</p>
                </div>
            ) : pagedFieldData.items.length > 0 ? (
                renderItemList(pagedFieldData.items, handleSelectField, formData.field)
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Aucune filière trouvée. Vous pouvez en ajouter une manuellement.
                </div>
            )}

            {errors.field && <p className="text-sm text-red-600 mt-2">{errors.field}</p>}
        </div>
    );

    const renderLevelStep = () => (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Niveau d'Études</h3>
            {renderSelectedValue('Filière', formData.field)}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {['Licence', 'Master', 'Doctorat'].map(level => (
                    <div
                        key={level}
                        onClick={() => handleSelectLevel(level)}
                        className={`p-4 border rounded-md cursor-pointer transition-colors ${
                            formData.level === level
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                    >
                        <div className="font-medium">{level}</div>
                    </div>
                ))}
            </div>

            {errors.level && <p className="text-sm text-red-600 mt-2">{errors.level}</p>}

            {formData.level && (
                <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif de votre choix</h4>
                    <div className="grid grid-cols-2 gap-4">
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
            )}
        </div>
    );

    const renderCurrentStep = () => {
        switch (subStep) {
            case 1: return renderCountryStep();
            case 2: return renderUniversityStep();
            case 3: return renderFieldStep();
            case 4: return renderLevelStep();
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            {renderStepProgress()}
            {renderCurrentStep()}
            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={handleSubStepPrev}
                    disabled={loading}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    Précédent
                </button>
                <button
                    type="button"
                    onClick={handleSubStepNext}
                    disabled={!canProceed() || loading}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {subStep < 4 ? 'Suivant' : 'Continuer vers Hébergement'}
                </button>
            </div>
        </div>
    );
}

ProgramSelectionForm.propTypes = {
    formData: PropTypes.shape({
        country: PropTypes.string,
        university: PropTypes.string,
        field: PropTypes.string,
        level: PropTypes.string
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    errors: PropTypes.object
};