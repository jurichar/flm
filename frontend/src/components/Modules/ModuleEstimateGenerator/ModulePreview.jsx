import { List, ListItem, Typography, Chip } from '@material-tailwind/react';

const ModuleEstimateGeneratorPreview = () => {
  const estimates = [
    { id: 1, name: 'Estimate 1', amount: '50€', sent: 'true', sign: 'true' },
    { id: 2, name: 'Estimate 2', amount: '1600€', sent: 'true', sign: 'false' },
    { id: 3, name: 'Estimate 2', amount: '5200€', sent: 'true', sign: 'true' },
  ];

  return (
    <div className="w-full h-full overflow-scroll">
      {estimates.length > 0 ? (
        <List>
          {estimates.map((estimate) => (
            <ListItem
              className="mb-2 flex justify-between items-center"
              key={estimate.id}
            >
              <div>
                <Typography color="blue-gray" variant="paragraph">
                  {estimate.name}: {estimate.amount}
                </Typography>
              </div>
              <div className="flex gap-2">
                {estimate.sign === 'true' ? (
                  <Chip value="Signé" />
                ) : estimate.sent === 'true' ? (
                  <Chip value="Envoyé" />
                ) : (
                  <Chip value="Non Envoyé" />
                )}
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="blue-gray" variant="paragraph">
          Aucun devis disponible.
        </Typography>
      )}
    </div>
  );
};

export default ModuleEstimateGeneratorPreview;
