import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Confirmation from "../../components/Comfirmation";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function UserContainer({
  searchQuery,
  onDeleteUser,
  onEditUser
}) {
  const [finalUsers, setFinalUsers] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  const users = useSelector(state => {
    return state.users.data;
  });
  const classes = useStyles();

  useEffect(() => {
    if (!searchQuery || searchQuery.length === 0) {
      setFinalUsers(users);
    } else {
      console.log("searchQuery", searchQuery);
      setFinalUsers(
        users.filter(
          user =>
            user.firstName.substring(0, searchQuery.length) === searchQuery
        )
      );
    }
  }, [users, searchQuery]);

  const handleOpenDeleteConfirm = user => {
    setTargetUser(user);
    setDeleteConfirmationOpen(true);
  };

  const handleSubmitDeleteUser = () => {
    onDeleteUser(targetUser);
  };

  return (
    <TableContainer component={Paper}>
      <Confirmation
        open={deleteConfirmationOpen}
        setOpen={setDeleteConfirmationOpen}
        onSubmitDeleteUser={handleSubmitDeleteUser}
      />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">First name</TableCell>
            <TableCell align="right">Last name</TableCell>
            <TableCell align="right">Date of birth</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalUsers.map((user, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="user">
                {user.firstName}
              </TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.date.toISOString()}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">
                <Fab
                  color="primary"
                  aria-label="edit"
                  size="small"
                  onClick={() => onEditUser(user)}
                  style={{ marginRight: 12 }}
                >
                  <EditIcon />
                </Fab>
                <Fab
                  color="secondary"
                  aria-label="edit"
                  size="small"
                  onClick={() => handleOpenDeleteConfirm(user)}
                >
                  <DeleteForeverIcon />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
