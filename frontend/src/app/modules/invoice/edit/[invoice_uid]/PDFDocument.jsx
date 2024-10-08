import { Document, Page, Text, View } from '@react-pdf/renderer';
import styles from './styles.js';

const formatDateText = () => {
  const date = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

const formatDateForLibelle = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
};

const addDaysToDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 15);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const PDFDocument = ({ formValues }) => {
  const paymentDueDate = addDaysToDate();
  const libelleDate = formatDateForLibelle();
  const textDate = formatDateText();
  const issueDate = formatDate();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>FACTURE</Text>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              MONSIEUR {formValues.first_name} {formValues.last_name}
            </Text>
            <Text style={styles.text}>{formValues.address}</Text>
            <Text style={styles.text}>
              {formValues.postal_code} {formValues.city}
            </Text>
            <Text style={styles.text}>France</Text>
          </View>
          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              ENTREPRISE {formValues.client_name}
            </Text>
            <Text style={styles.text}>
              {formValues.client_address.split(',').map((part, index) => (
                <Text key={index}>
                  {part.trim()}
                  {index < formValues.client_address.split(',').length - 1
                    ? '\n'
                    : null}
                </Text>
              ))}
            </Text>
            <Text style={styles.text}>
              {formValues.client_postal_code} {formValues.client_city}
            </Text>
            <Text style={styles.text}>France</Text>
          </View>
        </View>
        <View style={[styles.section, { maxWidth: '40%' }]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.text, { marginBottom: 40 }]}>SIREN :</Text>
            <Text style={styles.text}>{formValues.siren}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Numéro de facture :</Text>
            <Text style={styles.text}>{formValues.invoice_number}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Date d&apos;émission :</Text>
            <Text style={styles.text}>{issueDate}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Date limite de paiement :</Text>
            <Text style={styles.text}>{paymentDueDate}</Text>
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
                      <Text style={styles.tableCell}>{formValues.tva}%</Text>
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
            <Text style={styles.text}>{formValues.total_ht} €</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Total TVA: </Text>
            <Text style={styles.text}>{formValues.total_tva} €</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              Total TTC:
            </Text>
            <Text style={[styles.text, { fontWeight: 'bold' }]}>
              {formValues.total_ttc} €
            </Text>
          </View>
          <Text style={styles.subtext}>
            TVA non applicable, article 293B du CGI
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={[styles.section, { maxWidth: '50%' }]}>
          <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 20 }]}>
            Informations de paiement
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>BIC:</Text>
            <Text style={styles.text}>{formValues.bic}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>IBAN:</Text>
            <Text style={styles.text}>{formValues.iban}</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.text}>Libelle:</Text>
            <Text style={styles.text}>
              {formValues.invoice_number}
              {libelleDate}
            </Text>
          </View>
          <Text style={styles.subtext}>
            A utiliser comme libelle lors de votre virement pour identifier la
            transaction
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.footer}>
          <Text>
            MONSIEUR {formValues.name} vous a envoyé cette facture le {textDate}
          </Text>
          <Text>
            Celle-ci doit être réglée sous 15 jour(s) a compter de cette date.
            Passé ce délai, une pénalité de retard de 3 % sera appliquée, ainsi
            qu&apos;une indemnité forfaitaire de 40 € due au titre des frais de
            recouvrement. Pas d&apos;escompte pour règlement anticipe.
          </Text>
        </View>
        {formValues.paid ? (
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermark}>PAYÉ</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

export default PDFDocument;
