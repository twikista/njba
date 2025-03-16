'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { CgMathPlus } from 'react-icons/cg';
import { HiOutlineExclamationCircle, HiOutlineXMark } from 'react-icons/hi2';
import { Tooltip } from 'react-tooltip';
import { cn } from '@/lib/utils';

// Input field component to reduce repetition
const FormInput = ({ name, label, placeholder, error, index }) => {
  const { register } = useFormContext();
  const fieldName = `authors.${index}.${name}`;
  const fieldError = error?.[index]?.[name]?.message;

  return (
    <div className='flex flex-col mt-2'>
      <label htmlFor={fieldName} className='inline-block mb-1'>
        {label}
      </label>
      <div
        className={cn(
          'flex border border-gray-300 rounded-md focus-within:border-2 overflow-hidden bg-white',
          error && 'border-red-400'
        )}
      >
        <input
          className='w-full text-gray-600 pl-3 inline-block py-2 outline-none appearance-none'
          type='text'
          {...register(fieldName)}
          id={fieldName}
          placeholder={placeholder}
        />
        {error && (
          <HiOutlineExclamationCircle
            className={cn('w-5 mr-3', error && 'text-red-400')}
          />
        )}
      </div>

      {fieldError && <span className='text-red-500'>{fieldError}</span>}
    </div>
  );
};

// Author form component
const AuthorForm = ({ field, index, fields, remove, error }) => {
  const isMultipleAuthors = fields.length > 1;

  return (
    <div
      key={field.id}
      className={cn(
        isMultipleAuthors && 'p-2 bg-gray-100 border border-gray-200 rounded-lg'
      )}
    >
      {isMultipleAuthors && (
        <div className='flex items-center gap-1 mb-1'>
          <span className='font-medium'>{`Author-${index + 1}`}</span>
          <button
            type='button'
            data-tooltip-id='delete-author'
            data-tooltip-content={`Remove Author-${index + 1}`}
            data-tooltip-place='top'
            onClick={() => remove(index)}
            className='flex items-center justify-center w-4 h-4 p-[1px] text-red-500 bg-transparent border border-red-500 rounded-[4px] hover:bg-red-500 hover:text-white'
          >
            <HiOutlineXMark className='w-3' />
            <Tooltip id='delete-author' />
          </button>
        </div>
      )}

      <div className='flex flex-col'>
        <FormInput
          name='name'
          label={isMultipleAuthors ? 'Name' : 'Author Name'}
          placeholder="Enter Author's name (Surname First)"
          error={error}
          index={index}
        />

        <FormInput
          name='department'
          label={isMultipleAuthors ? 'Department' : 'Author Department'}
          placeholder="Enter Author's Department"
          error={error}
          index={index}
        />

        <FormInput
          name='institution'
          label={isMultipleAuthors ? 'Institution' : 'Author Institution'}
          placeholder="Enter Author's Institution"
          error={error}
          index={index}
        />
      </div>
    </div>
  );
};

// Add author button component
const AddAuthorButton = ({ onAddAuthor }) => (
  <div className='flex justify-end mt-[8px]'>
    <button
      type='button'
      className='flex gap-[2px] rounded-[4px] px-2 text-gray-600 transition-colors duration-200 bg-gray-300 py-1 items-center justify-center hover:bg-neutral-300'
      onClick={onAddAuthor}
    >
      <CgMathPlus className='w-4 fill-current' />
      <span>Add Author</span>
    </button>
  </div>
);

// Main component
export default function AuthorsInput() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'authors',
  });

  const error = errors['authors'];

  const handleAddAuthor = () => {
    append({
      name: '',
      department: '',
      institution: '',
    });
  };

  return (
    <fieldset>
      <div>
        <div className='space-y-6'>
          {fields.map((field, index) => (
            <AuthorForm
              key={field.id}
              field={field}
              index={index}
              fields={fields}
              remove={remove}
              error={error}
            />
          ))}
        </div>
        <AddAuthorButton onAddAuthor={handleAddAuthor} />
      </div>
    </fieldset>
  );
}
