import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { deleteTask, getTasks, updateTask } from '../../firebase/providers';
import { Task } from '../../firebase/firebase.interface';
import { Checkbox, CircularProgress, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import moment from 'moment';

interface Props {
  updateTodoTable: boolean,
  handleToggle: ( value: boolean ) => void
}

export const TodoTable = ({ updateTodoTable, handleToggle }: Props) => {

  const uid = useSelector(( state: RootState ) => state.auth.uid )
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState( true )

  useEffect(() => {
    if( uid )
      getUserTasks()
  }, [ uid ])

  useEffect(() => {
    getUserTasks()
  }, [ updateTodoTable ])
  
  const getUserTasks = async () => {
    const results = await getTasks( uid! )
    setTasks( results )
    setIsLoading( false )
  }

  const updateTaskFromFB = ( task: Task ) => {
    handleToggle( true )
    updateTask( uid!, task )
    getUserTasks()
    setTimeout(() => {
      handleToggle( false )
    }, 500);
  }

  const deleteTaskFromFB = ( id: string ) => {
    handleToggle( true )
    deleteTask( id )
    getUserTasks()
    setTimeout(() => {
      handleToggle( false )
    }, 500);
  }

  if( isLoading )
    return <CircularProgress />

  return (
    <>
      {
        ( tasks.length > 0 )
        ? (
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell align="center">Done</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map(( task ) => (
                  <TableRow
                    key={ task.id }
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography>
                        { task.name }
                      </Typography>
                      <Typography variant='caption' color="secondary.main">
                        Created at { moment( task.created_at ).format('LLL') }
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox 
                        onChange={ () => updateTaskFromFB( task ) } 
                        checked={ task.done ? true : false }
                        color="secondary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={ () => deleteTaskFromFB( task.id ) }
                      >
                        <DeleteIcon color='secondary'/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
        :  <Typography>No data yet</Typography>
      }
    </>
  );
}