

import { NoteAudio } from "../notes-app/NoteAudio.jsx"
import { NoteVideo } from "../notes-app/NoteVideo.jsx"
import { NoteImg } from "../notes-app/NoteImg.jsx"
import { NoteMap } from "../notes-app/NoteMap.jsx"
import { NoteTodos } from "../notes-app/NoteTodos.jsx"
import { NoteTxt } from "../notes-app/NoteTxt.jsx"

import { KeepEdit } from "./KeepEdit.jsx"


export class KeepPreview extends React.Component {
    state = {
        isEdit: false
    }

    componentDidMount() { }

    cmpMap = {
        NoteAudio: NoteAudio,
        NoteVideo: NoteVideo,
        NoteImg: NoteImg,
        NoteMap: NoteMap,
        NoteTodos: NoteTodos,
        NoteTxt: NoteTxt
    }

    onEditKeep = (keep) => {
        this.setState({ isEdit: true })
        this.props.onEditKeep(keep);

    }

    onUnEditKeep = () => {
        this.setState({ isEdit: false })
    }

    typeButton = (keep) => {
        switch (keep.type) {
            case 'NoteTxt': {
                return (<h3 className="type-keep"><i className="fas fa-font btn-type"></i></h3>)
            }
            case 'NoteVideo': {
                return (<h3 className="type-keep"><i className="fab fa-youtube"></i></h3>)
            }
            case 'NoteImg': {
                return (<h3 className="type-keep"><i className="fas fa-image"></i></h3>)
            }
            case 'NoteTodos': {
                return (<h3 className="type-keep"><i className="fas fa-list-ul"></i></h3>)
            }
            case 'NoteAudio': {
                return (<h3 className="type-keep"><i className="fas fa-volume-up"></i></h3>)
            }
        }
    }

    render() {
        const { keep } = this.props
        const DynamicCmp = this.cmpMap[keep.type];
        return (
            <article onMouseOut={this.onUnEditKeep} style={keep.style} className={`keep-preview ${(keep.type === 'NoteImg' || keep.type === 'NoteVideo') ? "img" : ""}`}>
                {this.typeButton(keep)}
                <DynamicCmp doneNote={false} keep={keep} getTypeNote={this.props.getTypeNote}/>
                <KeepEdit keep={keep} onRemove={this.props.onRemove} onStyleChange={this.props.onStyleChange}
                    onCopy={this.props.onCopy} onPin={this.props.onPin} isEditOn={this.state.isEdit}
                     isDetailsOn={false} onEdit={this.onEditKeep}  getTypeNote={this.props.getTypeNote}/>
            </article>
        )
    }
}

