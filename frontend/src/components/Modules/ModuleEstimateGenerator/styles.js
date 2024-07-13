import { StyleSheet } from '@react-pdf/renderer';

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

export default styles;
