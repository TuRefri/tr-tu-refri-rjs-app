import React from 'react'
import { useParams } from 'react-router-dom';
export default function StorePage() {
    const { id } = useParams();
  return (
    <>
        <nav>Filtros: {id}</nav>
        <ul>Lista de tiendas</ul>
    </>
  )
}
