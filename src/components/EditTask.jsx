import React from 'react';

const EditTask = props => {
  return (
    <div className='info-container container'>
      <div className='row'>
        <div className='col'>
          <h3>{props.task.taskName}</h3>
          <p className=''>
            {props.task.startDate} - {props.task.endDate}
          </p>
        </div>
      </div>
      <div className='form-container pt-3'>
        <form onSubmit={props.editTask}>
          <div className='row'>
            <div className='col'>
              <label className='left'>Task name</label>
              <input
                type='text'
                className='form-control'
                name='taskName'
                placeholder={props.task.TaskName}
              />
            </div>
          </div>
          <div className='row pt-2'>
            <div className='col'>
              <label className='left'>Start date</label>
              <input
                value={props.task.TaskName}
                name='startDate'
                type='date'
                placeholder='Start date'
                className='inline-el left'
              />
            </div>

            <div className='col'>
              <label className='left end-date'>End date</label>
              <input
                name='endDate'
                type='date'
                placeholder='End date'
                className='inline-el right'
              />
            </div>
          </div>
          <div className='py-2 button-wrapper'>
            <button className='btn btn-info right'>Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
