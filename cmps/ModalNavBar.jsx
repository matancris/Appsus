

export class ModalNavBar extends React.Component {

    render() {
        const { isShown } = this.props
        const { children } = this.props
        return (
            <div className={ `modal-wrapper ${isShown ? '' : 'hide'}` } onClick={ this.closeModal } >
                <div className="modal-content" onClick={ (ev) => ev.stopPropagation() }>
                    {/* <button onClick={ this.closeModal }>X</button> */}
                    { children }
                </div>
            </div >
        )
    }
}