import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
// Crear nuevos productos

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      // insertat en la API
      await clienteAxios.post('/productos', producto);

      // Si todo sale bien, actualizar el state
      dispatch(agregarProductoExito(producto));

      // Alerta
      Swal.fire(
        'Correcto',
        'El producto se agregó correctamente',
        'success'
      )
    } catch (error) {
      console.log(error);
      // si hay un error cambiar el state
      dispatch(agregarProductoError(true)) 
      // alerta de Error
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intenta de nuevo'
      })
    }
  }
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});


// si hubo un error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

// Función que descarga los productos de la base de datos

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const respuesta = await clienteAxios.get('/productos');
      // console.log(respuesta.data);
      dispatch(descargaProductosExitosa(respuesta.data.productos))
    } catch (error) {
      console.log(error);
      dispatch( descargaProductosError())
    }
  }
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      // si se elimina mostrar alerta
      Swal.fire(
        'Eliminado!',
        'El producto se elimino correctamente.',
        'success'
      )
    } catch(error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
    console.log(id);
  }
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true // va cambiar el error a true
})

// Colar producto en edición

export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto))
  }
}

const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

// Edita un registro en la api y state

export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      const resultado = await clienteAxios.put(`/productos/${producto._id}`, producto);
      dispatch(editarProductoExito(producto))
      console.log(resultado);
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError())
    }
  }
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});

const editarProductoError = () =>({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
})