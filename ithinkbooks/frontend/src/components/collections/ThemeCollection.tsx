import React, { useState } from 'react';
import { books } from '../mock/mock';
import Theme from '../Theme';
import '../../css/ThemeCollection.css';
import BookComponent from '../books/Book';
import { Dropdown } from 'react-bootstrap';
import { SortTranslations, SortTypes } from '../sort';
//import axios from 'axios';

const FiltersMenu: React.FC<{
  sortType: string, 
  setSortType: React.Dispatch<React.SetStateAction<string>>
}> = ({sortType, setSortType}) => {
  const onSortTypeSelect = (eventKey: string | null) => {
    if(!eventKey) {
      return;
    }

    setSortType(eventKey);
  }

  return (
    <div className='filters'>
      <Dropdown onSelect={onSortTypeSelect}>
        <Dropdown.Toggle>{SortTranslations[sortType]}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item 
              eventKey={SortTypes.POPULARITY} 
              active={sortType === SortTypes.POPULARITY}>
                {SortTranslations[SortTypes.POPULARITY]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.ASCENDING_RATING}
              active={sortType === SortTypes.ASCENDING_RATING}>
                {SortTranslations[SortTypes.ASCENDING_RATING]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.DESCENDING_RATING}
              active={sortType === SortTypes.DESCENDING_RATING}>
                {SortTranslations[SortTypes.DESCENDING_RATING]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.ASCENDING_PRICE}
              active={sortType === SortTypes.ASCENDING_PRICE}>
                {SortTranslations[SortTypes.ASCENDING_PRICE]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.DESCENDING_PRICE}
              active={sortType === SortTypes.DESCENDING_PRICE}>
                {SortTranslations[SortTypes.DESCENDING_PRICE]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.A_Z}
              active={sortType === SortTypes.A_Z}>
                {SortTranslations[SortTypes.A_Z]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.Z_A}
              active={sortType === SortTypes.Z_A}>
                {SortTranslations[SortTypes.Z_A]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.ASCENDING_YEAR}
              active={sortType === SortTypes.ASCENDING_YEAR}>
                {SortTranslations[SortTypes.ASCENDING_YEAR]}
            </Dropdown.Item>
            <Dropdown.Item 
              eventKey={SortTypes.DESCENDING_YEAR}
              active={sortType === SortTypes.DESCENDING_YEAR}>
                {SortTranslations[SortTypes.DESCENDING_YEAR]}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </div>
  );
};

const ThemeCollection: React.FC<{theme: Theme}> = ({theme}) => {
  const themeBooks = books.filter((book) => book.themes.includes(theme));
  const [sortType, setSortType] = useState<string>(SortTypes.POPULARITY);

  /*const GetData = () => {
    axios.get('http://127.0.0.1:8000/products').then((res)=>{
      console.log(res.data)
    })}
  useEffect(()=>{
    GetData()
  })*/

  if(!themeBooks.length) {
    return (
      <div className='page'>
        <h2>К сожалению, книг по этой тематике в каталоге больше нет</h2>
      </div>
    );
  }

  return (
    <div className='divided-page theme-collection'>
      <FiltersMenu sortType={sortType} setSortType={setSortType}/>
      <div>
        <h1>{theme.name}</h1>
        <div className='books-collection'>
          {themeBooks.map((book, i) => <BookComponent key={i} book={book}/>)}
        </div>
      </div>
    </div>
  );
};

export default ThemeCollection;
