import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import themes from './themes.json';
import Theme from '../Theme';
import User from '../User';

const COUNT = 20;

const STATUSES = ['Студент', 'Стажёр', 'Junior', 'Middle', 'Senior'];

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Августь', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

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

const users = Array.from({length: COUNT}, (_v, i) => ({
    id: `fghij${i}`,
    login: faker.word.noun(),
    password: faker.word.noun(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    age: randomInteger(18, 70),
    bio: faker.person.bio(),
    status: STATUSES[randomInteger(0, STATUSES.length - 1)],
    branches: randomThemes(randomInteger(0, 3), themes),
    reviewsAmount: randomInteger(0, 10),
    city: faker.location.city()
}));

const generateReviews = (count: number, bookId: string) => Array.from({length: count}, () => ({
    id: nanoid(),
    rating: randomInteger(0, 5),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    user: users[randomInteger(0, COUNT - 1)],
    positiveVotes: randomInteger(0, 100),
    negativeVotes: randomInteger(0, 100),
    bookId
}));
 
const books = Array.from({length: COUNT}, (_v, i) => ({
    id: `abcde${i}`,
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
    reviews: generateReviews(randomInteger(0, 5), `abcde${i}`),
    isRecommended: randomInteger(0, 1) === 1
}));

const personalAccount: User = {
    id: `abc`,
    login: faker.word.noun(),
    password: faker.word.noun(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    age: randomInteger(18, 70),
    bio: faker.person.bio(),
    status: STATUSES[randomInteger(0, STATUSES.length - 1)],
    branches: randomThemes(randomInteger(0, 3), themes),
    reviewsAmount: randomInteger(0, 10),
    city: faker.location.city()
}

export {books, users, MONTHS, personalAccount};
