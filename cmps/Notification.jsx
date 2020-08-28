import eventBus from '../services/event-bus-service.js'
import {keepService} from '../apps/Keep/services/keep-service.js'
import {mailService} from '../apps/Mail/service/mail-service.js'

export class Notification extends React.Component {
    state = {
      
    }
    unsubscribe;
    componentDidMount() {
        // this.unsubscribe = eventBus.on('notify', (data) => {
        //     console.log(data);
        // })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        return (
            <section>

            </section>
        )
    }
}
