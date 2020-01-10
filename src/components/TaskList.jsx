import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let tasks = this.props.tasks.map((task, index) => {
      return (
        <li className='list-group-item' key={task.name}>
          <h6>{task.taskName}</h6>
          <div>
            <FontAwesomeIcon
              icon={faEdit}
              className='right'
              data-index={index}
              onClick={this.props.openTaskModal}
            />
          </div>

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
