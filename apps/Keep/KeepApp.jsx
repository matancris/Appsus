import { AsideBar } from '../../cmps/AsideBar.jsx'
import { keepService } from './services/keep-service.js'
import { KeepEdit } from './cmps/keep-app/KeepEdit.jsx'
import { KeepList } from './cmps/keep-app/KeepList.jsx'
import { DynamicCmps } from './cmps/notes-app/DynamicCmps.jsx'


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
                console.log(keeps);
                this.setState({ keeps })
            })
    }

    addKeep = (keep) => {
        keepService.save(keep).then(()=>{this.loadKeeps()})
    }
    
    removeKeep = (keepId) => {
        console.log('on app remove');
        console.log(keepId);
        keepService.removeKeep(keepId).then(()=>{this.loadKeeps()})
    }

    render() {
        const keepsToShow = this.state.keeps;
        return (
            <section className="keep-app flex">
                <AsideBar />
                <div>
                    <h2>Keep App</h2>
                    <KeepEdit onAddKeep={this.addKeep} />
                    <KeepList keeps={keepsToShow} onRemove={this.removeKeep}/>
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

