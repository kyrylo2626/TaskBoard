import './TaskWindow.scss';
import './components/Dropdown.scss'
import './components/Calendar.scss'
import DropdownMenu from './components/Dropdown';
import Calendar from 'react-calendar';
import { FiTag, FiCalendar, FiCrosshair, FiX, FiCheckSquare } from "react-icons/fi";
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICreateTaskForm } from '../../interfaces/CreateTaskFrom.interface';
import { useTasks } from '../../hooks/useTasks';
import { useCalendar } from '../../hooks/useCalendar';
import { useState } from 'react';


export default function TaskWindowCreate(props: { closeTaskWindow: () => void, marginTop: string }) {

    const { register, handleSubmit, formState } = useForm<ICreateTaskForm>({ mode: 'onChange' });
    const { getCreateTask } = useTasks();
    const { calendar, setCalendar, closeCalendar, toggleCalendar, setCalendarValue } = useCalendar();

    const onSubmit:SubmitHandler<ICreateTaskForm> = (data: any) => {
        console.log(data)
    }


    const [ dropdownValue, setDropdownValue ] = useState({ status: '', priority: '', calendar: new Date() })

    


    const borderStyle = { base: '#e1e1e6', error: 'red' };
    const borderColor = { taskname: formState.errors['taskname'] ? borderStyle.error : borderStyle.base,
                          duedate: formState.errors['duedate'] ? borderStyle.error : borderStyle.base,
                          priority: formState.errors['priority'] ? borderStyle.error : borderStyle.base,
                          status: formState.errors['status'] ? borderStyle.error : borderStyle.base,
                          text: formState.errors['text'] ? borderStyle.error : borderStyle.base }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="taskwindow" style={{marginTop: props.marginTop, width: '61%'}}>
            <div className='tskwheader'>
                <button type="button" className='tskwclose' onClick={() => props.closeTaskWindow()}><FiX className='iconclose'/></button>
            </div>
            <div className='tskwinfo' style={{width: '96%'}}>
                <div className='dsb infoheader'>
                    <label className='text18'>Task name:</label>
                    <input type='text' className='nameinput' placeholder='Type task name' style={{borderColor: borderColor.taskname}}
                        { ...register( 'taskname', { required: 'This field is required.' } ) } />
                </div>
                <div className='taskprops'>
                    <div className='taskprop'>
                        <FiCrosshair className='icon'/>
                        <label className='propname'>Status</label>
                        <DropdownMenu mode='status' value={{dropdownValue, setDropdownValue}} />
                    </div>
                    <div className='taskprop'>
                        <FiCalendar className='icon'/>
                        <label className='propname'>Due date</label>
                        <div className={`Dropdown-root ${calendar.root}`} onClick={() => toggleCalendar()}>
                            <div className='Dropdown-control'>
                                <div className='Dropdown-placeholder'>Select</div>
                                <div className='Dropdown-arrow' />
                            </div>
                        </div>
                        <Calendar value={calendar.value} onChange={item => setCalendarValue(item)} className={calendar.display}/>
                    </div>
                    <div className='taskprop'>
                        <FiTag className='icon' />
                        <label className='propname'>Priority</label>
                        <DropdownMenu mode='priority' value={{dropdownValue, setDropdownValue}}/>
                    </div>
                </div>
                <label className='text18'>Description</label><br /><br />
                <div className='infotext verticalalign'>
                    <textarea className='text500 textinput' id='scrollfield' placeholder='Type task' style={{borderColor: borderColor.text}}
                        { ...register( 'text', { required: 'This field is required.' } ) } /><br />
                    <button type="submit" className='tskwclose tskwsave'>SAVE&nbsp;<FiCheckSquare className='iconsave' /></button>
                </div>
            </div>
        </form>
    )
}