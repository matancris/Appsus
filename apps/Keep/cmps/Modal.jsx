
import { KeepPreview } from '../cmps/keep-app/KeepPreview.jsx'
import { Edit } from '../cmps/keep-app/Edit.jsx'

export class Modal extends React.Component {
    state = {
        isShown: true
    }

    closeModal = () => {
        this.props.unSelectedKeep();
        this.setState({ isShown: false })
    }

    render() {
        const { isShown } = this.state
        const { selectedKeep } = this.props
        return (
            <div className={`modal-wrapper ${isShown ? '' : 'hide'}`} onClick={this.closeModal} >
                <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                    {/* <button onClick={this.closeModal}>X</button> */}
                    <KeepPreview keep={selectedKeep} onRemove={this.props.onRemove} onStyleChange={this.props.onStyleChange}
                        onCopy={this.props.onCopy} onPin={this.props.onPin} />
                     <Edit keep={selectedKeep} />
                </div>
            </div >
        )
    }
}
