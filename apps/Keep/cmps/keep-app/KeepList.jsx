
import { KeepPreview } from 'KeepPreview.jsx'

export function KeepList(props) {
    return (
        <section>
            {props.ispins && <i className="fas fa-thumbtack btn-pin-list"></i>}
            <div className={`keep-list ${props.ispins ? 'keeps-pin' : ''} `}>
                {
                    props.keeps.map(keep =>
                        <KeepPreview key={keep.id} keep={keep} onRemove={props.onRemove} onStyleChange={props.onStyleChange}
                            onCopy={props.onCopy} onPin={props.onPin} onEditKeep={props.onEditKeep}  getTypeNote={props.getTypeNote}
                        />
                    )
                }
            </div>
        </section>
    )

}


