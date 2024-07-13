import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  IconButton,
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
    color: '#000080',
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
    width: '17.5%',
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
  tableCellLeft: {
    textAlign: 'left',
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
    width: '70%',
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

const PDFDocument = ({ formData, items }) => (
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
          {items.map((item, index) => (
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
  const user = {
    name: 'Fred PIERREAFEU',
    addressLine: '1 rue X',
    postalCode: '75000',
    city: 'Paris',
    SIREN: '000000000',
  };

  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [formData, setFormData] = useState({
    name: user.name,
    addressLine: user.addressLine,
    postalCode: user.postalCode,
    city: user.city,
    SIREN: user.SIREN,
    estimateNumber: '1',
    issueDate: formattedDate,
    clientName: '',
    clientAddressLine: '',
    clientPostalCode: '75000',
    clientCity: 'Paris',
    totalHT: '0.00',
    totalTVA: '0.00',
    totalTTC: '0.00',
    signDate: '',
    signLocation: '',
  });

  const [items, setItems] = useState([]);

  const handleInputChange = (e, index = null) => {
    const { name, value, checked, type } = e.target;
    if (index !== null) {
      const updatedItems = items.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: type === 'checkbox' ? (checked ? '10' : '0') : value,
            }
          : item,
      );
      setItems(updatedItems);
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
      TVA: '10',
      totalPrice: '',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateTotals = useCallback(() => {
    let totalHT = 0;
    let totalTVA = 0;
    let totalTTC = 0;

    const updatedItems = items.map((item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const TVA = parseFloat(item.TVA) / 100 || 0;

      const itemTotalPrice = unitPrice * quantity;
      const itemTotalTVA = itemTotalPrice * TVA;
      const itemTotalTTC = itemTotalPrice + itemTotalTVA;

      totalHT += itemTotalPrice;
      totalTVA += itemTotalTVA;
      totalTTC += itemTotalTTC;

      return {
        ...item,
        totalPrice: itemTotalTTC.toFixed(2),
      };
    });

    setItems(updatedItems);

    setFormData((prevData) => ({
      ...prevData,
      totalHT: totalHT.toFixed(2),
      totalTVA: totalTVA.toFixed(2),
      totalTTC: totalTTC.toFixed(2),
    }));
  }, [items]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateTotals();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [items, calculateTotals]);

  return (
    <>
      <Typography color="blue-gray" variant="h4">
        Estimate Generator
      </Typography>
      <Card
        className="flex flex-row justify-between gap-4"
        color="transparent"
        shadow={false}
      >
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-2">
            <Card className="p-4 flex flex-col gap-4" shadow={false}>
              <Input
                label="Estimate Number"
                name="estimateNumber"
                onBlur={calculateTotals}
                onChange={handleInputChange}
                value={formData.estimateNumber}
              />
            </Card>
            <Card className="p-4 flex flex-col gap-4" shadow={false}>
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

            {items.map((item, index) => (
              <Card className=" p-4 flex flex-col gap-6" key={index}>
                <IconButton
                  className="rounded-full"
                  onClick={() => removeItem(index)}
                  variant="outlined"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>
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
            <Button className="w-[20rem]" onClick={addItem}>
              Add item
            </Button>
            <PDFDownloadLink
              document={<PDFDocument formData={formData} items={items} />}
              fileName="estimate.pdf"
            >
              {({ loading }) => (
                <Button className="w-[20rem]">
                  {loading ? 'Generating PDF...' : 'Generate PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </form>
        <PDFViewer height="600" width="920">
          <PDFDocument formData={formData} items={items} />
        </PDFViewer>
      </Card>
    </>
  );
};

export default ModuleEstimateGenerator;
