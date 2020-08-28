
import { keepService } from '../../services/keep-service.js'

export class KeepAdd extends React.Component {
    state = {
        value: '',
        keep: keepService.getEmptyKeep()
    }

    componentDidMount() {
        if (this.props.isEdit) {
            const typeNote = this.getTypeNote(this.props.keep.type);
            let value = this.props.keep.info[typeNote]
            if (typeNote === 'todos') value = value.map(todo => todo.txt)
            this.setState({ keep: this.props.keep, value: value })
        }
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

    onTextChoose = () => {
        this.setState({ keep: { ...this.state.keep, type: 'NoteTxt' }, value: this.getPlaceHolder('NoteTxt') })
    }


    onImgChoose = () => {
        this.setState({ keep: { ...this.state.keep, type: 'NoteImg' }, value: this.getPlaceHolder('NoteImg') })
    }

    onVideoChoose = () => {
        this.setState({ keep: { ...this.state.keep, type: 'NoteVideo' }, value: this.getPlaceHolder('NoteVideo') })
    }

    onTodosChoose = () => {
        this.setState({ keep: { ...this.state.keep, type: 'NoteTodos' }, value: this.getPlaceHolder('NoteTodos') })
    }


    addKeep = () => {
        if (Object.keys(this.state.keep.info).length === 0) return
        this.props.onAddKeep(this.state.keep);
        this.setState({ keep: keepService.getEmptyKeep() })
        this.setState({ value: '' })
    }

    getTypeNote(type) {
        switch (type) {
            case 'NoteTxt': {
                return 'txt'
            }
            case 'NoteImg':
            case 'NoteVideo': {
                return 'url'
            }
            case 'NoteTodos': {
                return 'todos'
            }
        }
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
            case 'NoteTodos': {
                return 'Enter cooma seprated list...'
            }
        }
    }

    render() {
        const { keep } = this.state.keep
        return (
                <div className='keep-add'>
                    <div className="keep-add-container">
                        <input type="search" className="input-search" value={this.state.value} placeholder={this.getPlaceHolder(this.state.keep.type)} onChange={this.onInputChange} />
                        <button onClick={this.onTextChoose}><i className="fas fa-font text-btn"></i></button>
                        <button onClick={this.onImgChoose}><i className="fas fa-image img-btn"></i></button>
                        <button onClick={this.onVideoChoose}><i className="fab fa-youtube video-btn"></i></button>
                        <button onClick={this.onTodosChoose}><i className="fas fa-list-ul todo-btn"></i></button>
                        <button onClick={this.addKeep}><i className="fas fa-plus add-btn"></i></button>
                    </div>
            </div>
        )
    }
}

