import { faker } from '@faker-js/faker';
import themes from './themes.json';
import statuses from './statuses.json';
import Theme from '../types/Theme';
import { User } from '../types/User';
import cities from './cities.json';
import Review from '../types/Review';

const COUNT = 20;

const BookFormat = {
    PAPERBACK: "Печатный",
    ELECTRONIC: "Электронный"
}

const BookFormats = [
    {
        key: 'online',
        name: 'Электронный'
    },
    {
        key: 'paper',
        name: 'Печатный'
    }
];

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
        username: faker.word.noun(),
        password: faker.word.noun(),
        first_name: faker.person.fullName(),
        image: faker.image.avatar(),
        about_self: faker.person.bio(),
        user_status: statuses[randomInteger(0, statuses.length - 1)],
        user_directions: randomThemes(randomInteger(0, 3), themes),
        location: cities[randomInteger(0, cities.length - 1)],
        email: faker.internet.email(),
        phone_number: faker.phone.number(),
        birthdate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        last_name: '',
        is_staff: false,
        is_active: false,
        is_superuser: false
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

/*const mockBooks = Array.from({length: COUNT}, (_v, i) => {
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
        book_language: languages[randomInteger(0, languages.length - 1)].code,
        book_format: BookFormats[randomInteger(0, 1)].key
    }
    return book;
});

const getRandomBooks = () => {
    const divider = randomInteger(3, 7)
    return mockBooks.filter((_v, i) => i % divider === 0).map((book) => book.id);
};

const ownedBooks = getRandomBooks();
const booksInBasket = getRandomBooks();
const favoriteBooks = getRandomBooks();*/

const personalAccount: User = {
    id: 1,
    username: faker.word.noun(),
    password: faker.word.noun(),
    first_name: faker.person.fullName(),
    image: faker.image.avatar(),
    about_self: faker.person.bio(),
    user_status: statuses[randomInteger(0, statuses.length - 1)],
    user_directions: randomThemes(randomInteger(0, 3), themes),
    location: cities[randomInteger(0, cities.length - 1)],
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    birthdate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
    last_name: '',
    is_staff: false,
    is_active: false,
    is_superuser: false
}

export { users, personalAccount, reviews, BookFormat, FileType, randomInteger, randomFormats, BookFormats};
