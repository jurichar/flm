import {
  Card,
  List,
  ListItem,
  Typography,
  Chip,
} from '@material-tailwind/react';

const ModuleACQPreview = () => {
  const invoices = [
    { id: 1, name: 'Invoice 1', amount: '50€', sent: 'true', sign: 'true' },
    { id: 2, name: 'Invoice 2', amount: '200€', sent: 'true', sign: 'false' },
    { id: 3, name: 'Invoice 2', amount: '200€', sent: 'false', sign: 'false' },
  ];

  return (
    <Card className="w-full h-full p-4 overflow-scroll">
      {invoices.length > 0 ? (
        <List>
          {invoices.map((invoice) => (
            <ListItem
              className="mb-2 flex justify-between items-center"
              key={invoice.id}
            >
              <div>
                <Typography color="blue-gray" variant="body1">
                  {invoice.name}: {invoice.amount}
                </Typography>
              </div>
              <div className="flex gap-2">
                {invoice.sign === 'true' ? (
                  <Chip value="Signé" />
                ) : invoice.sent === 'true' ? (
                  <Chip value="Envoyé" />
                ) : (
                  <Chip value="Non Envoyé" />
                )}
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="blue-gray" variant="body1">
          Aucune facture disponible.
        </Typography>
      )}
    </Card>
  );
};

export default ModuleACQPreview;
