import HistoryService from '../services/History.service'
import { useQuery } from '@tanstack/react-query';

export const useHistory = (taskId: number | undefined) => {

    const getHistory = useQuery({
        queryKey: ['history'],
        queryFn: () => HistoryService.getHistory(),
        select: ({ data }) => data
    })

    const getUniqueHistory = useQuery({
        queryKey: ['uniqueHistory', taskId],
        queryFn: () => { 
            if (taskId) return HistoryService.getUniqueHistory(taskId)
            else return HistoryService.getUniqueHistory(0) },
        select: ({ data }) => data
    })
    

    const dateTimeConfiger = (dateTime: string) => {
        const pad = (n: number) => n < 10 ? '0' + n : n;

        let dateTimeObj = new Date(dateTime);
        let date = `${pad(dateTimeObj.getDate())}.${pad(dateTimeObj.getMonth()+1)}.${dateTimeObj.getFullYear()}`;

        let hours = dateTimeObj.getHours();
        let time = hours <= 12 ? `${hours}:${pad(dateTimeObj.getMinutes())} am` : `${pad(hours-12)}:${pad(dateTimeObj.getMinutes())} pm`;
        
        return [ date, time ]
    }


    return { getHistory, getUniqueHistory, dateTimeConfiger }

}
