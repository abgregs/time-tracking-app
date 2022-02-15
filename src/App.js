import React from 'react';
import * as helpers from './helpers.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { v4 as uuidv4 } from 'uuid';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import ButtonGroup from '@mui/material/ButtonGroup';
import { IconButton } from '@mui/material';
  
function App() {

  const theme = useTheme();

  class TimersDashboard extends React.Component {
    state = {
      timers: [
        {
          title: 'Learn React',
          project: 'Web Domination',
          id: uuidv4(),
          elapsed: 8986300,
          runningSince: Date.now(),
        },
        {
          title: 'Watch Ted Lasso',
          project: 'Football is Life',
          id: uuidv4(),
          elapsed: 3890985,
          runningSince: null,
        },
      ],
    };

    handleEditFormSubmit = (attrs) => {
      this.updateTimer(attrs);
    };

    handleCreateFormSubmit = (timer) => {
      this.createTimer(timer);
    };

    updateTimer = (attrs) => {
      this.setState({
        timers: this.state.timers.map((timer) => 
        {
          if (timer.id === attrs.id) {
            return Object.assign({}, timer, {
              title: attrs.title,
              project: attrs.project,
            });
          } else {
            return timer;
          }
        })
      });
    }

    createTimer = (timer) => {
      const t = helpers.newTimer(timer);
      this.setState({
        timers: this.state.timers.concat(t),
      });
    };

    render() {
      return (
        <Container maxWidth='sm'>
          <div className='column'>
            <EditableTimerList 
              timers={this.state.timers}
              onFormSubmit={this.handleEditFormSubmit}
            />
            <ToggleableTimerForm
              onFormSubmit={this.handleCreateFormSubmit}
            />
          </div>
        </Container>
      );
    }
  }

  class ToggleableTimerForm extends React.Component {
    state = {
      isOpen: false,
    };
  
    handleFormOpen = () => {
      this.setState({ isOpen: true });
    };

    handleFormClose = () => {
      this.setState({ isOpen: false });
    };
  
    handleFormSubmit = (timer) => {
      this.props.onFormSubmit(timer);
      this.setState({ isOpen: false });
    };

    render() {
      if (this.state.isOpen) {
        return (
          <TimerForm 
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
          />
        );
      } else {
        return (
          <Box sx={{textAlign: 'center' }}>
            <Button variant='contained' onClick={this.handleFormOpen}><AddIcon></AddIcon></Button>
          </Box>
        );
      }
    }
  }

  class EditableTimerList extends React.Component {
    render() {
      const timers = this.props.timers.map((timer) => (
        <EditableTimer
          key={timer.id}
          id={timer.id}
          title={timer.title}
          project={timer.project}
          elapsed={timer.elapsed}
          runningSince={timer.runningSince}
          onFormSubmit={this.props.onFormSubmit}
        />
      ));
      return (
        <div id='timers'>
          {timers}
        </div>
      )
    }
  }

  class EditableTimer extends React.Component {
    state = {
      editFormOpen: false,
    };

    handleEditClick = () => {
      this.openForm();
    };
  
    handleFormClose = () => {
      this.closeForm();
    };

    handleSubmit = (timer) => {
      this.props.onFormSubmit(timer);
      this.closeForm();
    };
  
    closeForm = () => {
      this.setState({ editFormOpen: false });
    };
  
    openForm = () => {
      this.setState({ editFormOpen: true });
    };

    render() {
      if (this.state.editFormOpen) {
        return (
          <TimerForm
            id={this.props.id}
            title={this.props.title}
            project={this.props.project}
            onFormSubmit={this.handleSubmit}
            onFormClose={this.handleFormClose}
          />
        );
      } else {
        return (
          <Timer
            id={this.props.id}
            title={this.props.title}
            project={this.props.project}
            elapsed={this.props.elapsed}
            runningSince={this.props.runningSince}
            onEditClick={this.handleEditClick}
          />
        );
      }
    }
  }

  class Timer extends React.Component {
    render() {
      const elapsedString = helpers.renderElapsedString(this.props.elapsed);
      return (
        <Card variant='outlined' sx={{ textAlign: 'center', mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flexWrap: 'wrap' }}>
                <Typography component='div' variant='h5' color='text.primary' >
                  {this.props.title}
                </Typography>
                <Typography variant='subtitle1' color='text.secondary' component='div'>
                  {this.props.project}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={this.props.onEditClick} sx={{ color: 'text.primary', '&:hover': { color: 'primary.main'} }}>
                  <EditIcon></EditIcon>
                </IconButton>
                <IconButton sx={{ color: 'text.primary', '&:hover': { color: 'primary.main'} }}>
                  <DeleteForeverIcon></DeleteForeverIcon>
                </IconButton>
              </Box>
            </Box>
            <Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }} color='text.primary' component='div'>
              {elapsedString}
            </Typography>
            <Button variant='contained'>Start</Button>
          </CardContent>
        </Card>
      );
    }
  }

  class TimerForm extends React.Component {
    state = {
      title: this.props.title || '',
      project: this.props.project || '',
    };

    handleSubmit = () => {
      this.props.onFormSubmit({
        id: this.props.id,
        title: this.state.title,
        project: this.state.project,
      });
    };
  
    handleTitleChange = (e) => {
      this.setState({ title: e.target.value });
    };
  
    handleProjectChange = (e) => {
      this.setState({ project: e.target.value });
    };

    render() {
      const submitText = this.props.id ? 'Update' : 'Create';
      return (
        <Card variant='outlined' sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ mb: 4 }}>
                <TextField 
                  label='Title'
                  id='title-field'
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                  variant='standard'
                  sx={{ mb: 2, display: 'block' }}
                />
                <TextField 
                  label='Project'
                  id='project-field'
                  value={this.state.project}
                  onChange={this.handleProjectChange}
                  variant='standard'
                  sx={{ mb: 2, display: 'block' }}
                />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <ButtonGroup disableElevation>
                <Button 
                  variant='contained' 
                  onClick={this.handleSubmit}>
                    {submitText}
                </Button>
                <Button variant='outlined' 
                  onClick={this.props.onFormClose}>
                    Cancel
                </Button>
              </ButtonGroup>
            </Box>
          </CardContent>
        </Card>
      );
    }
  }

  

  return (
    <div className='App'>
      <header className='App-header'>
        <Typography 
          variant='h2' 
          sx={{ textAlign: 'center', fontWeight: 300 }}
          color='text.primary'
          my={2} 
          className='app-title'>
            Timers
        </Typography>
      </header>
        <div id='main' className='main'>
          <div id='content'>
            <TimersDashboard />,
          </div>
        </div>
    </div>
  );
}

export default App;
