import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Link } from "react-router-dom";

const floatstyle = {
  position: "fixed",
  bottom: "0px",
  right: "0px",
  padding: "20px",
  zIndex: "999",
};

export default function FloatingActionButtons() {
  return (
    <Box
      component={Link}
      to="/createpost"
      style={floatstyle}
      className="fbutton"
      sx={{ "& > :not(style)": { m: 1 } }}
    >
      <Fab color="secondary" aria-label="edit">
        <BorderColorIcon />
      </Fab>
    </Box>
  );
}
