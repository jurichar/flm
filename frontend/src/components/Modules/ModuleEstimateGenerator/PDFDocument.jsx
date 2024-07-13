import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

const PDFDocument = ({ formValues }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>DEVIS</Text>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.section}>
          <Text style={styles.text}>MONSIEUR {formValues.name}</Text>
          <Text style={styles.text}>{formValues.address}</Text>
          <Text style={styles.text}>
            {formValues.postalCode} {formValues.city}
          </Text>
          <Text style={styles.text}>France</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>ENTREPRISE {formValues.clientName}</Text>
          <Text style={styles.text}>{formValues.clientAddress}</Text>
          <Text style={styles.text}>
            {formValues.clientPostalCode} {formValues.clientCity}
          </Text>
          <Text style={styles.text}>France</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>SIREN : {formValues.SIREN}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Numéro du devis : {formValues.estimateNumber}
        </Text>
        <Text style={styles.text}>
          Date d&apos;émission : {formValues.issueDate}
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
                    <Text style={styles.tableCell}>{item.TVA}</Text>
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
        <Text style={styles.text}>Total HT: {formValues.totalHT}</Text>
        <Text style={styles.text}>TVA: {formValues.totalTVA}</Text>
        <Text style={styles.text}>Total TTC: {formValues.totalTTC}</Text>
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
          MONSIEUR {formValues.name} vous a envoyé ce devis le{' '}
          {formValues.issueDate}.
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

export default PDFDocument;
