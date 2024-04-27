import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { SortTranslations, SortTypes } from '../sort';
import Filter, { defaultFilter } from '../Filter';
import { MAX_PRICE, MIN_PRICE } from '../utils';
import ReactSlider from 'react-slider';
import { MAX_YEAR, MIN_YEAR } from '../date-utils';
import languages from '../mock/languages.json';
import { BookFormats } from '../mock/mock';

const SliderField: React.FC<{
  fieldHeader: string,
  changeValue: (minValue: number, maxValue: number) => void,
  minValue: number,
  maxValue: number,
  minSliderValue: number,
  maxSliderValue: number,
  updateFilterViaSlider: (minValue: number, maxValue: number) => void
}> = ({fieldHeader, changeValue, minValue, maxValue, minSliderValue, maxSliderValue, updateFilterViaSlider}) => (
  <div className='filter-field'>
      <h3 className='normal-h3'>{fieldHeader}</h3>
      
      <ReactSlider
        className="dual-slider"
        thumbClassName="dual-slider-thumb"
        trackClassName="dual-slider-track"
        min={minSliderValue}
        max={maxSliderValue}
        value={[minValue, maxValue]}
        minDistance={1}
        onChange={(value) => updateFilterViaSlider(value[0], value[1])}/>

      <div className='filter-slider-fields form-field'>
        <input 
          type='number' 
          value={minValue}
          onChange={(evt) => changeValue(evt.target.valueAsNumber, evt.target.valueAsNumber >= maxValue ? evt.target.valueAsNumber + 1 : maxValue)}/>

        <h3>-</h3>

        <input 
          type='number' 
          value={maxValue} 
          onChange={(evt) => changeValue(evt.target.valueAsNumber <= minValue ? evt.target.valueAsNumber - 1 : minValue, evt.target.valueAsNumber)}/>
      </div>
    </div>
);

const FiltersListBlock: React.FC<{
  fieldHeader: string,
  type: string,
  options: string[],
  optionsNames: string[],
  listTitle: string,
  updateFilters: (newValue: string) => void
}> = ({fieldHeader, type, options, optionsNames, listTitle, updateFilters}) => (
  <div className='filter-field'>
    <h3 className='normal-h3'>{fieldHeader}</h3>

    <div className='filters-options'>
      {options.map((option, i) => (
        <label key={i} className='list-option' htmlFor={option}>
          <input type={type} name={listTitle} id={option} onChange={() => updateFilters(option)}/>
          <p className='main-p'>{optionsNames[i]}</p>
        </label>
      ))}
    </div>

  </div>
);

