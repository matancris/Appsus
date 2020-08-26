import { bookService } from '../../services/book-service.js'
import {Modal} from '../Modal.jsx'

export class BookAdd extends React.Component {

    state = {
        currTitle: '',
        books: []
    }

    onInputChange = (ev) => {
        this.setState({ currTitle: ev.target.value }, () => {
            // this runs after setState completed
            bookService.getBooksFromAPI(this.state.currTitle)
                .then(books => { this.setState({ books }) })          
        })
    }

    addBook = (book) => {
        this.setState({currTitle: ''})
        this.props.onAddBook(book)
    }


    render() {
        const { books } = this.state
        if (!books) return <h2>loading...</h2>
        return (
            <div>
                <h3>Add Book</h3>
                <input value = {this.state.currTitle} type="text" onChange={this.onInputChange} placeholder="search for a book"></input>
                <Modal isShown={this.state.currTitle}>
                <ul>
                    {books.map(book => {
                        return <div className="book-in-search">
                            <p>{book.volumeInfo.title}</p>
                            <button className="add-book-btn" onClick= {() => this.addBook(book)}>+</button>
                        </div>
                    })
                    }
                </ul>
                </Modal>
            </div >
        )
    }
}
