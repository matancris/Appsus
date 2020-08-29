import eventBus from '../service/event-bus-service.js'

export class Notification extends React.Component {
    state = {
        isShown: false,
        msg: '',
    }
    unsubscribe;
    componentDidMount() {
        this.unsubscribe = eventBus.on('notify', (data) => {
            this.setState({ isShown: true, msg: data.msg })
            setTimeout(() => this.setState({ isShown: false }), 3000)
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        const { isShown, msg} = this.state
        return (
             isShown && <div className={ `notification-box vibrate-1` }>
                <span onClick={ () => this.setState({ isShown: false }) }>X</span> 
                <h2>{ msg }</h2> 
            </div>
        )
    }
}
