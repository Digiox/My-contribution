import React, { useState, useEffect } from 'react'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles'
import Button from '../atoms/Button'
import { isMobileOnly } from "react-device-detect"

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      margin: theme.spacing(0, 2),
      textAlign: 'center'
    },
  }));

const PopupModal = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleModalClose = () => {
        localStorage.setItem('popupAccepted', true)
        setOpen(false)
    }

    useEffect(() => {
        const popupAccepted = JSON.parse(localStorage.getItem('popupAccepted'))

        if (!popupAccepted && isMobileOnly) {
            setOpen(true)
        }
    }, [])

    const modalBody =  (
        <div>
            <p>Pour une experience optimale, il est conseillé d'utiliser My contribution sur un ordinateur</p>
            <Button onClick={handleModalClose}>J'ai compris!</Button>
        </div>
    )

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
    >
            <Fade
                in={open}
                className={classes.paper}
            >
                {modalBody}
            </Fade>
        </Modal>
    )
}

export default PopupModal