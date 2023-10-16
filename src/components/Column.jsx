import React, { useMemo } from 'react'
import './styles/Column.css'
import Task from './Task'
import { useStore } from '../stores/store'
import { useState } from 'react'
import classNames from 'classnames'

const Column = ({state}) => {
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [drop, setDrop] = useState(false)
    const [dropTask, setDropTask] = useState(false)

    //call state variable/functions in zustand store
    const taskz = useStore(store => 
        store.tasks//.filter(task => task.state === state)
    )   
    const addTask = useStore(store => store.addTask)
    const setDraggedTask = useStore(store => store.setDraggedTask)
    const draggedTask = useStore(store => store.draggedTask)
    const moveTask = useStore(store => store.moveTask)

    const tasks = useMemo(
        () => taskz.filter(task => task.state === state),
        [taskz, state]
    )

    const handleDragOver = (e) => {
        e.preventDefault()
        setDrop(true) //to show broken white lines
        moveTask(draggedTask, state)
        setDropTask(true)
    } //A dragged element is over the drop target

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDrop(false) //to show broken white lines
        setDropTask(false)
    } //A dragged element leaves the drop target

    const handleDrop = (e) => {
        e.preventDefault()
        setDrop(false) ////to show broken white lines
        moveTask(draggedTask, state)
        setDraggedTask(null)      
        setDropTask(false)
    } //A dragged element is dropped on the target

    return (
        <div 
            className={classNames('column', {drop: drop})} 
            onDragOver={(e) => handleDragOver(e)} 
            onDragLeave={(e) => handleDragLeave(e)} 
            onDrop={(e) => handleDrop(e)} 
        >
            <div className='titleWrapper'>
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>

            {tasks.map(task => {
                if (task.title === draggedTask) {
                    return (
                        <Task 
                            key={task.title} 
                            title={task.title} 
                            setDropTask={setDropTask} 
                            dropTask={dropTask} 
                        />
                    )
                }else{
                    return (
                        <Task 
                            key={task.title} 
                            title={task.title} 
                        />
                    )
                }
            })}
            {open && 
                <div className="modal">
                    <div className='modalContent'>
                        <input 
                            type="text"
                            value={text} 
                            onChange={e => setText(e.target.value)} 
                        />
                        <button onClick={() => {
                            addTask(text, state)
                            setText('')
                            setOpen(false)
                        }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Column