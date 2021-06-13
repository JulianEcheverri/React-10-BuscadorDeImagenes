import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoDeImagenes from "./components/ListadoDeImagenes";

function App() {
  // States
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagen] = useState([]);
  const [pagina_actual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;
    const consultarAPI = async () => {
      const apiKey = "22064512-121f7aceba61bd71f4c433330";
      const imagenesPorPagina = 30;
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${pagina_actual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagen(resultado.hits);
      // Calcular el total de paginas
      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));
      // Hacer focus al inicia de la pantalla
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarAPI();
  }, [busqueda, pagina_actual]);

  // Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = pagina_actual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = pagina_actual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
        <div className="row justify-content-center">
          <ListadoDeImagenes imagenes={imagenes} />
          {pagina_actual === 1 ? null : (
            <button
              type="button"
              className="btn-info mr-1"
              onClick={paginaAnterior}
            >
              &laquo;Anterior
            </button>
          )}
          {pagina_actual === totalPaginas ? null : (
            <button
              type="button"
              className="btn-info"
              onClick={paginaSiguiente}
            >
              Siguiente&raquo;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
