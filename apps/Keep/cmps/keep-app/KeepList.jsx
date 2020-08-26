
import { KeepPreview } from 'KeepPreview.jsx'

export function KeepList(props) {
    return (
        <section>
            <h1>Pined Notes</h1>
            <ul className="keep-list clean-list flex">
                {
                    props.keeps.map(keep =>
                        <li key={keep.id}>
                            <KeepPreview keep={keep} onRemove={props.onRemove}/>
                        </li>
                    )
                }
            </ul>
        </section>
    )
}


