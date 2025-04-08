import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from 'react';

// Palette de couleurs modernes
const COLORS = {
    primary: '#2D3748',
    secondary: '#4F46E5',
    accent: '#6366F1',
    lightGray: '#F7FAFC',
    darkGray: '#718096',
    text: '#2D3748'
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Helvetica-Bold",
        backgroundColor: '#FFFFFF'
    },
    header: {
        marginBottom: 25,
        paddingBottom: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `2 solid ${COLORS.secondary}`
    },
    headerLeft: {
        flex: 1
    },
    title: {
        fontSize: 26,
        fontWeight: 'black',
        color: COLORS.primary,
        letterSpacing: 1
    },
    subtitle: {
        fontSize: 10,
        color: COLORS.darkGray,
        marginTop: 4,
        letterSpacing: 0.5
    },
    section: {
        marginBottom: 20,
        backgroundColor: COLORS.lightGray,
        borderRadius: 4,
        padding: 15,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
        color: COLORS.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        paddingBottom: 4,
        borderBottom: `1 solid ${COLORS.secondary}`
    },
    row: {
        flexDirection: "row",
        marginBottom: 8,
        alignItems: 'flex-start'
    },
    column: {
        flex: 1,
        paddingRight: 10
    },
    label: {
        fontSize: 9,
        color: COLORS.darkGray,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 3
    },
    value: {
        fontSize: 12,
        color: COLORS.text,
        fontWeight: 'semibold'
    },
    serviceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottom: `1 solid ${COLORS.lightGray}`
    },
    serviceName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    servicePrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.secondary
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        paddingTop: 12,
        borderTop: `2 solid ${COLORS.secondary}`
    },
    signatureSection: {
        marginTop: 30,
        paddingTop: 20,
        borderTop: `2 dashed ${COLORS.darkGray}`
    },
    signatureBox: {
        height: 40,
        width: 200,
        borderBottom: `1 solid ${COLORS.darkGray}`,
        marginTop: 5
    },
    footer: {
        position: "absolute",
        bottom: 25,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 8,
        color: COLORS.darkGray,
        paddingVertical: 8,
        backgroundColor: COLORS.lightGray
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 15
    },
    watermark: {
        position: 'absolute',
        opacity: 0.1,
        fontSize: 72,
        color: COLORS.primary,
        transform: 'rotate(-45deg)',
        left: 100,
        top: 400
    }
});

const PDFDocument = ({ formData, mockData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Filigrane */}
            <Text style={styles.watermark}>CONFIDENTIEL</Text>

            {/* En-tête */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>FICHE D'INSCRIPTION</Text>
                    <Text style={styles.subtitle}>DOCUMENT OFFICIEL - N°REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
                </View>
            </View>

            {/* Sections améliorées */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profil de l'Étudiant</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Identité</Text>
                        <Text style={styles.value}>{formData.firstName} {formData.lastName}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Date/Lieu de Naissance</Text>
                        <Text style={styles.value}>{formData.birthDate} - {formData.birthPlace}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Contacts</Text>
                        <Text style={styles.value}>{formData.email}</Text>
                        <Text style={styles.value}>{formData.phone}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Responsable Légal</Text>
                        <Text style={styles.value}>{formData.parentName}</Text>
                        <Text style={styles.value}>{formData.parentContact}</Text>
                    </View>
                </View>
            </View>

            {/* Section Programme */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Détails du Programme</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Destination</Text>
                        <Text style={styles.value}>{formData.country}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Établissement</Text>
                        <Text style={styles.value}>{formData.university}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Domaine d'Études</Text>
                        <Text style={styles.value}>{formData.field}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Niveau Académique</Text>
                        <Text style={styles.value}>{formData.level}</Text>
                    </View>
                </View>
            </View>

            {/* Section Hébergement */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Détails de l'Hébergement</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.value}>{formData.accommodation?.type}</Text>
                        <Text style={[styles.label, {marginTop: 5}]}>Capacité: {formData.accommodation?.capacity}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Coût Mensuel</Text>
                        <Text style={[styles.value, {color: COLORS.secondary}]}>
                            {formData.accommodation?.price?.toLocaleString()} FCFA
                        </Text>
                    </View>
                </View>
            </View>

            {/* Section Services */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Services Additionnels</Text>
                {formData.selectedServices?.length > 0 ? (
                    <>
                        {formData.selectedServices.map((serviceId, index) => {
                            const service = mockData.additionalServices.find((s) => s.id === serviceId);
                            return (
                                <View key={index} style={styles.serviceRow}>
                                    <Text style={styles.serviceName}>{service?.name}</Text>
                                    <Text style={styles.servicePrice}>{service?.price?.toLocaleString()} FCFA</Text>
                                </View>
                            );
                        })}
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Services</Text>
                            <Text style={[styles.totalValue, {color: COLORS.secondary}]}>
                                {formData.selectedServices
                                    .reduce((total, serviceId) => total +
                                        (mockData.additionalServices.find(s => s.id === serviceId)?.price || 0), 0)
                                    .toLocaleString()} FCFA
                            </Text>
                        </View>
                    </>
                ) : (
                    <Text style={[styles.value, {color: COLORS.darkGray}]}>Aucun service supplémentaire sélectionné</Text>
                )}
            </View>

            {/* Signature */}
            <View style={styles.signatureSection}>
                <Text style={[styles.label, {marginBottom: 15}]}>
                    Déclaration sur l'honneur - Je certifie l'exactitude des informations fournies.
                </Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Fait à ____________________</Text>
                        <Text style={styles.label}>Le {new Date().toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Signature de l'étudiant</Text>
                        <View style={styles.signatureBox} />
                    </View>
                </View>
            </View>

            {/* Pied de page */}
            <View style={styles.footer}>
                <Text>Agence d'Études à l'Étranger • contact@agence-etranger.com • +33 1 23 45 67 89</Text>
                <Text>Imprimé le {new Date().toLocaleDateString()} • Document protégé par droits d'auteur</Text>
            </View>
        </Page>
    </Document>
);

export default PDFDocument;