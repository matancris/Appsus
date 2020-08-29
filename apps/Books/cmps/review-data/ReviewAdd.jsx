
import { bookService } from "../../services/book-service.js"


export class ReviewAdd extends React.Component {
    state = {
        reviewToAdd: bookService.getEmptyReview()
    }


    onInputChange = (ev) => {
        const value = ev.target.type === 'rating' ? +ev.target.value : ev.target.value
        this.setState({ reviewToAdd: { ...this.state.reviewToAdd, [ev.target.name]: value } })
    }

    addReview = (ev) => {
        ev.preventDefault();
        this.props.onAddReview(this.state.reviewToAdd);
        this.setState({reviewToAdd: bookService.getEmptyReview()})
    }

    render() {
        return (
            <div className="review-container">
                <label>Add Review:</label>
                <form className="from-review" onSubmit={ this.addReview }>
                    <input className="full-name-review" name="fullName" value={ this.state.reviewToAdd.fullName }
                        placeholder="Full Name" type="text"
                        onChange={ this.onInputChange } />

                    <input name="rating" value={ this.state.value }
                        min="1" max="5"
                        placeholder="Rate" type="range"
                        onChange={ this.onInputChange } />
                    <label>
                        <input type="date" id="datepicker" name="datepicker"
                            onChange={ this.onInputChange } />
                    </label>

                    <input className="free-text-review" name="txt" value={ this.state.txt }
                        placeholder="Free text" type="text" value={ this.state.reviewToAdd.txt }
                        onChange={ this.onInputChange } />
                    <button className="btn-add-review">Add Review</button>
                </form>
            </div>
        )
    }
}
