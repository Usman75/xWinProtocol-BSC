import React, { forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next'
import CancelIcon from '@material-ui/icons/Cancel';
import { Alert, AlertTitle } from '@material-ui/lab';


import {
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const PopupMessage = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation()
  
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [showImage, setShowImage] = React.useState(false);
  const [imagePath, setImagePath] = React.useState("");
  const [msgStatus, setMsgStatus] = React.useState("info");
  
  const handleShowImage = (yesno, path, msg, status) => {
    setShowImage(yesno)
    setImagePath(path)
    setMsg(msg)
    setOpen(true);
    setMsgStatus(status);
  }

  const handleOpen = (msg, status) => {
    
    setMsg(msg)
    setOpen(true);
    setMsgStatus(status);
  }
  
  const handleClose = () => {
    setMsg("")
    setOpen(false);
    setShowImage(false)
    setImagePath("")
  }

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen,
      handleShowImage: handleShowImage
    };
  });

  const getImageTag = () => {

    if(showImage){
      return <DialogContentText id="alert-dialog-slide-description" align="center"><img alt="" className={classes.image} src={imagePath}/></DialogContentText>
    }else{
      return ""
    }
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth = {'sm'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle id="alert-dialog-slide-title">{""}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
            <Alert severity={msgStatus}>
              <AlertTitle><Typography variant="h5">{msgStatus.toUpperCase()}</Typography></AlertTitle>
                {msg}
            </Alert>
          </DialogContentText>
            {getImageTag()}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            color="primary"
            startIcon={<CancelIcon />}>
            {t('common.close.button')}
          </Button>
        </DialogActions>
      </Dialog>
      
      

    </Card>
  );
});

PopupMessage.propTypes = {
  className: PropTypes.string
};

export default PopupMessage;
