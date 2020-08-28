

export class LongTxt extends React.Component {
    state = {
        isShowAll: false
    }

    toggleMore = () => this.setState({ isShowAll: !this.state.isShowAll });


    render() {
        const limit = 100;
        const txt = this.props.text;
        const { isShowAll } = this.state;
        const toShow = txt.substring(0, limit) + "...";
        return (
            <section>
                {txt.length <= limit && txt}
                {txt.length > limit && isShowAll &&
                    <div>
                        {txt}
                        <a className="read-link" onClick={this.toggleMore}> Read less</a>
                    </div>}
                {txt.length > limit && !isShowAll &&
                    <div>
                        {toShow}
                        <a className="read-link" onClick={this.toggleMore}> Read more </a>
                    </div>}
            </section>
        )
    }
}