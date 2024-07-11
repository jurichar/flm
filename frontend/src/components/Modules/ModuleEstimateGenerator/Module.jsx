import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
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
          <Text style={styles.text}>MONSIEUR {formData.name}</Text>
          <Text style={styles.text}>{formData.addressLine}</Text>
          <Text style={styles.text}>
            {formData.postalCode} {formData.city}
          </Text>
          <Text style={styles.text}>France</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>ENTREPRISE {formData.clientName}</Text>
          <Text style={styles.text}>{formData.clientAddressLine}</Text>
          <Text style={styles.text}>
            {formData.clientPostalCode} {formData.clientCity}
          </Text>
          <Text style={styles.text}>France</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>SIREN : {formData.SIREN}</Text>
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
                <Text style={styles.tableCell}>{item.unitPrice} €</Text>
              </View>
              <View style={styles.tableCol70}>
                <Text style={styles.tableCell}>{item.TVA}</Text>
              </View>
              <View style={styles.tableCol70}>
                <Text style={styles.tableCell}>{item.totalPrice} €</Text>
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
          MONSIEUR {formData.name} vous a envoyé ce devis le{' '}
          {formData.issueDate}.
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
  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [formData, setFormData] = useState({
    name: 'Jules CIRADE',
    addressLine: '1 rue X',
    postalCode: '75000',
    city: 'Paris',
    SIREN: '000000000',
    clientName: 'Company X',
    clientAddressLine: '1 rue X',
    clientPostalCode: '75000',
    clientCity: 'Paris',
    estimateNumber: '1',
    issueDate: formattedDate,
    items: [],
    totalHT: '0,00 €',
    totalTVA: '0,00 €',
    totalTTC: '0,00 €',
    signDate: '',
    signLocation: '',
  });

  const handleInputChange = (e, index = null) => {
    const { name, value, checked, type } = e.target;
    if (index !== null) {
      const updatedItems = formData.items.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: type === 'checkbox' ? (checked ? '10' : '0') : value,
            }
          : item,
      );
      setFormData({
        ...formData,
        items: updatedItems,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addItem = () => {
    const newItem = {
      name: '',
      details: '',
      quantity: '',
      unitPrice: '',
      TVA: '10', // Assume TVA is 10% by default
      totalPrice: '',
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };

  const calculateTotals = useCallback(() => {
    let totalHT = 0;
    let totalTVA = 0;
    let totalTTC = 0;

    const updatedItems = formData.items.map((item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice.replace(',', '.')) || 0;
      const TVA = parseFloat(item.TVA) / 100 || 0;

      const itemTotalPrice = unitPrice * quantity;
      const itemTotalTVA = itemTotalPrice * TVA;
      const itemTotalTTC = itemTotalPrice + itemTotalTVA;

      totalHT += itemTotalPrice;
      totalTVA += itemTotalTVA;
      totalTTC += itemTotalTTC;

      return {
        ...item,
        totalPrice: itemTotalTTC.toFixed(2).replace('.', ','),
      };
    });

    setFormData({
      ...formData,
      items: updatedItems,
      totalHT: totalHT.toFixed(2).replace('.', ',') + ' €',
      totalTVA: totalTVA.toFixed(2).replace('.', ',') + ' €',
      totalTTC: totalTTC.toFixed(2).replace('.', ',') + ' €',
    });
  }, [formData]);

  useEffect(() => {
    calculateTotals();
  }, [formData.items, calculateTotals]);

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Estimate Generator
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-2">
          <Card className="p-4 flex flex-col gap-4">
            <Input
              label="Estimate Number"
              name="estimateNumber"
              onChange={handleInputChange}
              value={formData.estimateNumber}
            />
          </Card>
          <Card className="p-4 flex flex-col gap-4">
            <Input
              label="Client Name"
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
          </Card>

          {formData.items.map((item, index) => (
            <Card key={index} className=" p-4 flex flex-col gap-6">
              <Input
                label="Item Name"
                name="name"
                onChange={(e) => handleInputChange(e, index)}
                value={item.name}
              />
              <Textarea
                label="Item Details"
                name="details"
                onChange={(e) => handleInputChange(e, index)}
                value={item.details}
              />
              <Input
                label="Item Quantity"
                name="quantity"
                onChange={(e) => handleInputChange(e, index)}
                value={item.quantity}
              />
              <Input
                label="Item Unit Price"
                name="unitPrice"
                onChange={(e) => handleInputChange(e, index)}
                value={item.unitPrice}
              />
              <Checkbox
                checked={item.TVA === '10'}
                label="TVA 10%"
                name="TVA"
                onChange={(e) => handleInputChange(e, index)}
              />
            </Card>
          ))}
          <Button onClick={addItem}>+</Button>
        </div>
        <PDFDownloadLink
          document={<PDFDocument formData={formData} />}
          fileName="estimate.pdf"
        >
          {({ loading }) => (
            <Button>{loading ? 'Generating PDF...' : 'Generate PDF'}</Button>
          )}
        </PDFDownloadLink>
      </form>
      <PDFViewer width="920" height="600">
        <PDFDocument formData={formData} />
      </PDFViewer>
    </Card>
  );
};

export default ModuleEstimateGenerator;
