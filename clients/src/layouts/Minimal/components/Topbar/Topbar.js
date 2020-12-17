import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar,
  Tooltip,
  IconButton,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  whiteColor: {
    color: "white"
  },
  quoteText: {
    color: theme.palette.primary,
    //fontWeight: 300
  },
  appbar: {
    backgroundColor: theme.palette.white,
    //fontWeight: 300
  },
  quoteTextPrimary: {
    color: theme.palette.primary.main,
    //fontWeight: 300
  },
  div: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  divsmall: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  divcircular: {
    padding: theme.spacing(4),
    alignItems: 'center',
  },
  dialog : {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  }
}));


const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClickLink = (linkname) => event => {

    window.open('/'+linkname,"_self")
    handleClose()
  };
  
  const getLoginMenu = () => {
      return <div>
          <Tooltip title={'Fund List'} arrow={true}>
            <IconButton 
                color="inherit"
                onClick={handleClickLink("funds")}
              >
                <Typography
                  className={classes.quoteTextPrimary}
                  variant="h6"
                >
                  {'Fund List'}
                </Typography>
            </IconButton>
          </Tooltip>
          {/* <Tooltip title={t('menu.faq')} arrow={true}>
            <IconButton 
                color="inherit"
                onClick={handleClickLink("faq")}
              >
                
                <Typography
                  className={classes.quoteTextPrimary}
                  variant="h6"
                >
                  {t('menu.faq')}
                </Typography>
            </IconButton>
          </Tooltip> */}
          <Tooltip title={"FAQ"} arrow={true}>
            <IconButton 
                color="inherit"
                onClick={handleClickLink("faqbsc")}
              >
                
                <Typography
                  className={classes.quoteTextPrimary}
                  variant="h6"
                >
                  {"FAQ BSC"}
                </Typography>
            </IconButton>
          </Tooltip>
        </div> 
  }


  return (
    <AppBar
    appbar
    className={classes.appbar}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/images/logos/rogo_fix2.png"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <div className={classes.quoteTextPrimary}>
            {getLoginMenu()}
          </div>  
      </Toolbar>
      
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

//export default Topbar;
export default withRouter(Topbar);
