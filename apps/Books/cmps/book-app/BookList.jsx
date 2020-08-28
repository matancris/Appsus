
import { BookPreview } from 'BookPreview.jsx'

export function BookList(props) {
    return (<section>
        <ul className="book-list">
            {
                props.books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                    </li>
                )
            }
        </ul>
    </section>
    )
}


