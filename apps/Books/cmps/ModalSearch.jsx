

export class ModalSearch extends React.Component {
    state = {
        isShown: true
    }

    closeModal = () => {
        this.setState({ isShown: false })
    }

    addBook = (option) => {
        this.props.onAddBook(option)
    }

    render() {
        const { isShown } = this.state
        const { options } = this.props
        return (
            <div className={`modal-search ${isShown ? '' : 'hide'}`} onClick={this.closeModal} >
                <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                    {/* <button onClick={this.closeModal}>X</button> */}
                    <ul >
                        {
                            options.map((option) =>
                                <li key={option.id}>
                                    {option.volumeInfo.title}
                                    <button onClick={() => this.addBook(option)}>+</button>
                                    {/* <button onClick={() => this.props.onAddBook(option)}>+</button> */}
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div >
        )
    }
}