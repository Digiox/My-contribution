import React, { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ProjectItem from '../Project list/ProjectItem.jsx'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import sendToFireStore from '../../functions/sendToFireStore.js';
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column'
	},
	selectPlaceholder: {
		textAlign: 'center'
	},
	submitProjectButton: {
		marginTop: '3%'
	}
}));

const AddProjectFormWrapper = ({ userDatas, onLoaded }) => {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [selectedData, setSelectedData] = React.useState(null)
	const { addToast } = useToasts()
	

	const handleChange = (event) => {
		setValue(event.target.value)
		userDatas.repos.forEach(element => {
			if (element.name === event.target.value) {
				setSelectedData({
					repoName: element.name,
					repoUrl: element.html_url,
					repoDesc: element.description,
					repoPath: element.full_name,
					repoOwner: element.owner.login
				})
			}
		});
	};

	useEffect(() => {
			onLoaded(true)
	})

	return (
		<form className={classes.form}>
			<TextField defaultValue={userDatas.userName} variant="outlined" />
			<Select onChange={handleChange} value={value} displayEmpty >
				<MenuItem value="" disabled>
					<p className={classes.selectPlaceholder}>Sélectionner un repo</p>
				</MenuItem>
				{userDatas.repos.map(el => <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>)}
			</Select>
			{
				selectedData !== null &&
				<div>
					<h2>Aperçu</h2>
					<ProjectItem
						repoOwner={selectedData.repoOwner}
						repoPath={selectedData.repoPath}
						repoName={selectedData.repoName}
						repoUrl={selectedData.repoUrl}
						repoDesc={selectedData.repoDesc}
					/>
					<Button
						variant="contained"
						color="default"
						onClick={() => { sendToFireStore('projects', selectedData).then(res => addToast('Your project has been succefully added', { appearance: 'success' })).catch(err => addToast("Your project is already in our database...", { appearance: 'error' })) }}
						className={classes.submitProjectButton}
						startIcon={<CloudUploadIcon />}
					>
						Upload
      				</Button>
				</div>
			}
		</form>
	);
}

export default AddProjectFormWrapper;