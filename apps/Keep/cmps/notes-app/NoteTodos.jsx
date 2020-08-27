

export function NoteTodos(props) {
    return (
        <section>
            {props['keep'].info.todos.map((todo,idx) => {
                return <li key={idx}>{todo.txt} </li>
            })
            }
        </section>
    )
}

