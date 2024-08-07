import Dropdown, { Option } from 'react-dropdown';
import { useTasks } from '../../../hooks/useTasks';


export default function DropdownMenu(props: { mode: string, value: any }) {

    const { getCreateTask } = useTasks();

    const priorities = getCreateTask.data?.priorities.map(
        (element: { priority_id: number, name: string }) => ( { value: element.priority_id, label: element.name } ))

    const status = getCreateTask.data?.status?.map(
        element => ( { value: element.list_id, label: element.name } ))

    const getData = () => {
        if (props.mode === 'status') return status
        else if (props.mode === 'priority') return priorities
        else return []
    }

    const setValue = (item: Option) => {
        props.value.dropdownValue[props.mode] = item;
        props.value.setDropdownValue({...props.value.dropdownValue})
    }

    return (
        <Dropdown
            placeholder='Select' 
            options={getData()}
            onChange={item => setValue(item)}
        />
    )
}