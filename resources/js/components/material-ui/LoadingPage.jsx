import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function LoadingPage(props) {
  return (
    <div>
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
        　now loading...({props.completed}%)
      </Backdrop>
      <LinearProgress variant="determinate" value={props.completed} />       
    </div>
  );
}
