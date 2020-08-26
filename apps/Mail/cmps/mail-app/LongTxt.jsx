

export function LongTxt(props) {

    return (
        <div className="text-description" onClick={props.toggleLength}>
            <p className={props.isLongTxtShown ? '':'short-text'}>{props.text}</p>
        </div>
    )
}

