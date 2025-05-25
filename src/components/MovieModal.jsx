import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const MovieModal = ({ title, original_title, overview, backdrop_path }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <span
        variant="outlined"
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      >
        ⋮
      </span>
      <Dialog
        className="modal-card"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-red-400">
          <h3>{original_title}</h3>
          <img
            src={
              backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                : "./no-poster.png"
            }
            alt={title}
          />
        </DialogTitle>
        <DialogContent>
          <p>{overview ? overview : "No overview available"}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ background: "#030014" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MovieModal;
