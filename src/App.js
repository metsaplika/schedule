import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskTable from './components/TaskTable';
import EditTask from './components/EditTask';
import moment from 'moment';

class App extends React.Component {
  state = {
    tasks: [
      { taskName: 'testin', startDate: '2019-05-01', endDate: '2020-01-25' },
      { taskName: 'testin', startDate: '2019-12-01', endDate: '2020-01-25' },
      { taskName: 'testin', startDate: '2020-03-01', endDate: '2021-01-25' },
      { taskName: 'testin', startDate: '2020-01-23', endDate: '2020-08-25' }
    ],
    showModal: false,
    editableTask: undefined
  };

  /**
   * handle field change
   */
  saveTask = e => {
    e.preventDefault();
    const objectSize = Object.keys(this.state.tasks).length;
    const taskName = e.target.elements.taskName.value;
    const startDate = e.target.elements.startDate.value;
    const endDate = e.target.elements.endDate.value;

    if (taskName.length && startDate.length && endDate.length) {
      if (moment(endDate).isAfter(startDate)) {
        this.setState({
          tasks: [
            ...this.state.tasks,
            { taskName: taskName, startDate: startDate, endDate: endDate }
          ]
        });
      } else {
        alert('End date must be after start date');
      }
    } else {
      alert('To save new task, all fields must be filled');
    }
  };


  /**
   * Open model to edit task
   */
  openTaskModal = e => {
    if (e.target.getAttribute('data-index') !== null) {
      this.state.editableTask = parseInt(e.target.getAttribute('data-index'));
      this.handleModal();
    }
  };

  /**
   * open and close model
   */
  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  /**
   * edit selected task
   */
  editTask = e => {
    e.preventDefault();
    const index = this.state.editableTask;
    const taskName = e.target.elements.taskName.value;
    const startDate = e.target.elements.startDate.value;
    const endDate = e.target.elements.endDate.value;

    if (taskName.length && startDate.length && endDate.length) {
      if (moment(endDate).isAfter(startDate)) {
        // 1. Make a shallow copy of the items
        let tasks = [...this.state.tasks];
        // 2. Make a shallow copy of the item you want to mutate
        let task = { ...tasks[index] };
        // 3. Replace the property you're intested in
        task = {
          taskName: taskName,
          startDate: startDate,
          endDate: endDate
        };
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        tasks[index] = task;
        // 5. Set the state to our new copy
        this.setState({ tasks });

        this.handleModal();
      } else {
        alert('End date must be after start date');
      }
    } else {
      alert('To save new task, all fields must be filled');
    }
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <TaskForm saveTask={this.saveTask} startDate={'2020-01-22'} />
            <TaskList
              tasks={this.state.tasks}
              openTaskModal={this.openTaskModal}
            />
          </div>
          <div className='col-8'>
            <TaskTable
              className='inline-el'
              tasks={this.state.tasks}
              openTaskModal={this.openTaskModal}
            />
          </div>
        </div>
        <div>
          <Modal show={this.state.showModal} onHide={this.handleModal}>
            <Modal.Header className='modal-header'>
              Edit task
              <span className='top-right mr-2' onClick={this.handleModal}>
                X
              </span>
            </Modal.Header>
            <Modal.Body>
              <EditTask
                task={this.state.tasks[this.state.editableTask]}
                handleModal={this.handleModal}
                editTask={this.editTask}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
