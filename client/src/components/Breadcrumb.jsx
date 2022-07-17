import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TitleBreadBar from "./TitleBreadBar";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const breadstyle = {
  color: "#616161",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  boxShadow: "none",
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "24px",
  border: "1px solid 1px solid #90caf975",
  background: "white",
};

const boxstyle = {
  boxSizing: "border-box",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "0px",
  width: "calc(100% + 8px)",
  marginLeft: "10px",
  justifyContent: "space-between",
  alignItems: "center",
};

const breadcrumb = {
  marginLeft: "1.5rem",
};

const Breadcrumb = (props) => {
  return (
    <>
      <div style={breadcrumb}>
        <TitleBreadBar
          label={props.label}
          style={breadcrumb}
          sx={{ display: "{props.display}" }}
        />
      </div>
    </>
  );
};

export default Breadcrumb;
