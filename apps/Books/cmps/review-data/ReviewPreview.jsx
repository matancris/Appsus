
export function ReviewPreview({ review }) {

    function ratingStar() {
        const stars = '⭐'.repeat(review.rating);
        return stars;
    }

    return (
        <article className="review-details">
            <h5>
                {review.fullName}
            </h5>
            <label>
                {ratingStar()}
            </label>
            <h5>
                {review.datepicker}
            </h5>
            <p>
                {review.txt}
            </p>
        </article>
    )
}

// { fullName: '', rating: 1 , datepicker: '', txt: ''};
