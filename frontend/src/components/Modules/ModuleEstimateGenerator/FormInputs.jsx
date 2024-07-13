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

const FormInputs = ({ onInputChange, buffer, applyChanges }) => {
  const [localValues, setLocalValues] = useState(buffer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...localValues, [name]: value };
    setLocalValues(newValues);
    onInputChange(newValues);
  };

  const handleBlur = () => {
    applyChanges();
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = localValues.items.map((item, i) => {
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
    setLocalValues({ ...localValues, items: newItems });
    onInputChange({ ...localValues, items: newItems });
  };

  const handleItemBlur = () => {
    applyChanges();
  };

  const handleAddButton = () => {
    const newItems = [
      ...localValues.items,
      { name: '', details: '', quantity: '', unitPrice: '', TVA: 0, total: 0 },
    ];
    setLocalValues({ ...localValues, items: newItems });
    onInputChange({ ...localValues, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = localValues.items.filter((_, i) => i !== index);
    setLocalValues({ ...localValues, items: newItems });
    onInputChange({ ...localValues, items: newItems });
    applyChanges();
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={localValues.estimateNumber}
              />
            </Card>
            <Card className="p-4 flex flex-col gap-4" shadow={false}>
              <Input
                label="Client Name"
                name="clientName"
                onBlur={handleBlur}
                onChange={handleChange}
                value={localValues.clientName}
              />
              <Input
                label="Client Address Line"
                name="clientAddress"
                onBlur={handleBlur}
                onChange={handleChange}
                value={localValues.clientAddress}
              />
              <Input
                label="Client Postal Code"
                name="clientPostalCode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={localValues.clientPostalCode}
              />
              <Input
                label="Client City"
                name="clientCity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={localValues.clientCity}
              />
            </Card>

            {localValues.items.map((item, index) => (
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
                    onBlur={handleItemBlur}
                    onChange={(e) => handleItemChange(index, e)}
                    value={item.name}
                  />
                </div>
                <Textarea
                  label="Item Details"
                  name="details"
                  onBlur={handleItemBlur}
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.details}
                />
                <Input
                  label="Item Quantity"
                  name="quantity"
                  onBlur={handleItemBlur}
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.quantity}
                />
                <Input
                  label="Item Unit Price"
                  name="unitPrice"
                  onBlur={handleItemBlur}
                  onChange={(e) => handleItemChange(index, e)}
                  value={item.unitPrice}
                />
                <Checkbox
                  checked={item.TVA === 10}
                  label="TVA 10%"
                  name="TVA"
                  onBlur={handleItemBlur}
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
