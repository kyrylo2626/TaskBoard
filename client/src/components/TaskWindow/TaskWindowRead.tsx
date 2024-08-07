import './TaskWindow.scss';
import { useState, useEffect } from 'react';
import { useOptions } from '../../hooks/useOptions';
import { useHistory } from '../../hooks/useHistory';
import { FiTag, FiCalendar, FiCrosshair, FiX, FiEdit } from "react-icons/fi";


export default function TaskWindowRead(props: { closeTaskWindow: () => void, marginTop: string }) {

    const { dataMode } = useOptions();
    const { getUniqueHistory, dateTimeConfiger } = useHistory(dataMode.task?.task_id);
    const [ history, setHistory ] = useState(getUniqueHistory.data);

    useEffect(() => { setHistory(getUniqueHistory.data) }, [getUniqueHistory.data]);


    return (
        <div className="taskwindow" style={{marginTop: props.marginTop}}>
            <div className='tskwheader'>
                <button type="button" className='tskwclose' onClick={() => props.closeTaskWindow()}><FiX className='iconclose'/></button>
            </div>
            <div className='tskwinfo'>
                <div className='dsb infoheader'>
                    <label className='text18'>{dataMode.task!.name}</label>
                    <button className='infobutton'><FiEdit className='iconedit'/>&nbsp;Edit task</button>
                </div>
                <div className='taskprops'>
                    <div className='taskprop'>
                        <FiCrosshair className='icon'/>
                        <label className='propname'>Status</label>
                        <label className='text14'>{dataMode.task!.task_lists.name}</label>
                    </div>
                    <div className='taskprop'>
                        <FiCalendar className='icon'/>
                        <label className='propname'>Due date</label>
                        <label className='text14'>{dataMode.task!.date}</label>
                    </div>
                    <div className='taskprop'>
                        <FiTag className='icon' />
                        <label className='propname'>Priority</label>
                        <label className='text14'>{dataMode.task!.priority.name}</label>
                    </div>
                </div>
                <label className='text18'>Description</label><br /><br />
                <div className='infotext' id='scrollfield'><label className='text500'>{dataMode.task!.description}</label></div> 
            </div>
            <div className='tskwactivity'>
                <label className='text18'>Activity</label><br /><br />
                <div className='infoactivity' id='scrollfield'>
                    {dataMode.mode === 'create' || !history || history.length === 0
                    ? <div className='emptyList'><label className='emptyList'>There is no activity yet</label></div>
                    : history?.map(() => (
                        <><div className='dsb'>
                            <label className='text500 actinfo'>• {history[0].action}</label>
                            <label className='text500 actdate'>
                                {dateTimeConfiger(history[0].time_create).map((dateTime) => <>{dateTime}<br /></> )}</label>
                        </div><br /></>
                    )) 
                    }
                </div>
            </div>
        </div>
    )
}