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
import { useState } from 'react';

const FormInputs = ({ onInputChange }) => {
  const [formValues, setFormValues] = useState({
    estimateNumber: '',
    clientName: '',
    clientAddress: '',
    clientPostalCode: '',
    clientCity: '',
    items: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...formValues, [name]: value };
    setFormValues(newValues);
    onInputChange(newValues);
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = formValues.items.map((item, i) => {
      if (i === index) {
        const newItem = { ...item, [name]: value };

        const unitPrice = parseFloat(newItem.unitPrice) || 0;
        const quantity = parseInt(newItem.quantity, 10) || 0;
        const tva = parseFloat(newItem.TVA) || 0;
        newItem.total = unitPrice * quantity * (1 + tva / 100);

        return newItem;
      }
      return item;
    });
    setFormValues({ ...formValues, items: newItems });
    onInputChange({ ...formValues, items: newItems });
  };

  const handleAddButton = () => {
    const newItems = [
      ...formValues.items,
      { name: '', details: '', quantity: '', unitPrice: '', TVA: 0, total: 0 },
    ];
    setFormValues({ ...formValues, items: newItems });
    onInputChange({ ...formValues, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = formValues.items.filter((_, i) => i !== index);
    setFormValues({ ...formValues, items: newItems });
    onInputChange({ ...formValues, items: newItems });
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
                value={formValues.estimateNumber}
              />
            </Card>
            <Card className="p-4 flex flex-col gap-4" shadow={false}>
              <Input
                label="Client Name"
                name="clientName"
                onChange={handleChange}
                value={formValues.clientName}
              />
              <Input
                label="Client Address Line"
                name="clientAddress"
                onChange={handleChange}
                value={formValues.clientAddress}
              />
              <Input
                label="Client Postal Code"
                name="clientPostalCode"
                onChange={handleChange}
                value={formValues.clientPostalCode}
              />
              <Input
                label="Client City"
                name="clientCity"
                onChange={handleChange}
                value={formValues.clientCity}
              />
            </Card>

            {formValues.items.map((item, index) => (
              <Card className="p-4 flex flex-col gap-6" key={index}>
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
                <Checkbox
                  checked={item.TVA === 10}
                  label="TVA 10%"
                  name="TVA"
                  onChange={(e) =>
                    handleItemChange(index, {
                      target: { name: 'TVA', value: e.target.checked ? 10 : 0 },
                    })
                  }
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
