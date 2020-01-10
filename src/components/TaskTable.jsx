import React from 'react';
import moment from 'moment';

class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      qrt: moment().quarter(),
      year: moment().year()
    };
    this.openTaskModal = props.openTaskModal;

    this.currentQuarters = this.getQuarters()[this.state.qrt - 1];
  }
  /**
   * Update component
   * @param {nextProps} nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ tasks: nextProps.tasks });
    this.forceUpdate();
  }
  /**
   * Move to next Quarter view
   */
  goNextQuarter = () => {
    let quarter;
    if (this.state.qrt === 4) {
      quarter = 1;
      this.setState({ year: this.state.year + 1 });
    } else {
      quarter = this.state.qrt + 1;
    }
    this.setState({ qrt: quarter });
    this.forceUpdate();
  };

  /**
   * Move to previos Quarter view
   */
  goPrevQuarter = () => {
    let quarter;
    if (this.state.qrt === 1) {
      quarter = 4;
      this.setState({ year: this.state.year - 1 });
    } else {
      quarter = this.state.qrt - 1;
    }
    this.setState({ qrt: quarter });
    this.forceUpdate();
  };

  /**
   * get quarters array
   * @return {array}- quarters
   */
  getQuarters() {
    let months = moment.months();
    const quarters = [];
    while (months.length > 0) {
      const chunk = months.splice(0, 3);
      quarters.push(chunk);
    }
    return quarters;
  }
  /**
   * get array of week nmbers
   * @return {array} - weekNumbers
   */
  getWeeksInQuarter = () => {
    const startMon = this.currentQuarters[0];
    const endMon = this.currentQuarters[2];
    const endDate = moment(
      endMon + '-' + this.state.year,
      'MMMM'
    ).daysInMonth();
    const start = '01-' + startMon + '-' + this.state.year;
    const end = endDate + '-' + endMon + '-' + this.state.year;
    const weeknumberStart =
      moment(start, 'DDMMMMYYYY').isoWeek() > 49
        ? 1
        : moment(start, 'DDMMMMYYYY').isoWeek();
    const weeknumberEnd =
      moment(end, 'DDMMMMYYYY').isoWeek() !== 1
        ? moment(end, 'DDMMMMYYYY').isoWeek()
        : moment(end, 'DDMMMMYYYY').weeksInYear();

    let weeks = [];
    for (let i = weeknumberStart; i <= weeknumberEnd; i++) {
      weeks.push(i);
    }
    return weeks;
  };

  /**
   * Get tasks in current quarter
   * @return {obj} - tasks
   */
  getTasks() {
    let tasks = [];
    this.state.tasks.forEach(task => {
      if (tasks.length < 11) {
        if (
          (moment(task.startDate, 'YYYYMMDD').year() === this.state.year &&
            this.getWeeksInQuarter().includes(
              moment(task.startDate, 'YYYYMMDD').isoWeek()
            )) ||
          (moment(task.endDate, 'YYYYMMDD').year() === this.state.year &&
            this.getWeeksInQuarter().includes(
              moment(task.endDate, 'YYYYMMDD').isoWeek()
            ))
        ) {
          tasks.push(task);
        }
      }
    });
    return tasks;
  }
  getTableData = () => {
    let rows = [];
    this.getTasks().forEach((task, i) => {
      const startWeek = moment(task.startDate, 'YYYYMMDD').isoWeek();
      const endWeek = moment(task.endDate, 'YYYYMMDD').isoWeek();
      let row = [];
      this.getWeeksInQuarter().forEach(week => {
        let className;
        let index;
        if (week >= startWeek && week <= endWeek) {
          className = 'active-week';
          index = i;
        } else {
          className = 'bg-light';
        }
        row.push(
          <div
            key={week}
            className={'col week ' + className}
            data-index={index}
            onClick={this.openTaskModal}
          ></div>
        );
      });
      rows.push(<div className='row mt-1'>{row}</div>);
    });

    return rows;
  };

  render() {
    this.currentQuarters = this.getQuarters()[this.state.qrt - 1];
    //array of months
    const quarter = this.currentQuarters.map(q => {
      return (
        <div className='col' key={q}>
          {q}
        </div>
      );
    });
    const weeks = this.getWeeksInQuarter().map(weekNr => {
      return (
        <div className='col' key={weekNr}>
          {weekNr}
        </div>
      );
    });

    return (
      <div className='container tasks-container mx-auto'>
        <div className='row'>{quarter}</div>
        <div className='row'>{weeks}</div>
        <div>{this.getTableData()}</div>

        <span onClick={this.goPrevQuarter} className='inline-el left text-info'>
          Prev
        </span>
        <span
          onClick={this.goNextQuarter}
          className='inline-el right text-info'
        >
          Next
        </span>
      </div>
    );
  }
}

export default TaskTable;
