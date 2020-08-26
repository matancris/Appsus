
import { keepService } from '../../services/keep-service.js'
// import React from 'react';
// import { SketchPicker } from 'react-color';

export class KeepEdit extends React.Component {
    state = {
        type: 'txt',
        keep: keepService.getEmptyKeep()
    }

    componentDidMount() {
    }

    onInputChange = (ev) => {
        const value = ev.target.value;
        console.log(value);
        this.setState({ keep: { ...this.state.keep, type: 'NoteTxt', info: { txt: value } } })
    }

    onStyleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ keep: { ...this.state.keep, style: { backgroundColor: value } } })
    }

    addImg() {

    }

    addKeep = ()=>{
        this.props.onAddKeep(this.state.keep)
    }

    render() {
        const { keep } = this.state.keep
        return (
            <div className='keep-edit'>
                <div>
                    <input type="add" placeholder="Add Keep:" onChange={this.onInputChange} />
                    <button><i className="fas fa-font"></i></button>
                    <input onChange={this.onStyleChange} type="color" id="shape-color"/>

                    <button onClick={this.addImg}><i className="fas fa-image"></i></button>
                    <button onClick={() => this.changeType('video')}><i className="fab fa-youtube"></i></button>
                    <button onClick={() => this.changeType('todos')}><i className="fas fa-list-ul"></i></button>
                    <button onClick={this.addKeep}><i className="fas fa-plus"></i></button>
                </div>
            </div>
        )
    }
}
