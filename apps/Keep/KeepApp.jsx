// import { AsideBar } from '../../cmps/AsideBar.jsx'
import { keepService } from './services/keep-service.js'
import { KeepAdd } from './cmps/keep-app/KeepAdd.jsx'
import { KeepList } from './cmps/keep-app/KeepList.jsx'
import { KeepFilter } from './cmps/keep-app/KeepFilter.jsx'
import { Modal } from './cmps/Modal.jsx'

export class KeepApp extends React.Component {
    state = {
        keeps: [],
        filterBy: 'All',
        selectedKeep: null
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
        if (!keep) return;
        keepService.save(keep).then(() => { this.loadKeeps() })
    }

    removeKeep = (keepId,ev) => {
        ev.stopPropagation();
        keepService.removeKeep(keepId).then(() => { this.loadKeeps() })
    }

    styleChange = (keepId, color) => {
        keepService.updateColor(keepId, color).then(() => { this.loadKeeps() })
    }

    copyKeep = (keep,ev) => {
        ev.stopPropagation();
        keepService.copyKeep(keep).then(() => { this.loadKeeps() })
    }

    keepPin = (keep,ev) => {
        ev.stopPropagation();
        keepService.keepPin(keep).then(() => { this.loadKeeps() })
    }

    setFilter = (type) => {
        this.setState({ filterBy: type });
        this.loadKeeps();
    }


    getKeepsForDisplay() {
        let keeps = this.state.keeps.filter(keep => keep.isPinned === false);
        if (this.state.filterBy === 'All') return keeps;
        keeps = this.state.keeps.filter(keep => keep.type === this.state.filterBy)
        return keeps;
    }

    getKeepsPins() {
        const keepsPin = this.state.keeps.filter(keep => keep.isPinned === true)
        return keepsPin;
    }

    editKeep = (keep) => {
        console.log(keep);
        this.setState({ selectedKeep: keep })
    }

    unSelectedKeep = () => {
        this.setState({ selectedKeep: null })
    }

    render() {
        const keepsToShow = this.getKeepsForDisplay();
        const pinKeeps = this.getKeepsPins();
        const { selectedKeep } = this.state;
        return (
            <section className="keep-app">
                <div className="align-center-text">
                    <KeepFilter onSetFilter={this.setFilter} />
                    <KeepAdd onAddKeep={this.addKeep} />
                    <KeepList ispins={true} keeps={pinKeeps} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} />
                    <hr />

                    <KeepList ispins={false} keeps={keepsToShow} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} />
                    {selectedKeep && <Modal unSelectedKeep = {this.unSelectedKeep} selectedKeep={selectedKeep} ispins={false} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} />}
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

