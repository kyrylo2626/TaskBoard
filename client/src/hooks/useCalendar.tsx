import { useState, useEffect } from "react"


export const useCalendar = () => {

    const [ calendar, setCalendar ] = useState({ isOpen: false, display: 'calendar-close', root: '', value: new Date().toISOString() })

    useEffect(() => {
        if (calendar.isOpen) setCalendar({...calendar, display: 'calendar-open', root: 'calendar-is-open'})
        else setCalendar({...calendar, display: 'calendar-close', root: ''})
    }, [calendar.isOpen])

    const setCalendarValue = (item: any) => { setCalendar({ ...calendar, value: item.toISOString() }) }

    const toggleCalendar = () => { setCalendar({...calendar, isOpen: !calendar.isOpen}) }

    const closeCalendar = () => { setCalendar }
    
    return { calendar, setCalendar, closeCalendar, toggleCalendar, setCalendarValue }

}
