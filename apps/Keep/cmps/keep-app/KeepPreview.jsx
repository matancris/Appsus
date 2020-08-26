

import { NoteAudio } from "../notes-app/NoteAudio.jsx"
import { NoteVideo } from "../notes-app/NoteVideo.jsx"
import { NoteImg } from "../notes-app/NoteImg.jsx"
import { NoteMap } from "../notes-app/NoteMap.jsx"
import { NoteTodos } from "../notes-app/NoteTodos.jsx"
import { NoteTxt } from "../notes-app/NoteTxt.jsx"

import {KeepEdit} from "./KeepEdit.jsx"


export class KeepPreview extends React.Component {
    state = {
        // currType: 'NoteTxt'
    }

    cmpMap = {
        NoteAudio: NoteAudio,
        NoteVideo: NoteVideo,
        NoteImg: NoteImg,
        NoteMap: NoteMap,
        NoteTodos: NoteTodos,
        NoteTxt: NoteTxt
    }

    render() {
        const { keep } = this.props
        const DynamicCmp = this.cmpMap[keep.type];
        return (
            <article style={keep.style} className="keep-preview">
               <DynamicCmp keep={keep}/>
               <KeepEdit keep={keep} onRemove={this.props.onRemove} onStyleChange={this.props.onStyleChange} onCopy={this.props.onCopy}/>
            </article>
        )
    }
}