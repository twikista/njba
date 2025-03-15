import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

// Separate dropdown option component to prevent unnecessary re-renders
const DropdownOption = memo(({ option, isSelected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(option);
  }, [option, onSelect]);

  return (
    <li
      className={`cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100 ${
        isSelected ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
      }`}
      role='option'
      aria-selected={isSelected}
      onClick={handleClick}
    >
      <span
        className={`block truncate ${
          isSelected ? 'font-medium' : 'font-normal'
        }`}
      >
        {option.label}
      </span>
      {isSelected && (
        <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600'>
          <svg
            className='h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        </span>
      )}
    </li>
  );
});

DropdownOption.displayName = 'DropdownOption';

// Main component
const Select = memo(
  ({ name, label, options, placeholder = 'Select an option' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const { field } = useController({
      name,
      control,
    });

    const error = errors[name]?.message;

    const selectedOption = options.find(
      (option) => option.value === field.value
    );

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    // Toggle dropdown
    const toggleDropdown = useCallback(() => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    // Handle selection
    const handleSelect = useCallback(
      (option) => {
        field.onChange(option.value);
        setIsOpen(false);
      },
      [field]
    );

    return (
      <div className='w-full max-w-md'>
        {label && (
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            {label}
          </label>
        )}
        <div className='relative' ref={selectRef}>
          <button
            type='button'
            className={`relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            onClick={toggleDropdown}
            aria-haspopup='listbox'
            aria-expanded={isOpen}
          >
            <span
              className={`block truncate ${
                !selectedOption ? 'text-gray-500' : ''
              }`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </button>

          {isOpen && (
            <ul
              className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
              tabIndex='-1'
              role='listbox'
            >
              {options.map((option) => (
                <DropdownOption
                  key={option.value}
                  option={option}
                  isSelected={selectedOption?.value === option.value}
                  onSelect={handleSelect}
                />
              ))}
            </ul>
          )}
        </div>
        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
