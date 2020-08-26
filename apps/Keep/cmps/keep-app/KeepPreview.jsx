

import { NoteAudio } from "../notes-app/NoteAudio.jsx"
import { NoteVideo } from "../notes-app/NoteVideo.jsx"
import { NoteImg } from "../notes-app/NoteImg.jsx"
import { NoteMap } from "../notes-app/NoteMap.jsx"
import { NoteTodos } from "../notes-app/NoteTodos.jsx"
import { NoteTxt } from "../notes-app/NoteTxt.jsx"


// var cmpMap = {
//     NoteAudio: <NoteAudio />,
//     NoteVideo: NoteVideo,
//     NoteImg: NoteImg,
//     NoteMap: NoteMap,
//     NoteTodos: NoteTodos,
//     NoteTxt: <NoteTxt />
// }

export class KeepPreview extends React.Component {
    state = {
        // currType: 'NoteTxt'
    }

    DynamicCmp(props) {
        switch ('NoteTxt') {
            case 'NoteAudio':
                return <NoteAudio />
            case 'NoteVideo':
                return <NoteVideo />
            case 'NoteImg':
                return <NoteImg />
            case 'NoteMap':
                return <NoteMap />
            case 'NoteTodos':
                return <NoteTodos />
            case 'NoteTxt':
                {
                    console.log(<NoteTxt />);
                    return <NoteTxt />
                }
            default:
                return <h1>Something went wrong</h1>
        }
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
               <button onClick={() => this.props.onRemove(keep.id)}><i className="fas fa-trash-alt"></i></button>
            </article>
        )
    }
}