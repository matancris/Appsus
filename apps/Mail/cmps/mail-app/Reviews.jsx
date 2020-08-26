


export function Reviews(props) {
    if (!props.book.reviews) return 'Be the first one to give a review!'
        return (
            <ul className="review-container">
                {props.book.reviews.map((review) =>
                    <li>
                        <h2>{'⭐'.repeat(review.rate)}</h2>
                        <p>"{review.text}"</p>
                        <span>{review.date}</span>
                        <span>{review.fullName}</span>
                    </li>)
                }

            </ul>
        )
}