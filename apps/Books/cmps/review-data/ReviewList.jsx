
import { ReviewPreview } from 'ReviewPreview.jsx'

export function ReviewList(props) {


    return (<section>
        <ul className="review-list">
            {
                props.reviews.map((review) =>
                    <li key={review.id}>
                        <ReviewPreview review={review} />
                        {/* <button onClick={() => props.remove(props.bookId,review.id)}>x</button> */}
                    </li>
                )
            }
        </ul>
    </section>
    )
}

