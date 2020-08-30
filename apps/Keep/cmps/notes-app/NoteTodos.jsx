
export function NoteTodos(props) {

    function getTime(time) {
        return (<label>{new Date(time).toLocaleString()}</label>)
    }

    function onTodoNote(idx) {
        if (!props.doneNote) return;
        props.doneNote(props.keep, idx)
    }

    return (
        <section>
            {props['keep'].info.todos.map((todo, idx) => {
                return <li key={idx} onClick={() => {onTodoNote(idx)}} className={`${todo.doneAt ? "done-note" : " "} `
                     }>
                    {todo.txt} {todo.doneAt && getTime(todo.doneAt)}
                </li>
            })
            }
        </section>

        
    )
}

