import './TaskCard.css';
import ManageWindow from '../ManageWindow/ManageWindow';
import { FiMoreVertical, FiCalendar, FiChevronDown  } from "react-icons/fi";
import { MouseEvent } from 'react';
import { useState } from 'react';
import { IPropsTask, ManageWindowType } from '../../interfaces/Props.TaskList.interface';
import { useOptions } from '../../hooks/useOptions';

export default function TaskCard(props: IPropsTask) {
    const { task } = props;
    const [ manageWindow, setManageWindow ] = useState<ManageWindowType>('');


    const { toggleTaskWindow, toggleDataMode } = useOptions();

    const setTaskWindow = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.parentElement && target.parentElement.id !== 'pointsBtn') {
            toggleDataMode({ mode: 'read', task: task });
            toggleTaskWindow(true);
        }
    }

    return (
        <div className="crs taskcard" onClick={(e) => setTaskWindow(e)}>
            <ManageWindow manageWindow={manageWindow} setManageWindow={setManageWindow} />
            <div className="crs taskheader">
                <label>{task.name}</label>
                <button id='pointsBtn' className='pointBtn'
                    onClick={() => setManageWindow({ type: 'card', id: task.task_id })}>
                        <FiMoreVertical id='pointsBtn' className='iconpointscard ipc'/></button>
            </div>
            <label className='crs tasktext'>{task.description}</label><br />
            <div className='carddate'>
                <FiCalendar className='icondate'/>
                <label className='crs taskdue'>{task.date}</label><br />
            </div>
            <label className='crs taskpriority'>• {task.priority.name}</label><br />
            <button className='taskbutton'>
                <label className='crs'>Move to:</label>
                <FiChevronDown className='crs iconpointscard'/>
            </button>
        </div>
            
    )
}

