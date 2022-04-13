import React from 'react'
import "./widgetBoard.css"

export default function WidgetBoard() {
  return (
    <div className='widgetBoard'>
        <span className='boardTitle'>Top 5 search</span>
        <ul className='boardList'>
            <li className='listItem'>
                <img src= "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" alt='' className='listImg'/>
                <div className='wordSearch'>
                    <span className='word'>Lion</span>
                    
                </div>
                <button className='boardButton'>
                    Display
                </button>
            </li>
            <li className='listItem'>
                <img src= "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" alt='' className='listImg'/>
                <div className='wordSearch'>
                    <span className='word'>Lion</span>
                    
                </div>
                <button className='boardButton'>
                    Display
                </button>
            </li>
            <li className='listItem'>
                <img src= "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" alt='' className='listImg'/>
                <div className='wordSearch'>
                    <span className='word'>Lion</span>
                    
                </div>
                <button className='boardButton'>
                    Display
                </button>
            </li>
            <li className='listItem'>
                <img src= "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" alt='' className='listImg'/>
                <div className='wordSearch'>
                    <span className='word'>Lion</span>
                    
                </div>
                <button className='boardButton'>
                    Display
                </button>
            </li>
            <li className='listItem'>
                <img src= "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" alt='' className='listImg'/>
                <div className='wordSearch'>
                    <span className='word'>Lion</span>
                    
                </div>
                <button className='boardButton'>
                    Display
                </button>
            </li>
        </ul>
    </div>
  )
}