const FiltersMenu: React.FC<{
  applyFilters: (filter: Filter) => void
}> = ({applyFilters}) => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  const onSortTypeSelect = (eventKey: string | null) => {
    if(!eventKey) {
      return;
    }

    setFilter({...filter, sortType: eventKey});
  }

  const changePrice = (minValue: number, maxValue: number) => {
    const minPrice = !minValue || minValue < MIN_PRICE ? MIN_PRICE : (minValue >= MAX_PRICE ? MAX_PRICE - 1 : minValue);
    const maxPrice = !maxValue || maxValue > MAX_PRICE || !maxValue ? MAX_PRICE : (maxValue <= MIN_PRICE ? MIN_PRICE + 1 : maxValue);
    setFilter({...filter, minPrice, maxPrice});
  };

  const changePriceViaSlider = (minValue: number, maxValue: number) => {
    setFilter({...filter, minPrice: minValue, maxPrice: maxValue});
  };

  const changeYear = (minValue: number, maxValue: number) => {
    const minYear = !minValue || minValue < MIN_YEAR ? MIN_YEAR : (minValue >= MAX_YEAR ? MAX_YEAR - 1 : minValue);
    const maxYear = !maxValue || maxValue > MAX_YEAR || !maxValue ? MAX_YEAR : (maxValue <= MIN_YEAR ? MIN_YEAR + 1 : maxValue);
    setFilter({...filter, minYear, maxYear});
  };

  const changeYearViaSlider = (minValue: number, maxValue: number) => {
    setFilter({...filter, minYear: minValue, maxYear: maxValue});
  };

  const changeLanguages = (newValue: string) => {
    setFilter({
      ...filter, 
      languages: filter.languages.includes(newValue) 
        ? filter.languages.filter((language) => language !== newValue) 
        : filter.languages.concat(newValue)});
  };

  const changeBookFormats = (newValue: string) => {
    setFilter({
      ...filter, 
      formats: filter.formats.includes(newValue) 
        ? filter.formats.filter((format) => format !== newValue) 
        : filter.formats.concat(newValue)});
  };

  return (
    <div className='filters-panel'>
      <div className='filters'>
        <Dropdown onSelect={onSortTypeSelect}>
          <Dropdown.Toggle>{SortTranslations[filter.sortType]}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item 
                eventKey={SortTypes.POPULARITY} 
                active={filter.sortType === SortTypes.POPULARITY}>
                  {SortTranslations[SortTypes.POPULARITY]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.ASCENDING_RATING}
                active={filter.sortType === SortTypes.ASCENDING_RATING}>
                  {SortTranslations[SortTypes.ASCENDING_RATING]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.DESCENDING_RATING}
                active={filter.sortType === SortTypes.DESCENDING_RATING}>
                  {SortTranslations[SortTypes.DESCENDING_RATING]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.ASCENDING_PRICE}
                active={filter.sortType === SortTypes.ASCENDING_PRICE}>
                  {SortTranslations[SortTypes.ASCENDING_PRICE]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.DESCENDING_PRICE}
                active={filter.sortType === SortTypes.DESCENDING_PRICE}>
                  {SortTranslations[SortTypes.DESCENDING_PRICE]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.A_Z}
                active={filter.sortType === SortTypes.A_Z}>
                  {SortTranslations[SortTypes.A_Z]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.Z_A}
                active={filter.sortType === SortTypes.Z_A}>
                  {SortTranslations[SortTypes.Z_A]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.ASCENDING_YEAR}
                active={filter.sortType === SortTypes.ASCENDING_YEAR}>
                  {SortTranslations[SortTypes.ASCENDING_YEAR]}
              </Dropdown.Item>
              <Dropdown.Item 
                eventKey={SortTypes.DESCENDING_YEAR}
                active={filter.sortType === SortTypes.DESCENDING_YEAR}>
                  {SortTranslations[SortTypes.DESCENDING_YEAR]}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        <FiltersListBlock
          fieldHeader='Языки:'
          type='checkbox'
          options={languages.map((language) => language.code)}
          optionsNames={languages.map((language) => language.language)}
          listTitle='languages'
          updateFilters={changeLanguages}/>

        <FiltersListBlock
          fieldHeader='Форматы:'
          type='checkbox'
          options={BookFormats.map((format) => format.key)}
          optionsNames={BookFormats.map((format) => format.name)}
          listTitle='formats'
          updateFilters={changeBookFormats}/>

        <SliderField 
          fieldHeader='Цена:'
          changeValue={changePrice}
          minValue={filter.minPrice}
          maxValue={filter.maxPrice}
          minSliderValue={defaultFilter.minPrice}
          maxSliderValue={defaultFilter.maxPrice}
          updateFilterViaSlider={changePriceViaSlider}/>

        <SliderField
          fieldHeader='Год:'
          changeValue={changeYear}
          minValue={filter.minYear}
          maxValue={filter.maxYear}
          minSliderValue={defaultFilter.minYear}
          maxSliderValue={defaultFilter.maxYear}
          updateFilterViaSlider={changeYearViaSlider}/>

        <button className='main-button' onClick={() => applyFilters(filter)}>Применить</button>
      </div>
    </div>
  );
};

export default FiltersMenu;
