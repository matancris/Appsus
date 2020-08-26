export function NoteTodos(props) {
  console.log(props['keep'].info.todos);
    return (
        <section>
            {props['keep'].info.todos.map((todo,idx) => {
                return <li key={idx}>{todo.txt} </li>
            })
            }
        </section>
    )
}

