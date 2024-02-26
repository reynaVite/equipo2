import React from "react";

import { Header } from "../components/Header";

import { Footer } from "../components/Footer";

import { Subtitulo, Titulo } from "../components/Titulos";

import "../css/Historial.css";

export function Historial() {
  return (
    <>
      <Header></Header>
      <Titulo tit={"Datos medicos del alumno"} />
      <div className="conhito"></div>
      <Footer></Footer>
    </>
  );
}
