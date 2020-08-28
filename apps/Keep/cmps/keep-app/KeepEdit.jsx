
import { Color } from '../Color.jsx'
import { KeepAdd } from './KeepAdd.jsx'

export class KeepEdit extends React.Component {
    state = {
        colorsIsShown: false,
    }

    componentDidMount() {
        this.closeColor();
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
    }

    onStyleChange = (keepId, color) => {
        this.props.onStyleChange(keepId, color);
        if (this.props.changeStyleDetails) this.props.changeStyleDetails(keepId, color)
    }

    onRemove = (keepId,ev) =>{
        ev.stopPropagation();
        this.props.onRemove(keepId);
        if(this.props.removeOnDetails) this.props.removeOnDetails();
    }

    onMailKeep = (keep, ev) =>{
        ev.stopPropagation();

    }

    typeButton = (keep) => {
        switch (keep.type) {
            case 'NoteTxt': {
                return (<button className="btn-type"><i className="fas fa-font"></i></button>)
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
        const { isDetailsOn } = this.props
        return (
            <div className={`${isDetailsOn ? "keep-edit-details" : "keep-edit"}`}>
                {this.typeButton(keep)}
                <button onClick={this.openColor}><i className="fas fa-palette"></i></button>
                {this.state.colorsIsShown && <Color keep={keep} closeColors={this.closeColor} onStyleChange={this.onStyleChange} />}
                {/* {this.state.colorsIsShown && <Color keep={keep} closeColors={this.closeColor} onStyleChange={this.props.onStyleChange} />} */}
                <button onClick={(ev) => this.props.onPin(keep.id, ev)}><i className="fas fa-thumbtack"></i></button>
                <button onClick={(ev) => this.props.onCopy(keep, ev)}><i className="fas fa-clone"></i></button>
                <button onClick={(ev) => this.onRemove(keep.id, ev)}><i className="fas fa-trash-alt"></i></button>

            </div>
        )
    }
}

