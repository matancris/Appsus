
const { Link } = ReactRouterDOM
export function BookPreview({ book }) {
    var currency;

    switch (book.listPrice.currencyCode) {
        case 'EUR': {
            currency = '€'
            break;
        }
        case 'ILS': {
            currency = '₪'
            break;
        }
        case 'USD': {
            currency = '$'
            break;
        }
        default: {
            currency = ''
            break;
        }
    }

    return (
        <Link to={`/book/${book.id}`}>
            <article className="book-details">
                <img src={book.thumbnail} />
                <h3 className="book-title">{book.title}</h3>
                <h5>{book.listPrice.amount} {currency} </h5>
            </article>
        </Link>
    )
}