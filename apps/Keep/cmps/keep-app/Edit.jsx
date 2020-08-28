
import { keepService } from '../../services/keep-service.js'

export class Edit extends React.Component {
    state = {
        value: '',
        keep: null
    }

    componentDidMount() {
        this.setState({ keep: this.props.keep, value: this.getPlaceHolder(this.props.keep.type) })
    }

    onInputChange = (ev) => {
        ev.stopPropagation();
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
        this.setState({ keep: { ...this.state.keep, type: 'NoteTxt' } })
    }


    onImgChoose = () => {
        this.setState({ keep: { ...this.state.keep, type: 'NoteImg' } })
    }

    onVideoChoose = () => {
        this.setState({ keep: { ...this.state.keep, type: 'NoteVideo' } })
    }

    onTodosChoose = () => {
        this.setState({ keep: { ...this.state.keep, type: 'NoteTodos' } })
    }


    addKeep = () => {
        if (Object.keys(this.state.keep.info).length === 0) return
        this.props.onAddKeep(this.state.keep);
        this.setState({ keep: keepService.getEmptyKeep() })
        this.setState({ value: '' })
    }

    getPlaceHolder(type) {
        if (!this.state.keep) return;
        switch (type) {
            case 'NoteTxt': {
                return `${this.state.keep.info.txt}`
            }
            case 'NoteImg': {
                return `${this.state.keep.info.url}`
            }
            case 'NoteVideo': {
                return `${this.state.keep.info.url}`
            }
            case 'NoteTodos': {
                return `${this.state.keep.info.todos}`
            }
        }
    }


    render() {
        if (!this.state.keep) return <h1>'loading...'</h1>
        return (
            <div className="">
                <input type="text" value={this.state.value} placeholder={this.getPlaceHolder(this.props.keep.type)} onChange={this.onInputChange} />
                <button onClick={this.saveChanges}>Save</button>
            </div>
        )
    }
}

