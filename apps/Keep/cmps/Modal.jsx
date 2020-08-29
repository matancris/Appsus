
import { KeepDetails } from '../cmps/keep-app/KeepDetails.jsx'

export class Modal extends React.Component {
    state = {
        isShown: true
    }

    closeModal = () => {
        this.props.unSelectedKeep();
        this.setState({ isShown: false })
        this.props.loadKeeps();
    }

    saveKeep = (keep) => {
        this.closeModal();
        this.props.saveKeep(keep);
    }

    onCloseModal = () => {
        this.closeModal();
    }

    render() {
        const { isShown } = this.state
        const { selectedKeep } = this.props
        window.scrollTo(0, 0);
        return (
            <div id="modal" className={`modal-wrapper   ${isShown ? '' : 'hide'}`} onClick={this.closeModal} >
                <div className="modal-content slide-in-elliptic-top-fwd flex column" onClick={(ev) => ev.stopPropagation()}>
                    <KeepDetails keep={selectedKeep} onRemove={this.props.onRemove} onStyleChange={this.props.onStyleChange}
                        onCopy={this.props.onCopy} onPin={this.props.onPin} isEditView={true}
                        saveKeep={this.saveKeep} doneNote={this.props.doneNote} onCloseModal={this.onCloseModal} 
                        getTypeNote ={this.props.getTypeNote}/>
                </div>
            </div >
        )
    }
}
