import React from 'react';
import {  
  millisecondsToHuman,
  newTimer,
  findById,
  renderElapsedString } from './helpers.js';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import ButtonGroup from '@mui/material/ButtonGroup';
  
function App() {

  const theme = useTheme();

  class TimersDashboard extends React.Component {
    render() {
      return (
        <Container maxWidth='sm'>
          <div className='column'>
            <EditableTimerList />
            <ToggleableTimerForm
              isOpen={true}
            />
          </div>
        </Container>
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
          <Box sx={{textAlign: 'center' }}>
            <Button variant='contained'><AddIcon></AddIcon></Button>
          </Box>
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
        <Card variant='outlined' sx={{ textAlign: 'center', mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', flexWrap: 'wrap' }}>
                <Typography component='div' variant='h5'>
                  {this.props.title}
                </Typography>
                <Typography variant='subtitle1' color='text.secondary' component='div'>
                  {this.props.project}
                </Typography>
              </Box>
              <Box>
                <EditIcon></EditIcon><DeleteForeverIcon></DeleteForeverIcon>
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
    render() {
      const submitText = this.props.title ? 'Update' : 'Create';
      return (
        <Card variant='outlined' sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ mb: 2 }}>
                <InputLabel htmlFor='component-simple'>Title</InputLabel>
                <Input id='component-simple' value={this.props.title} sx={{ mb: 2 }}/>
                <InputLabel htmlFor='component-simple'>Project</InputLabel>
                <Input id='component-simple' value={this.props.project} sx={{ mb: 2 }}/>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <ButtonGroup disableElevation>
                <Button variant='contained'>{submitText}</Button>
                <Button variant='outlined'>Cancel</Button>
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
        <Typography variant='h2' sx={{ textAlign: 'center', fontWeight: 300 }} my={2} className='app-title'>Timers</Typography>
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
