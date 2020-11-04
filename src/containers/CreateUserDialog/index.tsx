import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { v4 as uuidv4 } from "uuid";

export default function FormDialog({ open, setOpen, onSubmit }) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setphone] = useState("");

  const handleClose = () => {
    setOpen({ open: false, target: null });
  };

  useEffect(() => {
    if (open.targetUser) {
      setfirstName(open.targetUser.firstName);
      setlastName(open.targetUser.lastName);
      setphone(open.targetUser.phone);
    }
  }, [open]);

  const handleSubmit = () => {
    const newUser = {
      id: uuidv4(),
      firstName,
      lastName,
      phone
    };

    onSubmit(newUser);
    handleClose();
  };

  const handleChangeFirstName = e => {
    setfirstName(e.target.value);
  };
  const handleChangePhone = e => {
    setphone(e.target.value);
  };

  const handleChangeLastName = e => {
    setlastName(e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
  };

  return (
    <Dialog
      open={open.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {open.targetUser ? "Edit" : "Create"} User
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={firstName}
          onChange={handleChangeFirstName}
          label="First name"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={handleChangeLastName}
          fullWidth
        />
        {/* <KeyboardDatePicker
          disableToolbar
          style={{ width: "100%" }}
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        /> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Phone Number"
          type="numeric"
          value={phone}
          onChange={handleChangePhone}
          fullWidth

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
