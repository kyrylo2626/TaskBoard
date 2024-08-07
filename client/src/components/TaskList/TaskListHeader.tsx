import './TaskList.css';
import { FiCheck, FiMoreVertical, FiX } from "react-icons/fi";
import ManageWindow from '../ManageWindow/ManageWindow';
import { ITaskLists } from '../../interfaces/TaskLists.interface';
import { useState } from 'react';
import { ManageWindowType } from '../../interfaces/Props.TaskList.interface';
import { useOptions } from '../../hooks/useOptions';
import { useTaskLists } from '../../hooks/useTaskLists';



export default function TaskList(props: { taskList: ITaskLists }) {

    const [ manageWindow, setManageWindow ] = useState<ManageWindowType>('');
    const [ taskListName, setTaskListName ] = useState(props.taskList.name);
    const { editNameMode, toggleEditNameMode } = useOptions();
    const { updateTaskList } = useTaskLists();

    const setNewName = () => {
        updateTaskList.mutate({taskListId: props.taskList.list_id, taskListName: taskListName});
        toggleEditNameMode(0);
    }

    return (
        <>
            <ManageWindow manageWindow={manageWindow} setManageWindow={setManageWindow} />
            {editNameMode === props.taskList.list_id

            ?<div className='listheader' id={`listheader${props.taskList.list_id}`}>
                <input type='text' className='listnameedit' value={taskListName} autoFocus={true}
                    placeholder='Type new task list name' onChange={(e) => setTaskListName(e.target.value)}/>
                <button className='pointBtn' onClick={() => setNewName()}>
                    <FiCheck className='iconpointslist iplh'/></button>
                <button className='pointBtn' onClick={() => toggleEditNameMode(0)}>
                    <FiX className='iconpointslist iplh'/></button>
            </div>

            :<div className='listheader'>
                <label className='listname'>{props.taskList.name}</label>
                <label>{props.taskList.count}</label>
                <button className='pointBtn' onClick={() => setManageWindow({ type: 'list', id: props.taskList.list_id })}>
                    <FiMoreVertical className='iconpointslist iplh'/></button>
            </div>}
        </>
    )
}