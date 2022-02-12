import React from 'react';
import {  
  millisecondsToHuman,
  newTimer,
  findById,
  renderElapsedString } from './helpers.js';

function App() {

  class TimersDashboard extends React.Component {
    render() {
      return (
        <div className='centered-grid'>
          <div className='column'>
            <EditableTimerList />
            <ToggleableTimerForm
              isOpen={true}
            />
          </div>
        </div>
      );
    }
  }

  class ToggleableTimerForm extends React.Component {
    render() {
      if (this.props.isOpen) {
        return (
          <TimerForm />
        );
      } else {
        return (
          <div className='plus-button-container'>
            { /* TODO: add plus icon for create new timer button */ }
          </div>
        );
      }
    }
  }

  class EditableTimerList extends React.Component {
    render() {
      return (
        <div id='timers'>
          <EditableTimer
            title='Learn React'
            project='Web Domination'
            elapsed='8986300'
            runningSince={null}
            editFormOpen={false}
          />
          <EditableTimer
            title='Watch Ted Lasso'
            project='Football is Life'
            elapsed='3890985'
            runningSince={null}
            editFormOpen={true}
          />
        </div>
      );
    }
  }

  class EditableTimer extends React.Component {
    render() {
      if (this.props.editFormOpen) {
        return (
          <TimerForm
            title={this.props.title}
            project={this.props.project}
          />
        );
      } else {
        return (
          <Timer
            title={this.props.title}
            project={this.props.project}
            elapsed={this.props.elapsed}
            runningSince={this.props.runningSince}
          />
        );
      }
    }
  }

  class Timer extends React.Component {
    render() {
      const elapsedString = renderElapsedString(this.props.elapsed);
      return (
        <div className='centered-card'>
          <div className='card-content'>
            <div className='header'>
              {this.props.title}
            </div>
            <div className='meta'>
              {this.props.project}
            </div>
            <div className='description'>
              <h2>
                {elapsedString}
              </h2>
            </div>
            <div className='timer-options'>
              { /* TODO: add buttons for deleting or editing timer */ }
            </div>
          </div>
          <div className='ui bottom attached blue basic button'>
            Start
          </div>
        </div>
      );
    }
  }

  class TimerForm extends React.Component {
    render() {
      const submitText = this.props.title ? 'Update' : 'Create';
      return (
        <div className='ui centered card'>
          <div className='content'>
            <div className='form'>
              <div className='field'>
                <label>Title</label>
                <input type='text' defaultValue={this.props.title} />
              </div>
              <div className='field'>
                <label>Project</label>
                <input type='text' defaultValue={this.props.project} />
              </div>
              <div className='bottom-buttons-container'>
                <button className='button submit-button'>
                  {submitText}
                </button>
                <button className='button cancel-button'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Timers</h1>
      </header>
        <div id="main" className="main">
          <div id="content">
            <TimersDashboard />,
          </div>
        </div>
    </div>
  );
}

export default App;
