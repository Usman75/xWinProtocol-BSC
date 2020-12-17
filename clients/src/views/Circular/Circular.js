import React, { forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next'


import {
  Card,
  Dialog,
  DialogContent,
  CircularProgress
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {}
}));

const Circular = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const { t } = useTranslation()
  
  const [openProgress, setOpenProgress] = React.useState(false);
  
  const handleOpen = (open) => {
    setOpenProgress(open);
  }
  
  const handleCloseProgress = () => {
    setOpenProgress(false);
  }

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen,
    };
  });

  

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Dialog
        className={classes.dialog}
        open={openProgress}
        keepMounted
        onClose={handleCloseProgress}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className={classes.divcircular}>
            <CircularProgress 
              color="secondary" 
              size={50}
              thickness={4}
            />
        </DialogContent>
      </Dialog>

    </Card>
  );
});

Circular.propTypes = {
  className: PropTypes.string
};

export default Circular;
