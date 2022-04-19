import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDetails from './ProfileDetails'
import TaskItem from './TaskItem'
import TaskItemsInprogress from './TaskItemsInprogress'
import TaskItemsDone from "./TaskItemsDone"
// import "./myApp.css"

export default function Home () {
    return (
      <div>
        <h1>Home</h1>
  
        <div className='Home'>
          <div className='sideBar'><ProfileDetails/></div>
          <div className='toDo'><h1 className='headingNae1'>ToDo</h1> <TaskItem/></div>
          <div className='inProgress'><h1 className='headingNae2'>Inprogress</h1><TaskItemsInprogress/></div>
          <div className='done'><h1 className='headingNae3'>Done</h1> <TaskItemsDone/></div>
        </div>
      </div>
    )
  }