
import { keepService } from '../../services/keep-service.js'

export class KeepAdd extends React.Component {
    state = {
        value: '',
        keep: keepService.getEmptyKeep()
    }

    componentDidMount() {

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
            case 'NoteTodos': {
                return 'Enter cooma seprated list...'
            }
        }
    }



    render() {
        const { keep } = this.state.keep
        return (
            <div >
                <div className='keep-add'>
                    <div className="keep-add-container">
                        <input type="search" value={this.state.value} placeholder={this.getPlaceHolder(this.state.keep.type)} onChange={this.onInputChange} />
                        <button onClick={this.onTextChoose}><i className="fas fa-font"></i></button>
                        <button onClick={this.onImgChoose}><i className="fas fa-image"></i></button>
                        <button onClick={this.onVideoChoose}><i className="fab fa-youtube"></i></button>
                        <button onClick={this.onTodosChoose}><i className="fas fa-list-ul"></i></button>
                        <button onClick={this.addKeep}><i className="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

