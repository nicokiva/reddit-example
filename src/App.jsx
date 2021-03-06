import { makeStyles } from '@material-ui/core/styles';
import { Main } from './components/Main';

const useStyles = makeStyles(() => ({
  root: {
      display: 'flex',
      backgroundColor: '#ffecd9',
      overflow: 'hidden',
      textAlign: 'center'
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Main />
    </div>
  );
}

export default App