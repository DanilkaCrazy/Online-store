import React from 'react';
import { Dropdown } from 'react-bootstrap';

const TextField: React.FC<{
  fieldHeader: string, 
  type: string,
  placeholder: string, 
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  isValid: boolean,
  warning: string,
  defaultValue?: string
}> = ({fieldHeader, type, placeholder, onChange, isValid, warning, defaultValue}) => (
  <div className='form-field'>
    <h3>{fieldHeader}</h3>
    <input onChange={onChange} type={type} placeholder={placeholder} defaultValue={defaultValue}/>
    <p className='secondary-p danger-p' hidden={isValid}>{warning}</p>
  </div>
);

const DateField: React.FC<{
  fieldHeader: string,
  defaultValue: Date,
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}> = ({fieldHeader, defaultValue, onChange}) => (
  <div className='form-field'>
    <h3>{fieldHeader}</h3>
    <input onChange={onChange} type='date' defaultValue={defaultValue.toDateString()}/>
  </div>
);

const NumberField: React.FC<{
  fieldHeader: string,
  defaultValue: number,
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}> = ({fieldHeader, defaultValue, onChange}) => (
  <div className='form-field'>
    <h3>{fieldHeader}</h3>
    <input onChange={onChange} type='number' defaultValue={defaultValue}/>
  </div>
);

const DropdownField: React.FC<{
  fieldHeader: string,
  options: string[], 
  placeholder: string | undefined, 
  onOptionSelect: (eventKey: string | null) => void
}> = ({fieldHeader, options, placeholder, onOptionSelect}) => (
  <div className='form-field'>
    <h3>{fieldHeader}</h3>
    <Dropdown onSelect={onOptionSelect}>
      <Dropdown.Toggle>{placeholder}</Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option, i) => (
          <Dropdown.Item 
            key={i}
            eventKey={option} 
            active={placeholder === option}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

const MultiselectDropdown: React.FC<{
  fieldHeader: string;
  options: string[];
  chosenOptions: string[];
  onOptionClick: (eventKey: string, isChosen: boolean) => void
}> = ({fieldHeader, options, chosenOptions, onOptionClick}) => (
  <div className='form-field'>
    <h3>{fieldHeader}</h3>
    <Dropdown autoClose={false} aria-multiselectable>
      <Dropdown.Toggle>{chosenOptions.join(', ')}</Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option, i) => {
          const isChosen = chosenOptions.includes(option);
          return (
            <Dropdown.Item 
              key={i}
              eventKey={option} 
              active={isChosen}
              onClick={() => onOptionClick(option, isChosen)}>
              {option}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

const TextareaField: React.FC<{
  fieldHeader: string, 
  placeholder: string, 
  onChange: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void,
  defaultValue?: string
}> = ({fieldHeader, placeholder, onChange, defaultValue}) => (
  <div className='form-field'>
    <h3>{fieldHeader}</h3>
    <textarea onChange={onChange} placeholder={placeholder} defaultValue={defaultValue}/>
  </div>
);

export {TextField, DateField, NumberField, DropdownField, MultiselectDropdown, TextareaField};
