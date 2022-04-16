import axios from "axios";
import React , { useEffect, useState }from 'react'
import "./widgetBoard.css"

export default function WidgetBoard() {

    const [word, setWord]= useState([]);
    useEffect(() => {
        try {
            axios.get("http://localhost:3000/animals/getTopAnimal").then(res=>{
                setWord(res.data);
            });
            console.log(word);
        } catch (err) {
            console.log(err);
        }
    },[]);
  return (
    <div className='widgetBoard'>
        <span className='boardTitle'>Top 5 search</span>
        <ul className='boardList'>
            {
                word.map((item,index)=>{
                    return (
                        <li className='listItem'>
                        <img src= {item.image} alt='' className='listImg'/>
                        <div className='wordSearch'>
                            <span className='word'>{item.name}</span>
                            
                        </div>
                        <button disabled className='boardButton'>
                            {item.count} times
                        </button>
                    </li>
                    )

                })
            }
           
        </ul>
    </div>
  )
}

