
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
                <span onClick={(ev) => this.onChangeColor('#fff1ac', ev)} style={{ backgroundColor: "#fff1ac" }}></span>
                <span onClick={(ev) => this.onChangeColor('#f2a6a6', ev)} style={{ backgroundColor: "#f2a6a6" }}></span>
                <span onClick={(ev) => this.onChangeColor('#e0f5b9', ev)} style={{ backgroundColor: "#e0f5b9" }}></span>
                <span onClick={(ev) => this.onChangeColor('#d3f6f3', ev)} style={{ backgroundColor: "#d3f6f3" }}></span>
                <span onClick={(ev) => this.onChangeColor('#ffbbcc', ev)} style={{ backgroundColor: "#ffbbcc" }}></span>
                <span onClick={(ev) => this.onChangeColor('#a6e3e9', ev)} style={{ backgroundColor: "#a6e3e9" }}></span>
                <span onClick={(ev) => this.onChangeColor('rgb(136, 207, 255)', ev)} style={{ backgroundColor: "rgb(136, 207, 255)" }}></span>
                <span onClick={(ev) => this.onChangeColor('#e1ccec', ev)} style={{ backgroundColor: "#e1ccec" }}></span>
            </div>

        )
    }
}