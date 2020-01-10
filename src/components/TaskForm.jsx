import React from 'react';

const TaskForm = props => {
  return (
    <div className=''>
      <form onSubmit={props.saveTask}>
        <div className='form-row'>
          <div className='col'>
            <input
              type='text'
              className='form-control mt-4'
              name='taskName'
              placeholder='Task name'
            />
          </div>
        </div>
        <div className='form-row pt-2'>
          <div className='col-md-6'>
            <div className='md-form mt-0'>
              <input
                name='startDate'
                type='date'
                placeholder='Start date'
                className='left'
                value={props.startDate}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='md-form mt-0'>
              <input
                name='endDate'
                type='date'
                placeholder='End date'
                className='right'
              />
            </div>
          </div>
        </div>
        <div className='py-2 button-wrapper'>
          <button className='btn btn-info right'>Add task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
