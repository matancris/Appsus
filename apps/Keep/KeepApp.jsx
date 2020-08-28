// import { AsideBar } from '../../cmps/AsideBar.jsx'
import { keepService } from './services/keep-service.js'
import { KeepAdd } from './cmps/keep-app/KeepAdd.jsx'
import { KeepList } from './cmps/keep-app/KeepList.jsx'
import { KeepFilter } from './cmps/keep-app/KeepFilter.jsx'
import { Modal } from './cmps/Modal.jsx'
import eventBus from '../../service/event-bus-service.js'

export class KeepApp extends React.Component {
    state = {
        keeps: [],
        filterBy: 'All',
        selectedKeep: null
    }

    componentDidMount() {
        this.loadKeeps();
    }

    loadKeeps = () => {
        keepService.query()
            .then(keeps => {
                this.setState({ keeps })
            })
    }

    addKeep = (keep) => {
        if (!keep) return;
        keepService.save(keep).then(() => { this.loadKeeps() })
    }

    saveKeep = (keep) => {
        keepService.save(keep).then(() => { this.loadKeeps() })
    }

    removeKeep = (keepId) => {
        keepService.removeKeep(keepId).then(() => { this.loadKeeps() })
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
        this.setState({ selectedKeep: keep })
    }

    unSelectedKeep = () => {
        this.setState({ selectedKeep: null })
    }

    doneNote = (keep, todoIdx) => {
        keepService.doneNote(keep.id, todoIdx).then(() => { this.loadKeeps() })
    }

    render() {
        const keepsToShow = this.getKeepsForDisplay();
        const pinKeeps = this.getKeepsPins();
        const { selectedKeep } = this.state;
        return (
            <section className="keep-app scale-in-hor-right align-center-text">
                <KeepAdd isEdit={false} onAddKeep={this.addKeep} />
                <KeepFilter onSetFilter={this.setFilter} />
                <div>

                    <KeepList ispins={true} keeps={pinKeeps} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} doneNote={this.doneNote} />
                    <hr />

                    <KeepList ispins={false} keeps={keepsToShow} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} />

                    {selectedKeep && <Modal unSelectedKeep={this.unSelectedKeep} selectedKeep={selectedKeep} ispins={false} onRemove={this.removeKeep} onStyleChange={this.styleChange}
                        onCopy={this.copyKeep} onPin={this.keepPin} onEditKeep={this.editKeep} onLoadKeep={this.loadKeeps}
                        saveKeep={this.saveKeep} doneNote={this.doneNote} loadKeeps={this.loadKeeps} />}
                </div>
            </section>
        )
    }
}
