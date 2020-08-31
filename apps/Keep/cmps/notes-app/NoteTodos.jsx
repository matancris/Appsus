
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

// export class NoteTodos extends React.Component {
//     state = {
//         value: '',
//         todoIdx: ''
//     }
//     // getTime(time) {
//     //     return (<label>{new Date(time).toLocaleString()}</label>)
//     // }

//     onTodoNote = (idx) => {
//         if (!this.props.doneNote) return;
//         this.props.doneNote(props.keep, idx)
//     }
//     // handleChange = (ev,idx,value) => {
//     //     this.setState({value: value})
//     //     console.log(ev.target.value);
//     // }
//     render() {
//         return (
//             <section>
//                 {this.props['keep'].info.todos.map((todo, idx) => {
//                     return <input onChange={(ev) => this.handleChange(ev,idx,value)} value={todo.txt} key={idx}
//                      onClick={() => { this.onTodoNote(idx) }} className={`${todo.doneAt ? "done-note" : " "} `}>
//                         {/* {todo.doneAt && getTime(todo.doneAt)} */}
//                     </input>
//                 })
//                 }
//             </section>
//         )
//     }

// }