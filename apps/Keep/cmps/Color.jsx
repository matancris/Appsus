
export class Color extends React.Component {

    onChangeColor = (color,ev) => {
        ev.stopPropagation();
        this.props.closeColors();
        this.props.onStyleChange(this.props.keep.id, color)
    }


    render() {
        const { keep } = this.props
        return (
            <div className="colors-container">
                <span onClick={(ev) => this.onChangeColor('#fcf7bb', ev)} style={{ backgroundColor: "#fff48f" }}></span>
                <span onClick={(ev) => this.onChangeColor('#f2a6a6', ev)} style={{ backgroundColor: "#e8505b" }}></span>
                <span onClick={(ev) => this.onChangeColor('#d4ebd0', ev)} style={{ backgroundColor: "#ade498" }}></span>
                <span onClick={(ev) => this.onChangeColor('#d6e5fa', ev)} style={{ backgroundColor: "#01a9b4" }}></span>
                <span onClick={(ev) => this.onChangeColor('#ffd5e5', ev)} style={{ backgroundColor: "#df5e88" }}></span>
                <span onClick={(ev) => this.onChangeColor('#d3f6f3', ev)} style={{ backgroundColor: "#7fdbda" }}></span>
                <span onClick={(ev) => this.onChangeColor('#e1ccec', ev)} style={{ backgroundColor: "#f09ae9" }}></span>
                <span onClick={(ev) => this.onChangeColor('#ececec', ev)} style={{ backgroundColor: "#e4e4e4" }}></span>
                <span onClick={(ev) => this.onChangeColor('white', ev)} style={{ backgroundColor: "white" }}></span>
            </div>

        )
    }
}