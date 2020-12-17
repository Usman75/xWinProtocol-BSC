import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  AppBar, Toolbar, IconButton, Tooltip, Typography,
  Menu,
  MenuItem
} from '@material-ui/core';
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@material-ui/icons/Language';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  whiteColor: {
    color: "white"
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: theme.palette.secondary.main,
  },
  quoteTextPrimary: {
    color: theme.palette.primary.main,
    //fontWeight: 300
  },
  appbar: {
    backgroundColor: theme.palette.white,
    //fontWeight: 300
  },

}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
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

const handleClickLink = (linkname) => event => {
  window.open('/'+linkname,"_self")
  handleClose()
};

  const handleClose = () => {
    setAnchorEl(null);
  };

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
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

//export default Topbar;
export default withRouter(Topbar);
