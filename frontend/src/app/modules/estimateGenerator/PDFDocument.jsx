import { Document, Page, Text, View } from '@react-pdf/renderer';
import styles from './styles.js';

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatDateText = () => {
  const date = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

const PDFDocument = ({ formValues }) => {
  const issueDate = formatDate();
  const textDate = formatDateText();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>DEVIS</Text>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              MONSIEUR {formValues.name}
            </Text>
            <Text style={styles.text}>{formValues.address}</Text>
            <Text style={styles.text}>
              {formValues.postalCode} {formValues.city}
            </Text>
            <Text style={styles.text}>France</Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              ENTREPRISE {formValues.clientName}
            </Text>
            <Text style={styles.text}>{formValues.clientAddress}</Text>
            <Text style={styles.text}>
              {formValues.clientPostalCode} {formValues.clientCity}
            </Text>
            <Text style={styles.text}>France</Text>
          </View>
        </View>
        <View style={[styles.section, { maxWidth: '40%' }]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.text, { marginBottom: 40 }]}>SIREN :</Text>
            <Text style={styles.text}>{formValues.SIREN}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Numéro du devis :</Text>
            <Text style={styles.text}>{formValues.estimateNumber}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Date d&apos;émission :</Text>
            <Text style={styles.text}>{issueDate}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>
            Description :
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader40}>
                <Text style={styles.tableCellHeader}>Détails</Text>
              </View>
              <View style={styles.tableColHeader70}>
                <Text style={styles.tableCellHeader}>Qté</Text>
              </View>
              <View style={styles.tableColHeader70}>
                <Text style={styles.tableCellHeader}>Prix Unitaire</Text>
              </View>
              <View style={styles.tableColHeader70}>
                <Text style={styles.tableCellHeader}>TVA %</Text>
              </View>
              <View style={styles.tableColHeader70}>
                <Text style={styles.tableCellHeader}>Total</Text>
              </View>
            </View>
            {formValues.items && formValues.items.length > 0
              ? formValues.items.map((item, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCol40}>
                      <Text style={styles.tableCell}>{item.name}</Text>
                      <Text style={styles.tableCellLeft}>{item.details}</Text>
                    </View>
                    <View style={styles.tableCol70}>
                      <Text style={styles.tableCell}>{item.quantity}</Text>
                    </View>
                    <View style={styles.tableCol70}>
                      <Text style={styles.tableCell}>{item.unitPrice} €</Text>
                    </View>
                    <View style={styles.tableCol70}>
                      <Text style={styles.tableCell}>{formValues.TVA}%</Text>
                    </View>
                    <View style={styles.tableCol70}>
                      <Text style={styles.tableCell}>{item.total} €</Text>
                    </View>
                  </View>
                ))
              : null}
          </View>
        </View>
        <View style={styles.summary}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Total HT:</Text>
            <Text style={styles.text}>{formValues.totalHT} €</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Total TVA: </Text>
            <Text style={styles.text}>{formValues.totalTVA} €</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              Total TTC:
            </Text>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              {formValues.totalTTC} €
            </Text>
          </View>
          <Text style={styles.subtext}>
            TVA non applicable, article 293B du CGI
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.signSection}>
          <Text style={styles.signText}>BON POUR ACCORD</Text>
          <Text style={styles.signText}>Signé le : {formValues.signDate}</Text>
          <Text style={styles.signText}>À : {formValues.signLocation}</Text>
        </View>
        <View style={styles.footer}>
          <Text>
            MONSIEUR {formValues.name} vous a envoyé ce devis le {textDate}.
          </Text>
          <Text>
            Ce devis doit être accepté dans un délai de 15 jours à compter de
            cette date. Passé ce délai, il sera nécessaire de demander un
            nouveau devis.
          </Text>
          <Text>
            À noter qu&apos;aucune pénalité de retard ni indemnité de
            recouvrement ne s&apos;appliquent à ce devis, mais elles seront
            applicables aux factures émises suite à l&apos;acceptation de ce
            devis. Aucun escompte pour paiement anticipé ne sera accordé.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
