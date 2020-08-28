

export function BookFilter(props) {
    return <section className="book-filter">
        <input className= "book-input-filter" type="text" placeholder="Filter by Name:" onChange={(ev)=>{
            props.onSetFilter(ev.target.value)
        }}/>
    </section>
}