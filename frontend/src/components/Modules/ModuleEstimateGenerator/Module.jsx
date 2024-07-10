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
    color: '#000080', // Dark blue color
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  subtext: {
    fontSize: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol40: {
    width: '40%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCol70: {
    width: '17.5%', // Each of the remaining four columns will take 17.5% to sum up to 70%
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableColHeader40: {
    width: '40%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: '#f2f2f2',
  },
  tableColHeader70: {
    width: '17.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: '#f2f2f2',
  },
  tableCellHeader: {
    margin: 'auto',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10,
  },
  summary: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'right',
  },
  boldText: {
    fontWeight: 'bold',
  },
  signSection: {
    marginVertical: 40,
    textAlign: 'left',
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    width: '50%',
    alignSelf: 'flex-end',
  },
  signText: {
    marginBottom: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
  },
});

const PDFDocument = ({ formData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>DEVIS</Text>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.section}>
          <Text style={styles.text}>MONSIEUR {formData.clientName}</Text>
          <Text style={styles.text}>{formData.clientAddressLine}</Text>
          <Text style={styles.text}>
            {formData.clientPostalCode} {formData.clientCity}
          </Text>
          <Text style={styles.text}>France</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>ENTREPRISE {formData.companyName}</Text>
          <Text style={styles.text}>{formData.companyAddressLine}</Text>
          <Text style={styles.text}>
            {formData.companyPostalCode} {formData.companyCity}
          </Text>
          <Text style={styles.text}>France</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>SIREN : {formData.companySIREN}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Numéro du devis : {formData.estimateNumber}
        </Text>
        <Text style={styles.text}>
          Date d&apos;émission : {formData.issueDate}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Description :</Text>
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
          {formData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol40}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.details}</Text>
              </View>
              <View style={styles.tableCol70}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol70}>
                <Text style={styles.tableCell}>{item.unitPrice}</Text>
              </View>
              <View style={styles.tableCol70}>
                <Text style={styles.tableCell}>{item.TVA}</Text>
              </View>
              <View style={styles.tableCol70}>
                <Text style={styles.tableCell}>{item.totalPrice}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.summary}>
        <Text style={styles.text}>Total HT: {formData.totalHT}</Text>
        <Text style={styles.text}>TVA: {formData.totalTVA}</Text>
        <Text style={styles.text}>Total TTC: {formData.totalTTC}</Text>
        <Text style={styles.subtext}>
          TVA non applicable, article 293B du CGI
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.signSection}>
        <Text style={styles.signText}>BON POUR ACCORD</Text>
        <Text style={styles.signText}>Signé le : {formData.signDate}</Text>
        <Text style={styles.signText}>À : {formData.signLocation}</Text>
      </View>
      <View style={styles.footer}>
        <Text>
          MONSIEUR {formData.name} vous a envoyé ce devis le 09 juillet 2024.
        </Text>
        <Text>
          Ce devis doit être accepté dans un délai de 15 jours à compter de
          cette date. Passé ce délai, il sera nécessaire de demander un nouveau
          devis.
        </Text>
        <Text>
          À noter qu&apos;aucune pénalité de retard ni indemnité de recouvrement
          ne s&apos;appliquent à ce devis, mais elles seront applicables aux
          factures émises suite à l&apos;acceptation de ce devis. Aucun escompte
          pour paiement anticipé ne sera accordé.
        </Text>
      </View>
    </Page>
  </Document>
);

const ModuleEstimateGenerator = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientAddressLine: '',
    clientPostalCode: '',
    clientCity: '',
    companyName: 'X',
    companyAddressLine: '1 Rue Z',
    companyPostalCode: '75000',
    companyCity: 'Paris',
    companySIREN: '0',
    estimateNumber: '1',
    issueDate: '10/07/2024',
    items: [
      {
        name: 'Journée de développement web',
        details:
          '- 3 jours entre le 8 Juillet au 12 Juillet\n- 5 jours du 15 Juillet au 19 Juillet\n- 5 jours du 22 Juillet au 26 Juillet',
        quantity: '13',
        unitPrice: '500,00 €',
        TVA: '0%',
        totalPrice: '6 500,00 €',
      },
      {
        name: 'Journée de développement web',
        details: '',
        quantity: '13',
        unitPrice: '500,00 €',
        TVA: '0%',
        totalPrice: '6 500,00 €',
      },
      {
        name: 'Journée de développement web',
        details:
          '- 3 jours entre le 8 Juillet au 12 Juillet\n- 5 jours du 15 Juillet au 19 Juillet\n- 5 jours du 22 Juillet au 26 Juillet',
        quantity: '13',
        unitPrice: '500,00 €',
        TVA: '0%',
        totalPrice: '6 500,00 €',
      },
      {
        name: 'Journée de développement web',
        details: '',
        quantity: '13',
        unitPrice: '500,00 €',
        TVA: '0%',
        totalPrice: '6 500,00 €',
      },
    ],
    totalHT: '6 500,00 €',
    totalTVA: '0,00 €',
    totalTTC: '6 500,00 €',
    signDate: '',
    signLocation: '',
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
        label="Client's Name"
        name="clientName"
        onChange={handleInputChange}
        value={formData.clientName}
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
      <Input
        label="Estimate Number"
        name="estimateNumber"
        onChange={handleInputChange}
        value={formData.estimateNumber}
      />
      <Input
        label="Issue Date"
        name="issueDate"
        onChange={handleInputChange}
        value={formData.issueDate}
      />
      <Input
        label="Item Name"
        name="itemName"
        onChange={handleInputChange}
        value={formData.itemName}
      />
      <Textarea
        label="Item Details"
        name="itemDetails"
        onChange={handleInputChange}
        value={formData.itemDetails}
      />
      <Input
        label="Item Quantity"
        name="itemQuantity"
        onChange={handleInputChange}
        value={formData.itemQuantity}
      />
      <Input
        label="Item Unit Price"
        name="itemUnitPrice"
        onChange={handleInputChange}
        value={formData.itemUnitPrice}
      />
      <Input
        label="Item TVA"
        name="itemTVA"
        onChange={handleInputChange}
        value={formData.itemTVA}
      />
      <Input
        label="Item Total Price"
        name="itemTotalPrice"
        onChange={handleInputChange}
        value={formData.itemTotalPrice}
      />
      <Input
        label="Total HT"
        name="totalHT"
        onChange={handleInputChange}
        value={formData.totalHT}
      />
      <Input
        label="Total TVA"
        name="totalTVA"
        onChange={handleInputChange}
        value={formData.totalTVA}
      />
      <Input
        label="Total TTC"
        name="totalTTC"
        onChange={handleInputChange}
        value={formData.totalTTC}
      />
      <Input
        label="Sign Date"
        name="signDate"
        onChange={handleInputChange}
        value={formData.signDate}
      />
      <Input
        label="Sign Location"
        name="signLocation"
        onChange={handleInputChange}
        value={formData.signLocation}
      />

      <PDFDownloadLink
        document={<PDFDocument formData={formData} />}
        fileName="estimate.pdf"
      >
        {({ loading }) => (
          <Button>{loading ? 'Generating PDF...' : 'Generate PDF'}</Button>
        )}
      </PDFDownloadLink>
      <PDFViewer width="920" height="600">
        <PDFDocument formData={formData} />
      </PDFViewer>
    </div>
  );
};

export default ModuleEstimateGenerator;
