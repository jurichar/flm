import { useState } from 'react';
import { Button, Input, Textarea } from '@material-tailwind/react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  summary: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'right',
  },
});

// PDF Document Component
const PDFDocument = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Devis</Text>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.section}>
          <Text style={styles.text}>MONSIEUR J DEVIS</Text>
          <Text style={styles.text}>1 Rue X</Text>
          <Text style={styles.text}>75000 Paris</Text>
          <Text style={styles.text}>France</Text>
        </View>
        <View style={[styles.section]}>
          <Text style={styles.text}>ENTREPRISE X</Text>
          <Text style={styles.text}>1 Rue Z</Text>
          <Text style={styles.text}>75000 Paris</Text>
          <Text style={styles.text}>France</Text>
          <Text style={styles.text}>SIREN : 0</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Numéro du devis : 1</Text>
        <Text style={styles.text}>Date d&apos;émission : 10/07/2024</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Description :</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Détails</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Qté</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Prix Unitaire</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TVA %</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                Journée de développement web:
              </Text>
              <Text style={styles.tableCell}>
                - 3 jours entre le 8 Juillet au 12 Juillet
              </Text>
              <Text style={styles.tableCell}>
                - 5 jours du 15 Juillet au 19 Juillet
              </Text>
              <Text style={styles.tableCell}>
                - 5 jours du 22 Juillet au 26 Juillet
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>13</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>500,00 €</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>0%</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>6 500,00 €</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.summary}>
        <Text style={styles.text}>Total HT: 6 500,00 €</Text>
        <Text style={styles.text}>TVA: 0,00 €</Text>
        <Text style={styles.text}>Total TTC: 6 500,00 €</Text>
      </View>
      <View style={styles.footer}>
        <Text>TVA non applicable, article 293B du CGI</Text>
        <Text>
          Ce devis doit être accepté dans un délai de 15 jours à compter de
          cette date.
        </Text>
        <Text>
          Aucune pénalité de retard ni indemnité de recouvrement ne s'appliquent
          à ce devis.
        </Text>
        <Text>Aucun escompte pour paiement anticipé ne sera accordé.</Text>
      </View>
    </Page>
  </Document>
);

// Main Component
const ModuleEstimateGenerator = () => {
  const [formData, setFormData] = useState({
    estimateName: '',
    amount: '',
    description: '',
    clientAddressLine: '',
    clientPostalCode: '',
    clientCity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-full overflow-scroll">
      <h1>Estimate Generator</h1>
      <Input
        label="Estimate's Name"
        name="estimateName"
        onChange={handleInputChange}
        value={formData.estimateName}
      />
      <Input
        label="Amount"
        name="amount"
        onChange={handleInputChange}
        type="number"
        value={formData.amount}
      />
      <Textarea
        label="Description"
        name="description"
        onChange={handleInputChange}
        value={formData.description}
      />
      <Input
        label="Client Address Line"
        name="clientAddressLine"
        onChange={handleInputChange}
        value={formData.clientAddressLine}
      />
      <Input
        label="Client Postal Code"
        name="clientPostalCode"
        onChange={handleInputChange}
        value={formData.clientPostalCode}
      />
      <Input
        label="Client City"
        name="clientCity"
        onChange={handleInputChange}
        value={formData.clientCity}
      />

      <PDFDownloadLink
        document={<PDFDocument formData={formData} />}
        fileName="estimate.pdf"
      >
        {({ loading }) => (
          <Button>{loading ? 'Generating PDF...' : 'Generate PDF'}</Button>
        )}
      </PDFDownloadLink>
      <PDFViewer width="1000" height="600">
        <PDFDocument formData={formData} />
      </PDFViewer>
    </div>
  );
};

export default ModuleEstimateGenerator;
