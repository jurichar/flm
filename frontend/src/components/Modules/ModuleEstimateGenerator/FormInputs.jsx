import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';

const FormInputs = ({ formValues, onInputChange }) => {
  const [localValues, setLocalValues] = useState(formValues);

  useEffect(() => {
    setLocalValues(formValues);
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 10 : 0) : value;
    const newValues = { ...localValues, [name]: newValue };
    if (name === 'TVA') {
      const newItems = localValues.items.map((item) => {
        const unitPrice = parseFloat(item.unitPrice).toFixed(2) || 0;
        const quantity = parseInt(item.quantity, 10) || 0;
        const tva = parseFloat(newValue).toFixed(1) || 0;
        const total = (unitPrice * quantity * (1 + tva / 100)).toFixed(2);
        return { ...item, total };
      });
      newValues.items = newItems;
    }
    setLocalValues(newValues);
    onInputChange(newValues);
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = localValues.items.map((item, i) => {
      if (i === index) {
        const newItem = { ...item, [name]: value };

        const unitPrice = parseFloat(newItem.unitPrice).toFixed(2) || 0;
        const quantity = parseInt(newItem.quantity, 10) || 0;
        const tva = parseFloat(localValues.TVA).toFixed(1) || 0;
        newItem.total = (unitPrice * quantity * (1 + tva / 100)).toFixed(2);

        return newItem;
      }
      return item;
    });
    setLocalValues({ ...localValues, items: newItems });
    onInputChange({ ...localValues, items: newItems });
  };

  const handleAddButton = () => {
    const newItems = [
      ...localValues.items,
      { name: '', details: '', quantity: '', unitPrice: '', total: 0 },
    ];
    setLocalValues({ ...localValues, items: newItems });
    onInputChange({ ...localValues, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = localValues.items.filter((_, i) => i !== index);
    setLocalValues({ ...localValues, items: newItems });
    onInputChange({ ...localValues, items: newItems });
  };

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
                onChange={handleChange}
                value={localValues.estimateNumber}
              />
            </Card>
            <Card className="p-4 flex flex-col gap-4" shadow={false}>
              <Input
                label="Client Name"
                name="clientName"
                onChange={handleChange}
                value={localValues.clientName}
              />
              <Textarea
                label="Client Address"
                name="clientAddress"
                onChange={handleChange}
                value={localValues.clientAddress}
              />
              <Input
                label="Client Postal Code"
                name="clientPostalCode"
                onChange={handleChange}
                value={localValues.clientPostalCode}
              />
              <Input
                label="Client City"
                name="clientCity"
                onChange={handleChange}
                value={localValues.clientCity}
              />
              <Checkbox
                checked={localValues.TVA === 10}
                label="TVA 10%"
                name="TVA"
                onChange={handleChange}
              />
            </Card>

            {localValues.items.map((item, index) => (
              <Card className="p-4 flex flex-col gap-4" key={index}>
                <div className="flex flex-row gap-4">
                  <IconButton
                    className="rounded-full w-12"
                    onClick={() => handleRemoveItem(index)}
                    variant="outlined"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
                  <Input
                    label="Item Name"
                    name="name"
                    onChange={(e) => handleItemChange(index, e)}
                    value={item.name}
                  />
                </div>
                <Textarea
                  label="Item Details"
                  name="details"
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.details}
                />
                <Input
                  label="Item Quantity"
                  name="quantity"
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.quantity}
                />
                <Input
                  label="Item Unit Price"
                  name="unitPrice"
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.unitPrice}
                />
              </Card>
            ))}
            <Button className="w-[20rem]" onClick={handleAddButton}>
              Add item
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default FormInputs;
