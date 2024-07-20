'use client';

import { Locale } from "@/src/config";
import { setUserLocale } from "@/src/services/locale";
import { faCheck, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, List, ListItem } from "@material-tailwind/react";
import { createRef, useState, useTransition } from "react";


type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = createRef<HTMLDivElement>();

  return (
    <div className="relative" ref={buttonRef}>
      <Button
        color="light-blue"
        ripple={true}
        className="uppercase font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faLanguage} size="lg" />
        {label}
      </Button>
      {isOpen && (
        <List className="absolute z-50 mt-1 min-w-full rounded-lg bg-white shadow-lg">
          {items.map((item) => (
            <ListItem
              key={item.value}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => onChange(item.value)}
            >
              <div className="flex items-center justify-between w-full">
                <span>{item.label}</span>
                {item.value === defaultValue && (
                  <FontAwesomeIcon icon={faCheck} />
                )}
              </div>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}