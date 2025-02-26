import clsx from "clsx";
import { useContext } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import { UserContext } from "../context";
import firebase from "../firebase";
import { colors } from "../util";

const useStyles = makeStyles({
  colorBox: {
    display: "block",
    height: 24,
    width: "100%",
    cursor: "pointer",
    outline: "none",
    border: "none",
    transition: "margin 0.1s",
    "&:hover": {
      margin: "2px 0",
    },
  },
  active: {
    margin: "2px 0",
  },
});

function UserColorDialog({ open, onClose, title }) {
  const user = useContext(UserContext);
  const classes = useStyles();

  function handleChange(color) {
    firebase.database().ref(`users/${user.id}/color`).set(color);
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {Object.keys(colors).map((color) => (
          <button
            key={color}
            className={clsx({
              [classes.colorBox]: true,
              [classes.active]: color === user.color,
            })}
            style={{ background: colors[color][400] }}
            onClick={() => handleChange(color)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserColorDialog;
