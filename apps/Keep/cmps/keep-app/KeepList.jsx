
import { KeepPreview } from 'KeepPreview.jsx'

export function KeepList(props) {
    return (
        <section>
            <div className="keep-list flex">
                {
                    props.keeps.map(keep =>
                        <div key={keep.id}>
                            <KeepPreview keep={keep} onRemove={props.onRemove} onStyleChange={props.onStyleChange} onCopy={props.onCopy}/>
                        </div>
                    )
                }
            </div>
        </section>
    )
}


