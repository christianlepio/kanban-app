import React, { useState } from 'react'
import './styles/Task.css'
import classNames from 'classnames'
import { useStore } from '../stores/store'
import trash from '../assets/trash.svg'

const Task = ({title, dropTask, setDropTask}) => {
    // const [dropTask, setDropTask] = useState(false)

    const task = useStore((store) => 
        store.tasks.find((task) => task.title === title)
        )

    const deleteTask = useStore(store => store.deleteTask)
    const setDraggedTask = useStore(store => store.setDraggedTask) 

    const handleDragStart = () => {
        setDraggedTask(task.title)
        setDropTask(true)
    } //The user starts to drag an element

    const handleDragEnd = () => {
        setDraggedTask(null)
        setDropTask(false)
    } //The user has finished dragging an element

    return (
        <div 
            className={classNames('task', {dropTask: dropTask})} 
            draggable 
            onDragStart={handleDragStart} 
            onDragEnd={handleDragEnd} 
        >
            <div>{task.title}</div>
            <div>description Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero numquam ab totam nihil aliquid aspernatur eius, cupiditate ipsum eaque id! Quidem saepe hic nemo eos tenetur aspernatur recusandae at corporis.</div>
            <div className='bottomWrapper'>
                <div>
                    <img 
                        src={trash} 
                        alt="delete icon" 
                        onClick={() => deleteTask(task.title)}
                    />
                </div>
                <div className={classNames('status', task.state)}>{task.state}</div> 
            </div>
        </div>
    )
}

export default Task