import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useHistory } from '../../hooks/useHistory';
import { useOptions } from '../../hooks/useOptions';
import './History.css';


export default function History() {

    const { getHistory, dateTimeConfiger } = useHistory(undefined);

    const { historyWindow, toggleHistoryWindow } = useOptions();
    const [ opacity, setOpacity ] = useState('0')
    const [ marginRight, setMarginRight ] = useState('-30%')

    useEffect(() => {
        if (historyWindow) {
            setOpacity('1');
            setMarginRight('0');
        }}, [historyWindow]);

    const closeHistory = () => {
        setOpacity('0');
        setMarginRight('-30%');
        setTimeout(() => { toggleHistoryWindow(false) }, 200);
    }

    return (
        <>
        {
            historyWindow &&
            <div className='modal-window'>
                <div className='wrapper' style={{opacity: opacity}}>

                    <div className="historyWindow" style={{marginRight: marginRight}}>

                        <div className='historyHeader'>
                            <label className='text18 historyTitle'>History</label>
                            <button className='historyClose' onClick={() => closeHistory()}><FiX className='iconclose'/></button>
                        </div>
    
                        <div className='historyLayout'>
                            <div className='historyDetails' id='scrollfield'>
                                {getHistory
                                ? <>
                                    {getHistory.data?.map((element) => (
                                        <>
                                            <div className='dsb'>
                                                <label className='text500 historyInfo'>• {element.action}</label>
                                                <label className='text500 historyDate'>
                                                    {dateTimeConfiger(element.time_create).map((dateTime) => <>{dateTime}<br /></> )}</label>
                                            </div><br />
                                        </>
                                    ))}
                                    <div className='dsb'>
                                        <label className='text500 historyInfo'>• Anton Koval created this task</label>
                                        <label className='text500 historyDate'>05.03.24<br />5:10 pm</label>
                                    </div><br />
                                  </>
                                : <div className='emptyList'><label className='emptyList'>There is no activity yet</label></div>
                                }
                            </div>
                        </div>
                        
                    </div>

                    <div className="overlay" onClick={() => closeHistory()}></div>
                </div>
            </div>
        }
        </>
    )
}