
// const { NavLink, withRouter } = ReactRouterDOM

export function AsideBar(props) {
    console.log(props.unreadMailAmount);
    return (
        <nav className={`${props.isMobileMenuOpen ? 'menu-open': ''} aside-bar flex column align-center`}>
            <div className="aside-bar-content flex column space-evenely">
                <button className="compose-btn" onClick={() => props.openCompose()}><img src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png" />Compose</button>
                <section className="aside-main-nav flex column space-between align-center ">
                    <div className="inbox" onClick={() => props.onInbox()}>
                        <span> <i className="fas fa-inbox"></i> </span>
                    Inbox({props.unreadMailAmount})
                    </div>
                    <div className="starred" onClick={() => props.onStarred()}>
                        <span> <i className="fas fa-star"></i> </span>
                    Starred
                </div> 
                    <div className="sent" onClick={() => props.onSent()}>
                        <span> <i className="fas fa-share-square"></i> </span>
                    Sent
                </div>
                    <div className="drafts" onClick={() => props.onDrafts()} >
                        <span> <i className="fab fa-firstdraft"></i> </span>
                    Drafts
                </div>
                    <div className="deleted" onClick={() => props.onTrash()}>
                        <span> <i className="fas fa-trash"></i> </span>
                    Trash
                </div>
                </section>
            </div>
        </nav>
    )
}

