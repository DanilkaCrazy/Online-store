import { faker } from '@faker-js/faker';
import themes from './themes.json';
import statuses from './statuses.json';
import Theme from '../Theme';
import User from '../User';
import cities from './cities.json';
import languages from './languages.json';
import Book from '../Book';
import Review from '../Review';

const COUNT = 20;

const PaperFormat = {
    SOFT: 'Мягкий переплёт',
    HARD: 'Твёрдый переплёт'
};

const BookFormat = {
    PAPERBACK: "Печатный",
    ELECTRONIC: "Электронный"
}

const FileType = {
    PDF: 'PDF',
    EPUB: 'EBUP',
    DOC: 'DOC',
    FB2: 'FB2'
};

const PROGRAMMING_LANGUAGES = ['C/C++', 'C#', 'Java', 'JavaScript', 'TypeScript', 
    'HTML/CSS', 'Python', 'Ruby', 'Swift', 'Go', 'Kotlin', 'Lua'];

const randomInteger = (min: number, max: number) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const randomThemes = (count: number, themes: Array<Theme>) => Array.from({length: count}, () => themes[randomInteger(0, themes.length - 1)]);

const randomFormats = () => {
    const formatsValues = Object.values(BookFormat);
    const randomNumber = randomInteger(0, formatsValues.length);
    if(randomNumber === formatsValues.length) {
        return formatsValues;
    }
    
    return [formatsValues[randomNumber]];
};

const users = Array.from({length: COUNT}, (_v, i) => {
    const user: User = {
        id: i + 2,
        login: faker.word.noun(),
        password: faker.word.noun(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
        bio: faker.person.bio(),
        status: statuses[randomInteger(0, statuses.length - 1)],
        branches: randomThemes(randomInteger(0, 3), themes),
        reviewsAmount: randomInteger(0, 10),
        city: cities[randomInteger(0, cities.length - 1)],
        reviews: [],
        orders: [],
        booksInBasket: [],
        favoriteBooks: [],
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        birthdate: faker.date.birthdate({min: 18, max: 80, mode: 'age'}),
        roadmaps: []
    }
    return user;
});

const generateReviews = (count: number) => Array.from({length: count}, (_v, i) => {
    const review: Review = {
        id: i,
        star: randomInteger(0, 5),
        title: faker.lorem.sentence(),
        text: faker.lorem.paragraph(),
        user: users[randomInteger(0, COUNT - 1)],
        positiveVotes: randomInteger(0, 100),
        negativeVotes: randomInteger(0, 100),
        product: randomInteger(0, COUNT - 1)
    }
    return review;
});
 
const reviews = generateReviews(COUNT);

const mockBooks = Array.from({length: COUNT}, (_v, i) => {
    const book: Book = {
        author: faker.person.fullName(),
        book_bindings: randomInteger(0, 1) === 1 ? PaperFormat.HARD : PaperFormat.SOFT,
        book_theme: themes[randomInteger(0, themes.length - 1)].title,
        description: faker.lorem.sentence(),
        id: i,
        isbn: `${randomInteger(100, 999)}-${randomInteger(0, 9)}-${randomInteger(10, 99)}-${randomInteger(100000, 999999)}-${randomInteger(0, 9)}`,
        level: randomInteger(1, 5),
        name: faker.commerce.productName(),
        number_of_pages: randomInteger(100, 1000),
        price: randomInteger(99, 9999),
        programming_language: PROGRAMMING_LANGUAGES[randomInteger(0, PROGRAMMING_LANGUAGES.length - 1)],
        publisher: faker.company.name(),
        quantity: randomInteger(0, 1000),
        review: reviews.filter((review) => review.product === i),
        slug: faker.lorem.slug(),
        theme_category: '',
        translator_choice: faker.person.firstName(),
        year: randomInteger(1990, 2025),
        month: randomInteger(1, 12),
        language: languages[randomInteger(0, languages.length - 1)].language,
        formats: randomFormats()
    }
    return book;
});

const getRandomBooks = () => {
    const divider = randomInteger(3, 7)
    return mockBooks.filter((_v, i) => i % divider === 0).map((book) => book.id);
};

const ownedBooks = getRandomBooks();
const booksInBasket = getRandomBooks();
const favoriteBooks = getRandomBooks();

const personalAccount: User = {
    id: 1,
    login: faker.word.noun(),
    password: faker.word.noun(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    bio: faker.person.bio(),
    status: statuses[randomInteger(0, statuses.length - 1)],
    branches: randomThemes(randomInteger(0, 3), themes),
    reviewsAmount: randomInteger(0, 10),
    city: cities[randomInteger(0, cities.length - 1)],
    reviews: reviews.filter((review) => ownedBooks.some((book) => book === review.product)).map((r) => r.product),
    orders: [],
    booksInBasket: [],
    favoriteBooks: [],
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    birthdate: faker.date.birthdate({min: 18, max: 80, mode: 'age'}),
    roadmaps: []
}

export {mockBooks, users, personalAccount, booksInBasket, favoriteBooks, reviews, BookFormat, FileType, randomInteger, randomFormats};
