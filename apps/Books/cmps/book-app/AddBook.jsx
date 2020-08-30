

import { bookService } from '../../services/book-service.js' 
import { ModalSearch } from '../ModalSearch.jsx'



export class AddBook extends React.Component {
    state = {
        name: '',
        options: []
    }

    onInputChange = () => {
        if(event.target.value=== '') {
            this.setState({ name:'' , options: []})
            return;
        }
        this.setState({ name: event.target.value }, this.loadOptions);

    }

    loadOptions = () => {
        if (this.state.name === '') return;
        bookService.getBoooksFromApi(this.state.name)
            .then(res => res.items.map(item => item))
            .then(items => this.setState({ options: items }))
    }

    addBook = (option) => {
        this.setState({ name:'' , options: []})
        this.props.addBook(option);
    }

    render() {
        const isShown = this.state.options.length === 0 ? false: true;
        return (
            <section className="add-book">  
                <input className="book-search" type="search" value={this.state.name} placeholder="Add Book" onChange={this.onInputChange} />
                {isShown &&  <ModalSearch options={this.state.options} onAddBook={this.addBook} />}
                </section>
        )
    }
}