import TaskList from '../TaskList/TaskList';

import { useTaskLists } from '../../hooks/useTaskLists';

import { useTasks } from '../../hooks/useTasks';
import { ITasks} from '../../interfaces/Task.interface'

import './Body.css';

export default function Body() {

    const { getTaskList } = useTaskLists();
    const { getTasks, createTask } = useTasks();

    let bodyDisplay = (getTaskList.data && getTaskList.data.length >= 5) ? 'block' : 'flex';
    
    if (getTaskList.isPending) return (<>Loading...</>)

    return (
        <div className="body" id='scrollfield' style={{display: bodyDisplay}}>
            {getTaskList.data?.length !== 0
            ? getTaskList.data?.map((taskList, index) => (
                getTasks.data &&
                index !== getTaskList.data.length-1
                    ? <TaskList taskList={taskList} setState={createTask} key={index}
                        tasks={getTasks.data?.filter((tasks: ITasks) => tasks.list_id === taskList.list_id)[0]?.tasks || []} />
                    : <TaskList taskList={taskList} setState={createTask} isLast={true} key={index}
                        tasks={getTasks.data?.filter((tasks: ITasks) => tasks.list_id === taskList.list_id)[0]?.tasks || []} />
                ))
            : <div className="emptyLists"><label className="emptyLists">There are no task lists yet</label></div>
            }
        </div>
    )
}