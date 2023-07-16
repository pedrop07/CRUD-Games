import './styles.css';
import { useEffect, useState } from 'react';
import { Form, FormData } from '../Form';
import { Card } from '../Card';
import api from '../../services/api';
import { Typography } from '@mui/material';

export type Game = {
	id?: string,
	name: string,
	cost: number,
	category: string
}

export function Home() {
	const [listGames, setListGames] = useState<Game[]>([]);

	const onSubmit = async (data: FormData) => {
		try {
			await api.post('/register', data);

			setListGames((prevState) => [...prevState, data]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		api.get('/list_games').then((res) => {
			setListGames(res.data);
		});
	}, []);

	return (
		<div className="app--container">
			<div className="register--container">
				<h1 className='register--title'>Cadastro de Jogos</h1>
				<Form onSubmit={onSubmit} action={'register'} />
			</div>

			{listGames.length > 0 ?
				(
					<div className='grid--container'>
						{
							listGames.map(({ id, name, cost, category }) => {
								return (
									<Card
										key={id ?? name}
										listGames={listGames}
										setListGames={setListGames}
										id={id as string}
										name={name}
										cost={cost}
										category={category}
									/>
								);
							})
						}
					</div>
				)
				: (
					<Typography variant='h4' marginTop={2}>
						Nenhum Jogo foi encontrado...
					</Typography>
				)}
		</div>
	);
}