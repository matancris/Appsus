
export class Color extends React.Component {

    onChangeColor = (color,ev) => {
        // console.log(ev);
        ev.stopPropagation();
        this.props.closeColors();
        this.props.onStyleChange(this.props.keep.id, color)
    }


    render() {
        const { keep } = this.props
        return (
            <div className="colors-container">
                <span onClick={(ev) => this.onChangeColor('#fffcab', ev)} style={{ backgroundColor: "#fffcab" }}></span>
                <span onClick={(ev) => this.onChangeColor('rgb(255, 136, 136)', ev)} style={{ backgroundColor: "rgb(255, 136, 136)" }}></span>
                <span onClick={(ev) => this.onChangeColor('#c0ffb3', ev)} style={{ backgroundColor: "#c0ffb3" }}></span>
                <span onClick={(ev) => this.onChangeColor('rgb(136, 255, 225)', ev)} style={{ backgroundColor: "rgb(136, 255, 225)" }}></span>
                <span onClick={(ev) => this.onChangeColor('#ffc1fa', ev)} style={{ backgroundColor: "#ffc1fa" }}></span>
                <span onClick={(ev) => this.onChangeColor('rgb(52, 82, 255)', ev)} style={{ backgroundColor: "rgb(52, 82, 255)" }}></span>
                <span onClick={(ev) => this.onChangeColor('rgb(136, 207, 255)', ev)} style={{ backgroundColor: "rgb(136, 207, 255)" }}></span>
                <span onClick={(ev) => this.onChangeColor('#b590ca', ev)} style={{ backgroundColor: "#b590ca" }}></span>
            </div>

        )
    }
}