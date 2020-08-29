const { Link } = ReactRouterDOM
import { LongTxt } from '../Books/cmps/book-app/LongTxt.jsx'
import { bookService } from '../Books/services/book-service.js'
import { ReviewAdd } from '../Books/cmps/review-data/ReviewAdd.jsx';
import { ReviewList } from '../Books/cmps/review-data/ReviewList.jsx';

export class BookDetails extends React.Component {
    state = {
        book: null,
        prevBookId: '',
        nextBookId: ''
    }

    componentDidMount() {
        this.loadBook()
    }

    loadBook = () => {
        const bookId = this.props.match.params.bookId;
        bookService.getBookById(bookId)
            .then(book => {
                this.setState({ book })
            })
        bookService.getNextPrev(bookId)
            .then((res) => {
                this.setState({ prevBookId: res.prevBookId, nextBookId: res.nextBookId })
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    getPageCount(pageCount) {
        if (pageCount > 500) return 'Long reading';
        else if (pageCount > 200) return 'Decent Reading'
        else return 'Light Reading'
    }

    getPublishedDate(publishDate) {
        const year = new Date().getFullYear();
        if (year - publishDate > 10) return 'Veteran Book';
        else if (year - publishDate < 1) return 'New!'
        else return '';
    }

    getClassNameByPrice(price) {
        if (price > 150) return 'red'
        else if (price < 20) return 'green'
        else return 'blue'
    }


    addReview = (review) => {
        const bookId = this.state.book.id;
        bookService.addReview(bookId, review).then(this.loadBook)
    }

    removeReview(bookId, reviewId) {
        bookService.removeReview(bookId, reviewId)
    }

    getCurrency(currency) {
        switch (currency) {
            case 'EUR': {
                return '€'
            }
            case 'ILS': {
                return '₪'
            }
            case 'USD': {
                return '$'
            }
            default: {
                return ''
            }
        }
    }
    render() {
        const { book } = this.state;
        if (!book) return <div>Loading....</div>
        const { nextBookId } = this.state
        const { prevBookId } = this.state
        return (
            <section className="book-details slide-in-fwd-tr">
                <div className="book-preview"  >
                    <img src={book.thumbnail} />
                    <div className="book-data">
                        <h2>{book.title}</h2>
                        <label>{book.authors}</label>
                        <h3>{book.subtitle}</h3>
                        <h3>{this.getPageCount(book.pageCount)}</h3>
                        <h5 className="currency-title">{book.listPrice.amount} {this.getCurrency(book.listPrice.currencyCode)} </h5>
                        <p >{this.getPublishedDate(book.publishDate)}</p>
                        {book.listPrice.isOnSale && <h5 className="sale-title">Sale</h5>}
                        <LongTxt text={book.description} />
                    </div>
                </div>
                <div className="book-details-pager">
                    <Link to={`/book/${prevBookId}`}><i className="fas fa-arrow-left"></i>Prev</Link>
                    <Link to={`/book/${nextBookId}`}>Next<i className="fas fa-arrow-right"></i></Link>
                </div>

                <div className="review">
                    {book.reviews && <ReviewList reviews={book.reviews} bookId={book.id} remove={this.removeReview} />}
                    <ReviewAdd onAddReview={this.addReview} />
                </div>

            </section>
        )
    }
}
// onRemove={bookService.removeReview}