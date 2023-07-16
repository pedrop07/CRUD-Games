import './styles.css';
import { useState } from 'react';
import { FormModal } from '../FormModal';
import { Game } from '../Home';

interface Props {
	listGames: Game[]
	setListGames: React.Dispatch<React.SetStateAction<Game[]>>
	id: string
	name: string
	cost: number
	category: string
}

export function Card(props: Props) {
	const [open, setOpen] = useState(false);

	const handleClickCard = () => {
		setOpen(true);
	};

	return (
		<>
			<FormModal
				open={open}
				setOpen={setOpen}
				id={props.id}
				name={props.name}
				cost={props.cost}
				category={props.category}
				setListGames={props.setListGames}
				listGames={props.listGames}
			/>

			<div
				className="card--container"
				onClick={handleClickCard}
			>
				<h1 className="card--title">{props.name}</h1>
				<p className="card--category">{props.category}</p>
				<p className="card--cost">R$ {props.cost}</p>
			</div>
		</>
	);
}