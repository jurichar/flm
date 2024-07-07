import { useState } from 'react';
import { Card, Input, Typography, Chip } from '@material-tailwind/react';

const ModuleCalculator = () => {
  const [tjm, setTjm] = useState('');
  const [days, setDays] = useState('');

  const handleTjmChange = (e) => {
    setTjm(e.target.value);
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const calculateRevenue = () => {
    const tjmValue = parseFloat(tjm);
    const daysValue = parseFloat(days);
    if (isNaN(tjmValue) || isNaN(daysValue)) {
      return 0;
    }
    return tjmValue * daysValue;
  };

  const calculateAfterUrssaf = () => {
    const revenue = calculateRevenue();
    const urssafDeduction = revenue * 0.22; // 22% pour l'URSSAF
    return revenue - urssafDeduction;
  };

  const calculateNetIncome = () => {
    const afterUrssaf = calculateAfterUrssaf();
    const incomeTaxDeduction = afterUrssaf * 0.14; // 14% pour l'impôt sur le revenu
    return afterUrssaf - incomeTaxDeduction;
  };

  const calculateAnnualIncome = () => {
    const netIncome = calculateNetIncome();
    return netIncome * 12;
  };

  const calculateMonthlyIncome = () => {
    const netIncome = calculateNetIncome();
    return netIncome;
  };

  const calculateDailyIncome = () => {
    const netIncome = calculateNetIncome();
    return netIncome / days;
  };

  return (
    <Card className="w-full h-full p-4">
      <div className="mb-4">
        <Input
          label="TJM"
          onChange={handleTjmChange}
          step="1"
          type="number"
          value={tjm}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Nombre de jours travaillés"
          onChange={handleDaysChange}
          step="1"
          type="number"
          value={days}
        />
      </div>
      <Typography color="blue-gray" variant="h6">
        CA:{' '}
        {calculateRevenue().toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        })}
      </Typography>
      <Typography color="blue-gray" variant="h6">
        Revenu post URSSAF:{' '}
        {calculateAfterUrssaf().toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        })}
      </Typography>
      <Typography color="blue-gray" variant="h6">
        Revenu net:&apos;{' '}
        {calculateNetIncome().toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        })}
      </Typography>
      <div className="flex justify-between mt-4">
        <Chip
          value={
            calculateAnnualIncome().toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }) + ' / Y'
          }
          variant="outlined"
        />
        <Chip
          value={
            calculateMonthlyIncome().toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }) + ' / M'
          }
          variant="outlined"
        />
        <Chip
          value={
            calculateDailyIncome().toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            }) + ' / D'
          }
          variant="outlined"
        />
      </div>
    </Card>
  );
};

export default ModuleCalculator;
