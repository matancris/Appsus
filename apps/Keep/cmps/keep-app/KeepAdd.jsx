
import { keepService } from '../../services/keep-service.js'

export class KeepAdd extends React.Component {
    state = {
        value: '',
        keep: keepService.getEmptyKeep()
    }
    elInput = React.createRef();

    componentDidMount() {
        if (this.props.isEdit) {
            const typeNote = this.props.getTypeNote(this.props.keep.type);
            let value = this.props.keep.info[typeNote]
            if (typeNote === 'todos') value = value.map(todo => todo.txt)
            this.setState({ keep: this.props.keep, value: value })
        }
        this.elInput.current.focus();
    }

    onInputChange = (ev) => {
        const value = ev.target.value;
        const type = this.state.keep.type;
        this.setState({ value })
       
        switch (type) {
            case 'NoteTxt': {
                this.setState({ keep: { ...this.state.keep, info: { txt: value } } })
                return;
            }
            case 'NoteVideo':
            case 'NoteAudio':
            case 'NoteImg': {
                this.setState({ keep: { ...this.state.keep, info: { url: value } } })
                return;
            }
            case 'NoteTodos': {
                this.setState({ keep: { ...this.state.keep, info: { todos: this.spliteTodos(value) } } })
                return;
            }
        }

    }

    spliteTodos(value) {
        const todos = value.split(',');
        const todosMap = todos.map(todo => {
            return { txt: todo }
        })
        return todosMap;
    }

    onChange(type) {
        this.setState({ keep: { ...this.state.keep, type: type }, value: this.getPlaceHolder(type) })
    }


    addKeep = () => {
        if (Object.keys(this.state.keep.info).length === 0) return
        this.props.onAddKeep(this.state.keep);
        this.setState({ keep: keepService.getEmptyKeep() })
        this.setState({ value: '' })
    }

    getPlaceHolder(type) {
        switch (type) {
            case 'NoteTxt': {
                return 'Whats in your mind...'
            }
            case 'NoteImg': {
                return 'Enter img URL...'
            }
            case 'NoteVideo': {
                return 'Enter video URL...'
            }
            case 'NoteAudio': {
                return 'Enter audio URL...'
            }
            case 'NoteTodos': {
                return 'Enter cooma seprated list...'
            }
        }
    }

    render() {
        return (
            <div className='keep-add'>
                <div className="keep-add-container">
                    <textarea ref={this.elInput} type="search" className="input-search" value={this.state.value} placeholder={this.getPlaceHolder(this.state.keep.type)} onChange={this.onInputChange} >
                    </textarea>
                    <button onClick={() => this.onChange('NoteTxt')}><i className="fas fa-font text-btn"></i></button>
                    <button onClick={() => this.onChange('NoteImg')}><i className="fas fa-image img-btn"></i></button>
                    <button onClick={() => this.onChange('NoteVideo')}><i className="fab fa-youtube video-btn"></i></button>
                    <button onClick={() => this.onChange('NoteTodos')}><i className="fas fa-list-ul todo-btn"></i></button>
                    <button onClick={() => this.onChange('NoteAudio')}><i className="fas fa-volume-up"></i></button>
                    <button onClick={this.addKeep}><i className="fas fa-plus add-btn"></i></button>
                </div>
            </div>
        )
    }
}
