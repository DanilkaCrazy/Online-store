import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import themes from './themes.json';
import statuses from './statuses.json';
import Theme from '../Theme';
import User from '../User';
import cities from './cities.json';

const COUNT = 20;

const PaperFormat = {
    SOFT: 'Мягкий',
    HARD: 'Твёрдый'
};

const FileType = {
    PDF: 'PDF',
    EPUB: 'EBUP',
    DOC: 'DOC',
    FB2: 'FB2'
};

const randomInteger = (min: number, max: number) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const randomThemes = (count: number, themes: Array<Theme>) => Array.from({length: count}, () => themes[randomInteger(0, themes.length - 1)]);

const users = Array.from({length: COUNT}, (_v, i) => {
    const user: User = {
        id: `fghij${i}`,
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
        birthdate: faker.date.birthdate({min: 18, max: 80, mode: 'age'})
    }
    return user;
});

const generateReviews = (count: number) => Array.from({length: count}, () => ({
    id: nanoid(),
    rating: randomInteger(0, 5),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    user: users[randomInteger(0, COUNT - 1)],
    positiveVotes: randomInteger(0, 100),
    negativeVotes: randomInteger(0, 100),
    bookId: `${randomInteger(0, COUNT - 1)}`
}));
 
const reviews = generateReviews(COUNT);

const mockBooks = Array.from({length: COUNT}, (_v, i) => ({
    id: `${i}`,
    title: faker.commerce.productName(),
    author: faker.person.fullName(),
    cover: faker.image.urlPicsumPhotos(),
    price: randomInteger(99, 9999),
    rating: randomInteger(0, 5),
    canBePaperback: randomInteger(0, 1) === 1,
    paperFormat: randomInteger(0, 1) === 1 ? PaperFormat.HARD : PaperFormat.SOFT,
    fileTypes: Object.values(FileType),
    publisher: faker.company.name(),
    year: randomInteger(1990, 2025),
    month: randomInteger(1, 12),
    pagesAmount: randomInteger(100, 1000),
    isbn: `${randomInteger(100, 999)}-${randomInteger(0, 9)}-${randomInteger(10, 99)}-${randomInteger(100000, 999999)}-${randomInteger(0, 9)}`,
    translator: faker.person.firstName(),
    themes: randomThemes(randomInteger(1, 3), themes),
    deliveryDays: randomInteger(1, 14),
    description: faker.lorem.sentence(),
    reviews: reviews.filter((review) => review.bookId === `${i}`),
    isRecommended: randomInteger(0, 1) === 1
}));

const getRandomBooks = () => {
    const divider = randomInteger(3, 7)
    return mockBooks.filter((_v, i) => i % divider === 0).map((book) => book.id);
};

const ownedBooks = getRandomBooks();
const booksInBasket = getRandomBooks();
const favoriteBooks = getRandomBooks();

const personalAccount: User = {
    id: `abc`,
    login: faker.word.noun(),
    password: faker.word.noun(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    bio: faker.person.bio(),
    status: statuses[randomInteger(0, statuses.length - 1)],
    branches: randomThemes(randomInteger(0, 3), themes),
    reviewsAmount: randomInteger(0, 10),
    city: cities[randomInteger(0, cities.length - 1)],
    reviews: reviews.filter((review) => ownedBooks.some((book) => book === review.bookId)).map((r) => r.bookId),
    orders: [],
    booksInBasket: [],
    favoriteBooks: [],
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    birthdate: faker.date.birthdate({min: 18, max: 80, mode: 'age'})
}

export {mockBooks, users, personalAccount, booksInBasket, favoriteBooks, reviews};
