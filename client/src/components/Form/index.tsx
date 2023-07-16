import './styles.css';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formValidationSchema = z.object({
	name: z.string().min(3, 'Mínimo 3 caracteres'),
	cost: z.number({ invalid_type_error: 'Não pode ser vazio' }).min(1, 'Mínimo 1 real'),
	category: z.string().min(3, 'Mínimo 3 caracteres')
});

export type FormData = z.infer<typeof formValidationSchema>

interface Props {
	onSubmit: (data: FormData) => void,
	values?: FormData,
	action: 'register' | 'edit' 
}

export function Form({ onSubmit, values, action }: Props) {

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formValidationSchema),
		defaultValues: {
			name: values?.name || '',
			cost: values?.cost || 0,
			category: values?.category || ''
		}
	});

	const onSubmitForm = (data: FormData) => {
		onSubmit(data);
		reset();
	};

	return (
		<form className="form" data-testid='form-teste-id' onSubmit={handleSubmit(onSubmitForm)}>
			<TextField
				label='Nome'
				variant='standard'
				{...register('name')}
				error={!!errors.name}
				helperText={errors.name?.message}
			/>

			<TextField
				type='number'
				label='Preço'
				variant='standard'
				{...register('cost', { valueAsNumber: true })}
				error={!!errors.cost}
				helperText={errors.cost?.message}
			/>

			<TextField
				label='Categoria'
				variant='standard'
				{...register('category')}
				error={!!errors.category}
				helperText={errors.category?.message}
			/>
			<Button type='submit' variant='contained'>
				{action === 'register' ? 'Cadastrar' : 'Editar'}
			</Button>
		</form>
	);
}