


export function NoteTxt(props) {
    return (
        // <section>
        //     <p>{props['keep'].info.txt}</p>
        // </section>
      <blockquote contentEditable="true" suppressContentEditableWarning={true}>
            <p >{props['keep'].info.txt}</p>
        </blockquote>  
    )
}
