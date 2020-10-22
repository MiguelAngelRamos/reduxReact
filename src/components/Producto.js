import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
// Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productosActions';

const Producto = ({ producto }) => {
  // const { producto } = props;
  const { nombre, precioUni, _id } = producto;

  const dispatch = useDispatch(); // para ejecutar las accciones
  const history = useHistory(); // habilitar history para redirección

  // Confirmar si desea eliminarlo
  const confirmarEliminarProducto = id => {
    // preguntar al usuario
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Un producto que se elimina no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // pasarlo al accion
        dispatch(borrarProductoAction(id));

      }
    })
  }
  // función que redirige de forma programada
  const redireccionarEdicion = producto => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto._id}`);
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td><span>${precioUni}</span></td>
      <td>
        <button
          type="button"
          onClick={()=> redireccionarEdicion(producto)}
          className="btn btn-primary mr-2">
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(_id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Producto;