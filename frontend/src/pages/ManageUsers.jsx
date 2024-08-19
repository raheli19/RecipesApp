import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UserCard from "./UserCard";
import { useUser } from "../context/UserContext";
import {
  getUsers,
  deleteUserById,
  updateUserById,
} from "../services/userService";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/ManageRecipes.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    first_name: "",
    last_name: "",
    password: "",
    phone_number: "",
    email: "",
    address: "",
    role: "",
  });
  const [userToUpdate, setUserToUpdate] = useState(null);

  const handleClickOpen = (id) => {
    setUserToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(null);
  };

  const handleUpdateClickOpen = (user) => {
    setUserToUpdate(user.id);
    setUpdateUser({
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      phone_number: user.phone_number,
      email: user.email,
      address: user.address,
      role: user.role,
    });
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setUserToUpdate(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data.filter((userItem) => userItem.id !== user.id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      handleClose();
    } catch (error) {
      console.error("Error deleting the user:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateUserById(id, updateUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, ...updateUser } : user
        )
      );
      handleUpdateClose();
    } catch (error) {
      console.error("Error updating the user:", error);
    }
  };

  const userPicture = {
    Chief:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Cook_icon.svg/890px-Cook_icon.svg.png?20200413020721",
    User: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png",
    Admin: "https://freesvg.org/img/administrator.png",
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        padding: "16px",
        overflowY: "auto",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontFamily: "'Georgia', serif", fontWeight: "bold" }}>
        Manage all users
      </h1>
      <div className="recipes">
        {users.map((user) => (
          <div key={user.id} className="recipe-container">
            <UserCard
              id={user.id}
              category={user.first_name}
              imgSrc={userPicture[user.role]}
            />
            <div className="recipe-actions">
              <button
                className="delete-button"
                onClick={() => handleClickOpen(user.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
              <button
                className="update-button"
                onClick={() => handleUpdateClickOpen(user)}
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={"red"}>
          {"Are you sure to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By deleting this user, you will lose all the information related to
            them.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="error"
            onClick={() => handleDelete(userToDelete)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateOpen} onClose={handleUpdateClose}>
        <DialogTitle>{"Update User"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={updateUser.first_name}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, first_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={updateUser.last_name}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, last_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={updateUser.password}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, password: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={updateUser.phone_number}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, phone_number: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={updateUser.email}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={updateUser.address}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, address: e.target.value })
            }
          />
          <FormControl fullWidth style={{ marginTop: 10 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              className="register-input"
              style={{
                textAlign: "left",
                color: "black",
                margin: 0,
                marginBottom: "10px",
              }}
              value={updateUser.role}
              fullWidth
              size="small"
              placeholder="Role"
              label="Role"
              InputLabelProps={{
                style: { color: "black" },
              }}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, role: e.target.value })
              }
            >
              <MenuItem value={"User"}>User</MenuItem>
              <MenuItem value={"Chief"}>Chief</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={() => handleUpdate(userToUpdate)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
