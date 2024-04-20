import Language from "./Language";
import Review from "./Review";
import Theme from "./Theme";

export default interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  rating: number;
  canBePaperback: boolean;
  paperFormat: string;
  fileTypes: string[];
  publisher: string;
  year: number;
  month: number;
  pagesAmount: number;
  isbn: string;
  translator: string;
  themes: Theme[];
  deliveryDays: number;
  description: string;
  reviews: Review[];
  isRecommended: boolean;
  language: Language;
};
