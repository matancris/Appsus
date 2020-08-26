// import { AsideBar } from '../../cmps/AsideBar.jsx'
import { keepService } from './services/keep-service.js'
import { KeepAdd } from './cmps/keep-app/KeepAdd.jsx'
import { KeepList } from './cmps/keep-app/KeepList.jsx'

export class KeepApp extends React.Component {
    state = {
        keeps: [],
        // filterBy: '',
    }

    componentDidMount() {
        this.loadKeeps();
    }

    loadKeeps() {
        keepService.query()
            .then(keeps => {
                this.setState({ keeps })
            })
    }

    addKeep = (keep) => {
        keepService.save(keep).then(()=>{this.loadKeeps()})
    }
    
    removeKeep = (keepId) => {
        keepService.removeKeep(keepId).then(()=>{this.loadKeeps()})
    }

    styleChange = (keepId, color) => {
        keepService.updateColor(keepId, color).then(()=>{this.loadKeeps()})
    }

    copyKeep = (keep) =>{
        keepService.copyKeep(keep).then(()=>{this.loadKeeps()})
    }

    render() {
        const keepsToShow = this.state.keeps;
        return (
            <section className="keep-app">
                <div className="align-center-text">
                    <KeepAdd onAddKeep={this.addKeep} />
                    <KeepList keeps={keepsToShow} onRemove={this.removeKeep} onStyleChange={this.styleChange} onCopy={this.copyKeep}/>
                </div>
            </section>
        )
    }
}


// onSetFilter = (filterBy) => {
    //     this.setState({ filterBy });
    //     this.loadBooks();
    // }


    // getKeepsForDisplay() {
    //     const books = this.state.books.filter(book => book.title.toLowerCase().includes(this.state.filterBy.toLowerCase()))
    //     return books;
    // }

    // onAddKeep = (newKeep) => {
    //     bookService.addBook(newBook).then(() => this.loadBooks());
    // }


// render() {
//     const booksToShow = this.getBooksForDisplay();
//     return (
//         <section className="book-app">
//             <div className="books slide-in-elliptic-right-bck">
//                 <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
//                 <AddBook addBook={this.onAddBook} />
//                 <BookList books={booksToShow} />
//             </div>
//         </section>
//     )
// }
// }

