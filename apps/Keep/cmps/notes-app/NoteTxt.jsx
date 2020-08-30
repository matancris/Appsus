


export function NoteTxt(props) {
    return (
        <blockquote contentEditable="true" suppressContentEditableWarning={true}>
            <p >{props['keep'].info.txt}</p>
        </blockquote>
    )
}
