import { create } from 'zustand';
//devtools is for debugging while persist is to save task in local storage
import { devtools, persist } from 'zustand/middleware'

const store = (set) => ({
    tasks: [],
    draggedTask: null,

    addTask: (title, state) => set(store => (
            { 
                tasks: [{ title, state }, ...store.tasks]
            }
        ), 
        false, 
        'addTask'
    ), //add task to array tasks: []

    deleteTask: (title) => set(store => (
            { 
                tasks: store.tasks.filter(task => task.title !== title)
            }
        ), 
        false, 
        'deleteTask'
    ), //delete task to array tasks: []
    
    setDraggedTask: (title) => set(
        {draggedTask: title}, 
        false, 
        'setDraggedTask'
    ), //set or determine task that has been dragged

    //move task or change it's previous state to it's dropped state
    moveTask: (title, state) => set(store => ({ 
        tasks: store.tasks.map(
            task => task.title === title ? {title, state} : task
            )}
        ), 
        false, 
        'moveTask'
    )
})

export const useStore = create(persist(devtools(store), {name: 'store'}))