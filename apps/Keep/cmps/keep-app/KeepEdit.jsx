


export class KeepEdit extends React.Component {
    state = {
    }

    render() {
        const {keep} = this.props;
        return (
            <div className="keep-edit">
                <div>
                <input onChange={(ev) => this.props.onStyleChange(keep.id, ev.target.value)} type="color" id="shape-color" />
                <button ><i className="fas fa-thumbtack"></i></button>
                <button onClick={() => this.props.onCopy(keep)}><i className="fas fa-clone"></i></button>
                <button onClick={() => this.props.onRemove(keep.id)}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
        )
    }
}


{/* <input onChange={this.onStyleChange} type="color" id="shape-color" /> */ }
    // onStyleChange = (ev) => {
    //     const value = ev.target.value;
    //     this.setState({ keep: { ...this.state.keep, style: { backgroundColor: value } } })
    // }