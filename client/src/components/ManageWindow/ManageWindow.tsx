import './ManageWindow.css';
import { FiEdit, FiPlus, FiTrash2  } from "react-icons/fi";
import { useRef, useEffect } from 'react';
import { useTaskLists } from '../../hooks/useTaskLists';
import { useTasks } from '../../hooks/useTasks';
import { IManageWindow } from '../../interfaces/Props.TaskList.interface';
import { useOptions } from '../../hooks/useOptions';

export default function ManageWindow(props: IManageWindow) {

    const { manageWindow, setManageWindow } = props;

    const { editNameMode, toggleEditNameMode } = useOptions();

    const { deleteTaskList } = useTaskLists();
    const { deleteTask } = useTasks();

    const popupRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setManageWindow('');
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => { document.removeEventListener('mousedown', handleClickOutside) };
    }, []);



    const deleteAction = () => {
        if (typeof manageWindow !== 'string') {
            if (manageWindow.type === 'list') deleteTaskList.mutate(manageWindow.id)
            else if (manageWindow.type === 'card') deleteTask.mutate(manageWindow.id)
        }
        setManageWindow('');
    }

    const editAction = () => {
        if (typeof manageWindow !== 'string') {
            if (manageWindow.type === 'list') toggleEditNameMode(manageWindow.id)
        }
        setManageWindow('');
    }


    return (
        <>
            {
                typeof manageWindow !== 'string' &&
                <div ref={popupRef} className={manageWindow.type === 'list' ? 'popuplist popupwin' : 'popupcard popupwin'}>
                    <button className='popupbtn' onClick={() => editAction()}><FiEdit className='popupicon'/>Edit</button>
                    {manageWindow.type === 'list' &&
                    <button className='popupbtn'>
                        <FiPlus className='popupicon'/>Add new card
                    </button>}
                    <button className='popupbtn' style={{color: 'red'}} onClick={() => deleteAction()}>
                        <FiTrash2 className='popupicon' style={{stroke: 'red'}}/>Delete</button>
                </div>
            }
        </>
    )
}