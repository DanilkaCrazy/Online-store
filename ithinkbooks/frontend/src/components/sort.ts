const SortTypes = {
  POPULARITY: 'popularity',
  ASCENDING_RATING: 'ascending-rating',
  DESCENDING_RATING: 'descending-rating',
  ASCENDING_PRICE: 'ascending-price',
  DESCENDING_PRICE: 'descending-price',
  A_Z: 'a-z',
  Z_A: 'z-a',
  ASCENDING_YEAR: 'ascending-year',
  DESCENDING_YEAR: 'descending-year'
};

const SortTranslations = {
  [SortTypes.POPULARITY]: 'Популярность',
  [SortTypes.ASCENDING_RATING]: 'Возрастание оценки',
  [SortTypes.DESCENDING_RATING]: 'Убывание оценки',
  [SortTypes.ASCENDING_PRICE]: 'Возрастание цены',
  [SortTypes.DESCENDING_PRICE]: 'Убывание цены',
  [SortTypes.A_Z]: 'A-Z, А-Я',
  [SortTypes.Z_A]: 'Я-А, Z-A',
  [SortTypes.ASCENDING_YEAR]: 'Возрастание года',
  [SortTypes.DESCENDING_YEAR]: 'Убывание года'
}

export {SortTypes, SortTranslations};
