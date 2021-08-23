import React, { useState } from 'react';
import './index.scss';

const AddTask = (props) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!text){
            alert('Please add task');
            return;
        }

        props.onAdd({text, day, reminder});
        setText('');
        setDay('')
        setReminder(false);
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label className='label'>Task</label>
                <input className='text-field' type='text'
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label className='label'>Day & Time</label>
                <input className='text-field' type='text' placeholder='Add Day and Time'
                value={day}
                onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control reminder-check'>
                <label className='label'>Set Reminer</label>
                <input type='checkbox' 
                value={reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <input type='submit' value='Save Task' className='save' />

        </form>
    )
}

export default AddTask
