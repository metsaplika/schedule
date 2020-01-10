import React from 'react';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let tasks = this.props.tasks.map(task => {
      return (
        <li className='list-group-item' key={task.name}>
          <h6>{task.taskName}</h6>
          <p className='item'>
            {task.startDate} - {task.endDate}
          </p>
        </li>
      );
    });
    return <ul className='list-group'>{tasks}</ul>;
  }
}

export default TaskList;
