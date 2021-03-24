import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { useModal } from '_providers/Modal';

import Login from '_components/forms/login';
import Register from '_components/forms/register';
import ForgotPwd from '_components/forms/forgotpwd';

const ModalContent = {
  login: {
    content: Login,
  },
  register: {
    content: Register,
  },
  forgotpwd: {
    content: ForgotPwd,
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    border: '0.2px solid grey',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20,
      marginRight: 20,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
}));

export default function ModalManager() {
  const classes = useStyles();
  const { modal, closeModal } = useModal();

  const Content = ModalContent[modal.type] && ModalContent[modal.type].content;
  if (!Content) return null;

  return (
    <div>
      <Modal
        open={modal.open}
        onClose={closeModal}
        className={classes.modal}
        disablePortal
      >
        <div className={classes.paper}>
          <Content />
        </div>
      </Modal>
    </div>
  );
}
