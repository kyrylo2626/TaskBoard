import './ModalWindow.css';
import TaskWindow from '../TaskWindow/TaskWindowBody';
import History from '../History/History';


export default function ModalWindow() {

    const closeModalWindow = () => setDetails(prev => ({...prev, ModalWindow: false}))

    return (
                <div className='modal-window'>
                    <div className='wrapper'>
                        {/* Modal window code here */}
                        <TaskWindow />
                        {/* <History /> */}
                        <div className="overlay" onClick={closeModalWindow}></div>
                    </div>
                </div>
            )
}