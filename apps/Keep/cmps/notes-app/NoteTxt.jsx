

export function NoteTxt(props) {
    return (
       
        <blockquote contenteditable="true">
            <p>{props['keep'].info.txt}</p>
        </blockquote>
    )
}

 // <section>
        //     <p>{props['keep'].info.txt}</p>
        // </section>