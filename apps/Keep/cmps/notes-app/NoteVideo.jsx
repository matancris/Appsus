
export function NoteVideo(props) {
    return (
        <section>
            <iframe 
                src={props['keep'].info.url}  >
            </iframe>
        </section>
    )
}

