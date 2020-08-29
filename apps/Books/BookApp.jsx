// const { Link } = ReactRouterDOM

import { bookService } from '../Books/services/book-service.js'
import { BookFilter } from '../Books/cmps/book-app/BookFilter.jsx'
import { BookList } from '../Books/cmps/book-app/BookList.jsx';
import { AddBook } from '../Books/cmps/book-app/AddBook.jsx';

export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: '',
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks() {
        bookService.query()
            .then(books => {
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
        this.loadBooks();
    }

    getBooksForDisplay() {
        const books = this.state.books.filter(book => book.title.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        return books; 
    }

    onAddBook = (newBook) => {
        bookService.addBook(newBook).then(()=>this.loadBooks());
    }

    render() {
        const booksToShow = this.getBooksForDisplay();
        return (
            <section className="book-app">
                <div className="books scale-in-hor-right">
                    <div className="search-add flex justify-center">
                    <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                    <AddBook addBook={this.onAddBook} />
                    </div>
                    <BookList books={booksToShow} />
                </div>
            </section>
        )
    }
}

