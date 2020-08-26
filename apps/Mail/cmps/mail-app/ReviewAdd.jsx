import { bookService } from '../../services/book-service.js'

export class ReviewAdd extends React.Component {

    state = {
        review: {
            fullName: '',
            rate: 0,
            date: '',
            text: ''
        }
    }


    elInput = React.createRef()
    
    componentDidMount() {
        // const { id } = this.props.bookId
        // bookService.getById(id).then(book => this.setState({ book }))
        this.elInput.current.focus()
    }

    onInputChange = (ev) => {
        this.setState(
            {
                review: { ...this.state.review, [ev.target.name]: ev.target.value }
            }
        )
    }
  
    submitReview = (ev) => {
        ev.preventDefault();
       this.props.onAddReview(this.state.review)
    }

    render() {
        return (
            <div>
                <form className="review-form" onSubmit={this.submitReview}>
                <h4>rate this book!</h4>
                    <input ref={ this.elInput } name="fullName" type="text" placeholder="Enter your full name" onChange={this.onInputChange} />
                    <select name="rate" id="" className="rating-drop" onChange={this.onInputChange}>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>
                    <input name="date" type="date" onChange={this.onInputChange} />
                    <textarea name="text" id="" cols="30" rows="10" placeholder="write your review here" onChange={this.onInputChange}></textarea>
                    <button className="review-btn">submit</button>
                </form>
            </div>
        )
    }
}
