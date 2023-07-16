import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Form, FormData } from '../Form';
import { Game } from '../Home';
import api from '../../services/api';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface Props {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	id: string
	name: string
	cost: number
	category: string
	setListGames: React.Dispatch<React.SetStateAction<Game[]>>
	listGames: Game[]
}

export function FormModal(props: Props) {

	const handleClose = () => props.setOpen(false);

	const onSubmit = async (data: FormData) => {
		try {
			await api.patch(`/edit/${props.id}`, data);

			const newGame = { ...data, id: props.id };
			const changedGameIndex = props.listGames.findIndex((game) => game.id === props.id);

			props.listGames[changedGameIndex] = newGame;

			props.setListGames([...props.listGames]);
		} catch (error) {
			console.log(error);
		}

		handleClose();
	};

	const handleDeleteGame = async () => {
		try {
			await api.delete(`/delete/${props.id}`);

			const updatedGamesList = props.listGames.filter((game) => game.id !== props.id);

			props.setListGames(updatedGamesList);
		} catch (error) {
			console.log(error);
		}

		handleClose();
	};

	const values = {
		name: props.name,
		cost: props.cost,
		category: props.category
	};

	return (
		<Modal
			open={props.open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Editar o Jogo:
				</Typography>
				<Typography variant='h6' fontWeight={'bold'}>
					{props.name}
				</Typography>
				<Box id="modal-modal-description" sx={{ mt: 2 }}>
					<Form onSubmit={onSubmit} values={values} action={'edit'} />
					<Button
						variant='contained'
						color='error'
						fullWidth
						onClick={handleDeleteGame}
						style={{
							marginTop: '1rem'
						}}
					>
						Deletar
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}