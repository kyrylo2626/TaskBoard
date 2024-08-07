import TaskCard from '../TaskCard/TaskCard';
import './TaskList.css';
import { FiPlus } from "react-icons/fi";

import { IPropsTaskList } from '../../interfaces/Props.TaskList.interface';
import { useOptions } from '../../hooks/useOptions';
import React from 'react';
import TaskListHeader from './TaskListHeader';


export default function TaskList(props: IPropsTaskList) {

    
    const { toggleTaskWindow, toggleDataMode } = useOptions();

    const createTask = () => { toggleDataMode({ mode: 'create', taskList: props.taskList }); toggleTaskWindow(true) }

    return (
        <div className="tasklist" style={ props.isLast ? { marginRight: 0 } : {}}>
            <TaskListHeader taskList={props.taskList} />
            <button className='addbutton' onClick={createTask}><FiPlus className='iconpointslist'/>&nbsp;Add new card</button>
            <div className='cardlist'>
                {props.tasks.length !== 0
                ? props.tasks.map(task => ( <React.Fragment key={task.task_id}><TaskCard task={task} setState={props.setState} /><br /></React.Fragment> ))
                : <div className='emptyList'><label className='emptyList'>There are no tasks yet</label></div>
                }
            </div>
        </div>
    )
}