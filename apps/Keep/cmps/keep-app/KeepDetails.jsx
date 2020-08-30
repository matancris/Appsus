

import { NoteAudio } from "../notes-app/NoteAudio.jsx"
import { NoteVideo } from "../notes-app/NoteVideo.jsx"
import { NoteImg } from "../notes-app/NoteImg.jsx"
import { NoteMap } from "../notes-app/NoteMap.jsx"
import { NoteTodos } from "../notes-app/NoteTodos.jsx"
import { NoteTxt } from "../notes-app/NoteTxt.jsx"

import { KeepEdit } from "./KeepEdit.jsx"
    import { KeepAdd } from "./KeepAdd.jsx"

import { keepService } from '../../services/keep-service.js'

export class KeepDetails extends React.Component {
    state = {
        keep: null,
    }

    componentDidMount() {
        const mailToKeep = new URLSearchParams(window.location.href).get('mail');
     if (mailToKeep) {
        this.setState({ keep: this.props.keep })
     }
        this.setState({ keep: this.props.keep })
        this.loadKeep();
    }

    loadKeep = () => {
        if (!this.state.keep) return;
        keepService.getKeepById(this.state.keep.id)
            .then(_keep => {
                this.setState({ keep: _keep })
            })
    }

    cmpMap = {
        NoteAudio: NoteAudio,
        NoteVideo: NoteVideo,
        NoteImg: NoteImg,
        NoteMap: NoteMap,
        NoteTodos: NoteTodos,
        NoteTxt: NoteTxt
    }

    doneNote = (keep, todoIdx) => {
        keepService.doneNote(keep.id, todoIdx).then(() => { this.loadKeep() })
    }

    changeStyle(keepId, color) {
        keepService.updateColor(keepId, color).then(() => { this.loadKeep() })
    }

    removeOnDetails = () => {
        this.props.onCloseModal();
    }

    render() {
        const { keep } = this.state
        if (!keep) return <div>Loading....</div>
        const DynamicCmp = this.cmpMap[keep.type];
        return (
            <article style={keep.style} className={`keep-details flex column space-between ${(keep.type === 'NoteImg' || keep.type === 'NoteVideo') ? "img" : ""}`}>
                <DynamicCmp keep={keep} doneNote={this.doneNote} loadKeep={this.loadKeep} getTypeNote={this.props.getTypeNote}/>
                <div className="edit-all-details">
                    <KeepEdit keep={keep} onRemove={this.props.onRemove} onStyleChange={this.onStyleChange}
                        onCopy={this.props.onCopy} onPin={this.props.onPin} isDetailsOn={true}
                        onStyleChange={this.props.onStyleChange} onLoadKeep={this.props.loadKeeps}
                        loadKeep={this.loadKeep} changeStyleDetails={this.changeStyle} 
                        removeOnDetails={this.removeOnDetails}  getTypeNote={this.props.getTypeNote}/>
                    <KeepAdd isEdit={true} keep={keep} onAddKeep={this.props.saveKeep} loadKeep={this.loadKeep} 
                    getTypeNote={this.props.getTypeNote} />
                </div>
            </article>
        )
    }
}