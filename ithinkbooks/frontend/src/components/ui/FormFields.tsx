import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import ImageFieldIcon from '../../images/pages/ImageFieldIcon.svg';
import DefaultAvatar from '../../images/pages/DefaultAvatar.svg';
import ReactSlider from 'react-slider';

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

const ImageField: React.FC<{
  fieldHeader: string,
  image: string,
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
}> = ({fieldHeader, image, onChange}) => {
  const [iconOpacity, setIconOpacity] = useState<number>();

  return (
    <div className='image-field' onMouseEnter={() => setIconOpacity(1)} onMouseLeave={() => setIconOpacity(!image ? 1 : 0)}>
      <img className='field-avatar' src={!image ? DefaultAvatar : image} alt='Новый аватар'/>

      <div className='image-field-icon' style={{opacity: iconOpacity}}>
        <img src={ImageFieldIcon} alt={fieldHeader}/>
        <p className='main-p secondary-color'>{fieldHeader}</p>
      </div>
      
      <label className='image-field-input' htmlFor='avatar'>
        <input type='file' id='avatar' onChange={onChange}/>
      </label>
    </div>
  );
};

const RangeField: React.FC<{
  minValue: number,
  maxValue: number,
  value: number,
  step: number,
  onChange: (value: number) => void
}> = ({minValue, maxValue, value, step, onChange}) => (
  <div className='form-field range-field'>
    <h3>{value}x</h3>
    <ReactSlider
        className="slider"
        thumbClassName="slider-thumb"
        trackClassName="slider-track"
        min={minValue}
        max={maxValue}
        defaultValue={minValue}
        step={step}
        onChange={onChange}/>
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

export {TextField, DateField, NumberField, ImageField, RangeField, DropdownField, MultiselectDropdown, TextareaField};
