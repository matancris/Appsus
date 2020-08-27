
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
                <span onClick={(ev) => this.onChangeColor('#fcf7bb', ev)} style={{ backgroundColor: "#fcf7bb" }}></span>
                <span onClick={(ev) => this.onChangeColor('#f2a6a6', ev)} style={{ backgroundColor: "#f2a6a6" }}></span>
                <span onClick={(ev) => this.onChangeColor('#d4ebd0', ev)} style={{ backgroundColor: "#d4ebd0" }}></span>
                <span onClick={(ev) => this.onChangeColor('#d6e5fa', ev)} style={{ backgroundColor: "#d6e5fa" }}></span>
                <span onClick={(ev) => this.onChangeColor('#ffd5e5', ev)} style={{ backgroundColor: "#ffd5e5" }}></span>
                <span onClick={(ev) => this.onChangeColor('#d3f6f3', ev)} style={{ backgroundColor: "#d3f6f3" }}></span>
                <span onClick={(ev) => this.onChangeColor('#e1ccec', ev)} style={{ backgroundColor: "#e1ccec" }}></span>
                <span onClick={(ev) => this.onChangeColor('#ececec', ev)} style={{ backgroundColor: "#ececec" }}></span>
                <span onClick={(ev) => this.onChangeColor('white', ev)} style={{ backgroundColor: "white" }}></span>
            </div>

        )
    }
}