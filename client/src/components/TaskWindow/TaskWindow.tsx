import './TaskWindow.scss';
import { useState, useEffect } from 'react';
import { useOptions } from '../../hooks/useOptions';
import TaskWindowRead from './TaskWindowRead';
import TaskWindowCreate from './TaskWindowCreate';


export default function TaskWindow() {

    const { taskWindow, toggleTaskWindow, dataMode } = useOptions();
    const [ opacity, setOpacity ] = useState('0');
    const [ marginTop, setMarginTop ] = useState('-80%');

    useEffect(() => { if (taskWindow) { setOpacity('1'); setMarginTop('0') } }, [taskWindow]);

    const closeTaskWindow = () => {
        setOpacity('0'); setMarginTop('-80%');
        setTimeout(() => { toggleTaskWindow(false) }, 200)
    }

    return (
        <>
        {
            taskWindow &&
            <div className='modal-window'>
                <div className='wrapper' style={{opacity: opacity}}>
                    {
                        dataMode.mode === 'create'
                        ? <TaskWindowCreate closeTaskWindow={closeTaskWindow} marginTop={marginTop} />
                        : <TaskWindowRead closeTaskWindow={closeTaskWindow} marginTop={marginTop} />
                    }
                    <div className="overlay" onClick={() => closeTaskWindow()}></div>
                </div>
            </div>
        }
        </>
    )
}