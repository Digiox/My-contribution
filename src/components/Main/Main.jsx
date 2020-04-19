import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import "./main.css"
import introIMG from "../../assets/imgs/undraw_version_control_9bpv.svg"
import OSPList from '../Project list/OSPList';
import firebase from "../../firebase-config/firebaseConfig"
import AddProject from '../addProject/AddProject';
import store from '../../redux/store'
import PopupModal from '../../molecules/PopupModal'



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        zIndex: 0
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    main_body_section: {
        marginTop: "5%",
        justifyContent: "center",
        display: "flex",
        marginBottom: "30px"
    },
    main_img_container: {
        position: "relative", display: "flex", justifyContent: "center", width: "30%", [theme.breakpoints.only('xs')]: {
            fontSize: "0.9em",
            width: "70%"
        },
    },
    main_intro_text: { position: "absolute", top: "25%" },
    main_intro_img: {
        width: "100%"
    },
    sectionTitle_main_content: {
        display: "flex",
        width: "100%",
        backgroundColor: "#3F51B5",
        justifyContent: "space-between"
    },
    main_content_title: {
        padding: "10px",
        color: "white"
    },
    alert: {
        zIndex: "1000"

    }
}));
const db = firebase.firestore()


export default function Main() {


    const classes = useStyles();
    const auth = true
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [datas, setDatas] = useState([])
    const [showAddProject, setShowAddProject] = useState(false)
   


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    useEffect(() => {
        store.getState()
        if (datas.length < 1) {
            db.collection("repos").get().then((data) => {
                let newState = []
                data.forEach(async (doc) => {
                    newState.push(doc.data())
                })
                setDatas(newState)
            })
        }
    })

    return (
        <div className={classes.root}>
            <PopupModal />
            <AddProject callBack={(openState) => setShowAddProject(openState)} show={showAddProject} />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        My contribution
          </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={false}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <section className={classes.main_body_section}>
                <div id="main_div_img_container" className={classes.main_img_container}>
                    <img id="main_intro_img" className={classes.main_intro_img} src={introIMG} alt="versioning-img" />
                    <h2 className={classes.main_intro_text}>Ne cherchez plus de projets, vous venez de les trouver</h2>
                </div>
            </section>
            <section>
                <div className={classes.sectionTitle_main_content}>
                    <h2 className={classes.main_content_title}>Open source projects</h2>
                    <Button onClick={() => {setShowAddProject(true)}} color="secondary">Ajouter un projet</Button>
                </div>
                <OSPList datas={datas} />
            </section>
        </div>);
}