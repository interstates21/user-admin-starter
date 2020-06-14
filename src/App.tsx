import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContainer from "./containers/UserContainer";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Container from "@material-ui/core/Container";
import DateFnsUtils from "@date-io/date-fns";
import UserBar from "./containers/UserBar";
import CreateUserDialog from "./containers/CreateUserDialog";
import { createUserRequest, deleteUserRequest } from "./store/actions";
import store from "./store";
import { Provider } from "react-redux";

const Home = () => {
  const [createOpen, setCreateOpen] = useState({
    open: false,
    targetUser: null
  });
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleOpenCreateModal = () => {
    setCreateOpen({ open: true, targetUser: null });
  };

  const handleSubmit = user => {
    dispatch(createUserRequest(user));
  };

  const handleDeleteUser = user => {
    dispatch(deleteUserRequest(user));
  };
  const handleEditUser = user => {
    setCreateOpen({ open: true, targetUser: user });
  };
  return (
    <div className="App">
      <UserBar
        onCreateUser={handleOpenCreateModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Container maxWidth="lg" style={{ marginTop: 60 }}>
        <CreateUserDialog
          open={createOpen}
          setOpen={setCreateOpen}
          onSubmit={handleSubmit}
        />

        <UserContainer
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
          searchQuery={searchQuery}
        />
      </Container>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Home />
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default App;
