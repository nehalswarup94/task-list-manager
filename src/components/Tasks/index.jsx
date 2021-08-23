import React from 'react';
import TaskList from './TaskList';
import'./index.scss';

const Tasks = props => {
    return (
        <div>
            {props.tasks.map((el)=>{
                return <TaskList key={el.id}task={el} onDelete={props.onDelete} onToggle={props.onToggle}/>
            })}
        </div>
    )
}

export default Tasks;
