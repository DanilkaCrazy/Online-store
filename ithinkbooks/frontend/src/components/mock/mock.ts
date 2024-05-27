import Theme from '../types/Theme';

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

export {  BookFormat, FileType, randomInteger, BookFormats};
