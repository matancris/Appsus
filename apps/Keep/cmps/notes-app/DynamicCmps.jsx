import { NoteAudio } from "./NoteAudio.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteMap } from "./NoteMap.jsx"
import { NoteTodos } from "./NoteTodos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"



function DynamicCmp(props) {
    switch (props.currView) {
        case 'NoteAudio':
            return <NoteAudio {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteMap':
            return <NoteMap {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        case 'NoteTxt':
            return <NoteTxt {...props} />
        default:
            return <h1>Something went wrong</h1>
    }
}

var cmpMap = {
    NoteAudio: NoteAudio,
    NoteVideo: NoteVideo,
    NoteImg: NoteImg,
    NoteMap: NoteMap,
    NoteTodos: NoteTodos,
    NoteTxt: NoteTxt
}


export class DynamicCmps extends React.Component {
    state = {
        currView: 'NoteTxt'
    }

    toggleView = newView => {
        this.setState({ currView: newView })
    }

    render() {
        const { currView } = this.state
        const DynamicCmp = cmpMap[currView]
        return (<main>
            <button onClick={() => this.toggleView('NoteAudio')} >Audio</button>
            <button onClick={() => this.toggleView('NoteVideo')} >Video</button>
            <button onClick={() => this.toggleView('NoteImg')} >Img</button>
            <button onClick={() => this.toggleView('NoteMap')} >Map</button>
            <button onClick={() => this.toggleView('NoteTodos')} >Todos</button>
            <button onClick={() => this.toggleView('NoteTxt')} >Txt</button>
            <DynamicCmp currView={currView} />
        </main>)
    }
}
