import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import store from '../../redux/store'
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import makeObjectData from '../../functions/makeReposObjectData'
import AddProjectFormWrapper from './AddProjectFormWrapper';
import { ToastProvider, useToasts } from 'react-toast-notifications'
import ErrorLoadingData from "../Errors/ErrorLoadingDatas.jsx"

const useStyles = makeStyles((theme) => ({
    loadingWrapper: {
        margin: 'auto',
        textAlign: 'center'
    }
}));


const SubmitProjectModal = (props) => {
    const { addToast } = useToasts()
    const classes = useStyles();
    const [userDatas, setDatas] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [submitError, setSubmitError] = useState(false)

    const retrieveUserDatas = () => {
        const token = store.getState().userToken
        const name = store.getState().userProfileObject.login
        setLoaded(false)
        axios.get('https://api.github.com/user/repos', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            makeObjectData(name, res.data).then(data => {
                setDatas(data)
            }).catch(err => setSubmitError(true))
        }).catch(err => setSubmitError(true))
    }



    useEffect(() => {
        if (!userDatas.repos) {
            retrieveUserDatas(userDatas, setDatas)
        }
    }, [setDatas, userDatas])



    const LoadedComponent = (props) => {
        const { addToast } = useToasts()
        console.log(props)

        return (
            <AddProjectFormWrapper onLoaded={() => {
                if (!loaded) {
                    console.log("test")
                    addToast('Saved Successfully', { appearance: 'success' })
                    setLoaded(true)
                }

            }} userDatas={userDatas} />
        )
    }

    const loadingComponent = () => {
        return (
            <div className={classes.loadingWrapper}>
                <h2>Chargement des données...</h2>
                <h4>Nous récupérons vos données github...</h4>
                <LinearProgress />
            </div>)
    }

    return (
        <ToastProvider>
            {submitError ? <ErrorLoadingData onLoaded={() => {
                if (!loaded) {
                    addToast('Error loading your datas', { appearance: 'error' })
                }
            }} /> :
                <div>
                    {!userDatas.repos ? loadingComponent(classes) : <LoadedComponent />}
                </div>}
        </ToastProvider>

    );
}

export default SubmitProjectModal;