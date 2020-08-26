
// const { NavLink, withRouter } = ReactRouterDOM

export function AsideBar(props) {
    return (
        <nav className="aside-bar flex column align-center">
            <div className="aside-bar-content flex column space-evenely">
                <button className="compose-btn" onClick={() => props.openCompose()}><img src="https://www.gstatic.com/images/icons/material/colored_icons/1x/create_32dp.png" />Compose</button>
                <section className="aside-main-nav flex column space-between align-center ">
                    <div className="inbox">
                        <span> <i className="fas fa-inbox"></i> </span>
                    Inbox
                    {/* <span className="unread-display"> {{ unreadEmailsAmount }} </span> */}
                    </div>
                    <div className="starred">
                        <span> <i className="fas fa-star"></i> </span>
                    Starred
                </div>
                    <div className="sent">
                        <span> <i className="fas fa-share-square"></i> </span>
                    Sent
                </div>
                    <div className="drafts" >
                        <span> <i className="fab fa-firstdraft"></i> </span>
                    Drafts
                </div>
                    <div className="deleted" >
                        <span> <i className="fas fa-trash"></i> </span>
                    Trash
                </div>
                </section>
            </div>
        </nav>
    )
}

