// import React from "react";
import { Typography } from "@mui/material";
import {
  Link,
} from "react-router-dom";

export const API_TYPE_NAME = "Requestly"

export function AppName() {
  return (
    <Typography className="app-bar-title" component="h1" variant="h5">
      <Link to={`/`}>{API_TYPE_NAME} </Link>
    </Typography>
  );
}
