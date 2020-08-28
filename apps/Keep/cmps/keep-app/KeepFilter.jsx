export class KeepFilter extends React.Component {
    state = {
        // filter: ''
    }

    onChangeFilter = (type) => {
        this.props.onSetFilter(type);
    }

    render() {
        return <section className="Keep-filter">
            <input className="keep-filter-search" type="text" placeholder="Search:" onChange={(ev) => {
            props.onSetFilter(ev.target.value) }} />


            <select className="keep-sort" onChange={(value) => this.onChangeFilter(value.target.value)} >
                <option value="All" >All</option>
                <option value="NoteImg" >Images</option>
                <option value="NoteTxt">Txt</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteTodos">Todos</option>
                {/* <option value="NoteAudio">Audio</option> */}
            </select>

        </section>
    }
}