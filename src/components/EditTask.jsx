import React from 'react';

const EditTask = props => {
  return (
    <div className='form-container'>
      <form onSubmit={props.editTask}>
        <div className='form-row'>
          <div className='col'>
            <p>{props.task.TaskName}</p>
            <input
              type='text'
              className='form-control mt-4'
              name='taskName'
              placeholder={props.task.TaskName}
            />
          </div>
        </div>
        <div className='form-row pt-2'>
          <div className='md-form mt-0'>
            <input
              value={props.task.TaskName}
              name='startDate'
              type='date'
              placeholder='Start date'
              className='inline-el'
            />
          </div>

          <div className='md-form mt-0'>
            <input
              name='endDate'
              type='date'
              placeholder='End date'
              className='inline-el right'
            />
          </div>
        </div>
        <div className='py-2 button-wrapper'>
          <button className='btn btn-info right'>Save task</button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
