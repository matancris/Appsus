
import { Color } from '../Color.jsx'
import { KeepAdd } from './KeepAdd.jsx'

export class KeepEdit extends React.Component {
    state = {
        colorsIsShown: false,
        isEdit: false
    }
    componentDidMount() {
        this.setState({ colorsIsShown: false })
    }

    openColor = (ev) => {
        ev.stopPropagation();
        this.setState({ colorsIsShown: !this.state.colorsIsShown })
    }

    closeColor = () => {
        this.setState({ colorsIsShown: false })
    }


    openEdit(ev) {
        ev.stopPropagation();
        this.setState({ isEdit: true })
    }

    typeButton = (keep) => {
        switch (keep.type) {
            case 'NoteTxt': {
                return (<button onClick={(ev) => this.openEdit(ev)}><i className="fas fa-font"></i></button>)
            }
            case 'NoteVideo': {
                return (<button><i className="fab fa-youtube"></i></button>)
            }
            case 'NoteImg': {
                return (<button><i className="fas fa-image"></i></button>)
            }
            case 'NoteTodos': {
                return (<button><i className="fas fa-list-ul"></i></button>)
            }
        }
    }

    render() {
        const { keep } = this.props;
        return (
                <div className="keep-edit">
                    {this.typeButton(keep)}
                    <button onClick={this.openColor}><i className="fas fa-palette"></i></button>
                    {this.state.colorsIsShown && <Color keep={keep} closeColors={this.closeColor} onStyleChange={this.props.onStyleChange} />}
                    <button onClick={(ev) => this.props.onPin(keep.id, ev)}><i className="fas fa-thumbtack"></i></button>
                    <button onClick={(ev) => this.props.onCopy(keep, ev)}><i className="fas fa-clone"></i></button>
                    <button onClick={(ev) => this.props.onRemove(keep.id, ev)}><i className="fas fa-trash-alt"></i></button>
                </div>
        )
    }
}

