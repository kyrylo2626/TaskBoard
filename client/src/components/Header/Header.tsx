import './Header.css';
import { FiPlus, FiRotateCcw  } from "react-icons/fi";

import { useTaskLists } from '../../hooks/useTaskLists';
import { useOptions } from '../../hooks/useOptions';


export default function Header() {

    const { createTaskList } = useTaskLists();
    const { toggleHistoryWindow } = useOptions();
    
    return (
        <div className="header">
            <h2 className="title">My Task Board</h2>
            <div className='headerbtns'>
                <button className='btn history_button' onClick={() => toggleHistoryWindow(true)}>
                    <FiRotateCcw className='iconre'/>&nbsp;History</button>
                <button className='btn create_button' onClick={() => createTaskList.mutate('New Task')}>
                    <FiPlus className='iconplus'/>&nbsp;Create new list</button>
            </div>
        </div>
    )
}