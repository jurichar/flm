// src/components/LocaleSwitcherSelect.jsx

'use client';

import { useState, useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faCheck } from '@fortawesome/free-solid-svg-icons';
import { setUserLocale } from '../../service/locale';

const LocaleSwitcherSelect = ({ defaultValue, items, label }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function onChange(value) {
    startTransition(() => {
      setUserLocale(value);
      setIsOpen(false);
    });
  }

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        aria-label={label}
        className="rounded-sm p-2 transition-colors hover:bg-slate-200"
        disabled={isPending}
        onClick={toggleDropdown}
        type="button"
      >
        <FontAwesomeIcon className="h-6 w-6 text-slate-600" icon={faLanguage} />
      </button>
      {isOpen ? (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {items.map((item) => (
              <button
                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                  item.value === defaultValue
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                }`}
                key={item.value}
                onClick={() => onChange(item.value)}
                type="button"
              >
                {item.value === defaultValue ? (
                  <FontAwesomeIcon
                    className="mr-2 h-5 w-5 text-slate-600"
                    icon={faCheck}
                  />
                ) : null}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LocaleSwitcherSelect;
