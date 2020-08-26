



export function MailFilter(props) {
    return <section className="mail-filter">
        <input type="text" placeholder="Filter by Name" onChange={(ev) => {
            props.onSetFilter(ev)
        }} />
        <div className="read-sort">
            <label htmlFor="all"> All <input type="radio" name="setReadDis" value="all" onChange={(ev)=> props.onSetFilter(ev)}/> </label>
            <label htmlFor="read"> Read <input type="radio" name="setReadDis" value="read" onChange={(ev)=> props.onSetFilter(ev)} /> </label>
            <label htmlFor="unread"> Unread <input type="radio" name="setReadDis" value="unread" onChange={(ev)=> props.onSetFilter(ev)}/> </label>
        </div>
  
    </section>

}