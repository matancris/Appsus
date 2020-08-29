
import { KeepPreview } from '../cmps/keep-app/KeepPreview.jsx'
import { Edit } from '../cmps/keep-app/Edit.jsx'
import { KeepDetails } from '../cmps/keep-app/KeepDetails.jsx'

export class Modal extends React.Component {
    state = {
        isShown: true
    }

    closeModal = () => {
        console.log('closeModal');
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
        return (
            <div id="modal" className={`modal-wrapper   ${isShown ? '' : 'hide'}`} onClick={this.closeModal} >
                <div className="modal-content slide-in-elliptic-top-fwd" onClick={(ev) => ev.stopPropagation()}>
                    <KeepDetails keep={selectedKeep} onRemove={this.props.onRemove} onStyleChange={this.props.onStyleChange}
                        onCopy={this.props.onCopy} onPin={this.props.onPin} isEditView={true}
                        saveKeep={this.saveKeep} doneNote={this.props.doneNote} onCloseModal={this.onCloseModal} />
                </div>
            </div >
        )
    }
}
