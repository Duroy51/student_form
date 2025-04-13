import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from 'react';

// Palette de couleurs professionnelles
const COLORS = {
    primary: '#1E40AF',      // Bleu plus professionnel
    secondary: '#3B82F6',    // Bleu plus clair pour accent
    accent: '#93C5FD',       // Bleu très clair pour fond d'accent
    lightGray: '#F8FAFC',    // Gris très clair pour fonds
    mediumGray: '#E2E8F0',   // Gris moyen pour bordures
    darkGray: '#64748B',     // Gris foncé pour texte secondaire
    text: '#1E293B',         // Presque noir pour texte principal
    white: '#FFFFFF'         // Blanc
}

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
        backgroundColor: COLORS.white,
        color: COLORS.text
    },
    header: {
        marginBottom: 20,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `2 solid ${COLORS.primary}`
    },
    headerLeft: {
        flex: 1
    },
    title: {
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        color: COLORS.primary,
        letterSpacing: 0.5
    },
    subtitle: {
        fontSize: 9,
        color: COLORS.darkGray,
        marginTop: 4
    },
    section: {
        marginBottom: 15,
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        padding: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        marginBottom: 10,
        color: COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        paddingBottom: 3,
        borderBottom: `1 solid ${COLORS.accent}`
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
        fontSize: 8,
        color: COLORS.darkGray,
        fontFamily: "Helvetica-Bold",
        textTransform: 'uppercase',
        marginBottom: 2
    },
    value: {
        fontSize: 10,
        color: COLORS.text,
        fontFamily: "Helvetica"
    },
    serviceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 6,
        borderBottom: `0.5 solid ${COLORS.mediumGray}`
    },
    serviceName: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: COLORS.text
    },
    servicePrice: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: COLORS.secondary
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        paddingTop: 8,
        borderTop: `1 solid ${COLORS.secondary}`
    },
    totalLabel: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: COLORS.text
    },
    totalValue: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        color: COLORS.primary
    },
    signatureSection: {
        marginTop: 20,
        paddingTop: 15,
        borderTop: `1 dashed ${COLORS.mediumGray}`
    },
    signatureBox: {
        height: 40,
        width: 200,
        borderBottom: `1 solid ${COLORS.darkGray}`,
        marginTop: 5
    },
    footer: {
        position: "absolute",
        bottom: 20,
        left: 30,
        right: 30,
        textAlign: "center",
        fontSize: 8,
        color: COLORS.darkGray,
        paddingVertical: 8,
        borderTop: `0.5 solid ${COLORS.mediumGray}`,
        paddingTop: 10
    },
    watermark: {
        position: 'absolute',
        opacity: 0.04,
        fontSize: 60,
        color: COLORS.primary,
        transform: 'rotate(-45deg)',
        left: 100,
        top: 400
    },
    highlightedValue: {
        fontSize: 10,
        color: COLORS.primary,
        fontFamily: "Helvetica-Bold"
    },
    infoPanel: {
        backgroundColor: COLORS.accent,
        opacity: 0.7,
        padding: 8,
        borderRadius: 4,
        marginBottom: 10
    },
    infoPanelText: {
        fontSize: 8,
        fontFamily: "Helvetica",
        color: COLORS.primary
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
                    <Text style={styles.subtitle}>N°REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
                </View>
            </View>

            {/* Bannière d'information */}
            <View style={styles.infoPanel}>
                <Text style={styles.infoPanelText}>
                    Ce document contient vos informations personnelles d'inscription.
                    Veuillez vérifier l'exactitude de toutes les données avant signature.
                </Text>
            </View>

            {/* Sections améliorées */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profil de l'Étudiant</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Identité</Text>
                        <Text style={styles.highlightedValue}>{formData.firstName} {formData.lastName}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Date/Lieu de Naissance</Text>
                        <Text style={styles.value}>{formData.birthDate} - {formData.birthPlace}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{formData.email}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Téléphone</Text>
                        <Text style={styles.value}>{formData.phone}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Responsable Légal</Text>
                        <Text style={styles.value}>{formData.parentName}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Contact Responsable</Text>
                        <Text style={styles.value}>{formData.parentContact}</Text>
                    </View>
                </View>
            </View>

            {/* Section Programme */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Programme d'Études</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Destination</Text>
                        <Text style={styles.highlightedValue}>{formData.country}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Établissement</Text>
                        <Text style={styles.highlightedValue}>{formData.university}</Text>
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
                <Text style={styles.sectionTitle}>Hébergement</Text>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Type</Text>
                        <Text style={styles.value}>{formData.accommodation?.type}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Capacité</Text>
                        <Text style={styles.value}>{formData.accommodation?.capacity}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Coût Mensuel</Text>
                        <Text style={styles.highlightedValue}>
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
                            <Text style={styles.totalValue}>
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
                <Text style={[styles.label, {marginBottom: 10}]}>
                    Je certifie sur l'honneur l'exactitude des informations fournies.
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
                <Text>Document généré le {new Date().toLocaleDateString()}</Text>
            </View>
        </Page>
    </Document>
);

export default PDFDocument;