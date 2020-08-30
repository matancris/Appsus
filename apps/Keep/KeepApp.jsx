// import { AsideBar } from '../../cmps/AsideBar.jsx'
import { keepService } from './services/keep-service.js'
import { KeepAdd } from './cmps/keep-app/KeepAdd.jsx'
import { KeepList } from './cmps/keep-app/KeepList.jsx'
import { KeepFilter } from './cmps/keep-app/KeepFilter.jsx'
import { KeepDetails } from './cmps/keep-app/KeepDetails.jsx'
import { Modal } from './cmps/Modal.jsx'
import eventBus from '../../service/event-bus-service.js'


export class KeepApp extends React.Component {
    state = {
        keeps: [],
        filterBy: 'All',
        filterByTxt: '',
        selectedKeep: null
    }

    componentDidMount() {
        const mailToKeep = new URLSearchParams(window.location.href).get('mail');
        if (mailToKeep) {
            let keep = keepService.getEmptyKeep()
            keep.info.txt = mailToKeep;
            keepService.save(keep)
            .then(() =>{this.loadKeeps()})
            .then(() => this.setState({selectedKeep: keep}))
        }
        else this.loadKeeps();
    }

    loadKeeps = () => {
        keepService.query()
            .then(keeps => {
                this.setState({ keeps })
            })
    }

    addKeep = (keep) => {
        if (!keep) return;
        keepService.save(keep)
        .then(() => { 
            eventBus.emit('notify', { msg: 'keep added!'})
            this.loadKeeps() 
        })
    }

    saveKeep = (keep) => {
        keepService.save(keep).then(() => {
            eventBus.emit('notify', { msg: 'changes saved!'})
             this.loadKeeps()
             })
    }

    removeKeep = (keepId) => {
        keepService.removeKeep(keepId).then(() => {
            eventBus.emit('notify', { msg: 'keep have been removed!'})
             this.loadKeeps()
             })
    }

    styleChange = (keepId, color) => {
        keepService.updateColor(keepId, color).then(() => { this.loadKeeps() })
    }

    copyKeep = (keep, ev) => {
        ev.stopPropagation();
        keepService.copyKeep(keep).then(() => { this.loadKeeps() })
    }

    keepPin = (keep, ev) => {
        ev.stopPropagation();
        keepService.keepPin(keep).then(() => { this.loadKeeps() })
    }

    setFilter = (type, byTxt = false) => {
        if (!byTxt) this.setState({ filterBy: type });
        else this.setState({ filterByTxt: type });
        this.loadKeeps();
    }


    getKeepsForDisplay() {
        let keeps = this.state.keeps.filter(keep => keep.isPinned === false);
        if (this.state.filterByTxt !== '') {
            keeps = keeps.filter(keep => {
                if (keep.type === "NoteTxt")
                    return keep.info.txt.toLowerCase().includes(this.state.filterByTxt.toLowerCase())
            })
        }
        else {
            if (this.state.filterBy === 'All') return keeps;
            keeps = this.state.keeps.filter(keep => keep.type === this.state.filterBy)
        }
        return keeps;
    }

    getKeepsPins() {
        const keepsPin = this.state.keeps.filter(keep => keep.isPinned === true)
        return keepsPin;
    }

    editKeep = (keep) => {
        this.setState({ selectedKeep: keep })
    }

    unSelectedKeep = () => {
        this.setState({ selectedKeep: null })
    }

    doneNote = (keep, todoIdx) => {
        keepService.doneNote(keep.id, todoIdx).then(() => { this.loadKeeps() })
    }


    getTypeNote(type) {
        switch (type) {
            case 'NoteTxt': {
                return 'txt'
            }
            case 'NoteImg':
            case 'NoteAudio':
            case 'NoteVideo': {
                return 'url'
            }
            case 'NoteTodos': {
                return 'todos'
            }
        }
    }

    render() {
        const keepsToShow = this.getKeepsForDisplay();
        const pinKeeps = this.getKeepsPins();
        const { selectedKeep } = this.state;
        return (
            <section id="keep-up" className="keep-app scale-in-hor-right align-center-text">
                <KeepAdd isEdit={false} onAddKeep={this.addKeep} getTypeNote={this.getTypeNote} />
                <KeepFilter onSetFilter={this.setFilter} />
                <div className="container-lists" >
                    <KeepList ispins={true} keeps={pinKeeps} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} doneNote={this.doneNote} 
                        getTypeNote={this.getTypeNote} />
                    <hr />

                    <KeepList ispins={false} keeps={keepsToShow} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} getTypeNote={this.getTypeNote}/>

                    {selectedKeep && <Modal unSelectedKeep={this.unSelectedKeep} selectedKeep={selectedKeep} ispins={false} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} onLoadKeep={this.loadKeeps}
                        saveKeep={this.saveKeep} doneNote={this.doneNote} loadKeeps={this.loadKeeps} getTypeNote={this.getTypeNote} />}
                </div>
            </section>
        )
    }
}
