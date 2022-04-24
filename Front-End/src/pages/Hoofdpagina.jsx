import React from "react";
import Navigatiebalk from "../components/Navigatiebalk";
import { Typography } from "@mui/material";

export default function Hoofdpagina() {
  return (
    <>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <header>
        <Navigatiebalk />
      </header>
      <div className="HoofdPagina">
        <Typography variant="h4" align="center"></Typography>
        <h1 className="hoofdtitle"> Dokter Sara Depreitere </h1>
      </div>
    </>
  );
}
