

export function NoteImg(props) {
    console.log(props['keep'].info.url);
    return (
    <section>
       {/* <img src="../../assets/img/1.jpg" /> */}
       <img src={props['keep'].info.url} />
    </section>
    )
}


