import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    '&:hover': {
      color: 'white',
      textDecoration: 'none'
    },
    color: 'white'
  },
  toRight: {
    marginLeft: 'auto'
  }
};

function Header(props) {
  const { classes } = props;
  const isLoggedIn = Boolean(props.user);
  const buttons = isLoggedIn ? LoggedInButtons(props) : ReportBugButton(props);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            <a href="/" className={classes.link}>
              LabDay - Wydział Chemiczny
            </a>
          </Typography>
          <div className={classes.toRight}>
              {buttons}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
function ReportBugButton(props) {
  const { classes } = props;
  return (
        <Button color="inherit">
            <a href="/bug" className={classes.link}>
                Zgłoś błąd
            </a>
        </Button>
    )
}

function LoggedInButtons(props){
    const { classes } = props;
    return (
      <div>
          <Button disabled={true} className={classes.menuButton}>
              <Typography variant="h6" color="inherit" className={classes.link}>
                  {props.user.username}
              </Typography>
          </Button>
          {ReportBugButton(props)}
          <Button color="inherit">
              <a href="/logout" className={classes.link}>
                  Logout
              </a>
          </Button>
      </div>
  )
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    const { user } = state.authentication;
    return { user };
}
export default connect(mapStateToProps)(withStyles(styles)(Header));
