import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editarProductoAction } from '../actions/productosActions';

const EditarProducto = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // Nuevo state de producto
  const [producto, guardarProducto] = useState({
    nombre: '',
    precioUni: '',
  });
  // producto a editar
  const productoeditar = useSelector(state => state.productos.productoeditar);

  // llenar el state automaticamente
  useEffect(() => {
    guardarProducto(productoeditar)
  }, [productoeditar]);

  // Leer los datos del formulario
  const onChangeFormulario = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  const { nombre, precioUni } = producto;

  const submitEditarProducto = e => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    history.push('/');
  }

  // prevenir que el formulario se envie al presionar enter
  const keyPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
          </h2>
            <form
              onSubmit={submitEditarProducto}
            >

              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                  onKeyDown={keyPress}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precioUni"
                  value={precioUni}
                  onChange={onChangeFormulario}
                  onKeyDown={keyPress}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProducto;