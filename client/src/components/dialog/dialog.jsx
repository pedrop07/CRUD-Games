import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
// import produce from "immer";

export default function FormDialog(props) {

  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    cost: props.cost,
    category: props.category,
  });

  const handleEditGame = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      name: editValues.name,
      cost: editValues.cost,
      category: editValues.category,
    });

    handleClose();
  };

  const handleDeleteGame = () => { // Para deletar precisa-se enviar via parametros da URL
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`);
    handleClose();
  };

  const handleClickOpen = () => {
		props.setOpen(true);
	};

	const handleClose = () => {
		props.setOpen(false);
	};

  const handelChangeValues = (value) => {
    setEditValues(prevValues => ({
      ...prevValues,
      [value.target.id]: value.target.value
    }))
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            defaultValue={props.name}
            onChange={handelChangeValues}
            label="Nome do jogo"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="cost"
            defaultValue={props.cost}
            onChange={handelChangeValues}
            label="Preço"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            defaultValue={props.category}
            onChange={handelChangeValues}
            label="Categoria"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteGame} color="primary">
            Excluir
          </Button>
          <Button onClick={handleEditGame} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}