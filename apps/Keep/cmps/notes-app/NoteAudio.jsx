

export function NoteAudio(props) {
    // var sound = new Audio(props['keep'].info.url);
    return (
        <section className="audio-container">
            <audio controls>
                <source src={props['keep'].info.url} type="audio/mp3" /> </audio>
        </section>
    )
}
