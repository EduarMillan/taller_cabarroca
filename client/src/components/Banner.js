import React from "react";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import banner4 from "../images/banner4.jpg";
import banner5 from "../images/banner5.jpg";
import banner6 from "../images/banner6.jpg";
import banner8 from "../images/banner8.jpg";

export default function Banner() {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={banner1} className="d-block w-100" alt="Sala Solidaridad" />
        </div>
        <div className="carousel-item">
          <img src={banner2} className="d-block w-100" alt="Tunel del Tiempo" />
        </div>
        <div className="carousel-item">
          <img src={banner3} className="d-block w-100" alt="Museo del Automovil" />
        </div>
        <div className="carousel-item">
          <img src={banner4} className="d-block w-100" alt="Lobby CFCR" />
        </div>
        <div className="carousel-item">
          <img src={banner5} className="d-block w-100" alt="Galeria CFCR" />
        </div>
        <div className="carousel-item">
          <img src={banner6} className="d-block w-100" alt="Sala Museo Atares" />
        </div>
        <div className="carousel-item">
          <img src={banner8} className="d-block w-100" alt="Recepcion CFCR" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}
