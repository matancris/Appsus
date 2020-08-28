



export function MailFilter(props) {
    return (
        <React.Fragment>
            <button className="mobile-menu-btn" onClick={() => props.onOpenMobileMenu()}> ☰ </button>
            <section className="mail-filter">
                <input type="search" placeholder="serach" onChange={(ev) => {
                    props.onSetFilter(ev)
                }} />
                <div className="radio-sort">
                    <label htmlFor="all"> All <input type="radio" name="setReadDis" value="all" onChange={(ev) => props.onSetFilter(ev)} /> </label>
                    <label htmlFor="read"> Read <input type="radio" name="setReadDis" value="read" onChange={(ev) => props.onSetFilter(ev)} /> </label>
                    <label htmlFor="unread"> Unread <input type="radio" name="setReadDis" value="unread" onChange={(ev) => props.onSetFilter(ev)} /> </label>
                </div>

            </section>
        </React.Fragment>
    )
}