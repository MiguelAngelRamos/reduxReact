import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* useDispatch = nos sirve para mandar ejecutar las acciones que tengamos
 * useSelector = Es una forma en la que vas acceder al state dentro del componente*/
// Actions de Redux
import  { crearNuevoProductoAction } from '../actions/productosActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaAction';
const NuevoProductos = ({history}) => {

  // state del componente 
  const [nombre, guardarNombre] = useState('');
  const [precioUni, guardarPrecio] = useState(0);

  // utilizar use dispatch y te crea una función
  const dispatch = useDispatch();

  // Acceder al state del store
  const cargando = useSelector( state => state.productos.loading);
  const error = useSelector( state => state.productos.error);
  const alerta = useSelector(state => state.alerta.alerta);



  // mandar a llamar el action del productoAction
  const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto))
  // dispatch lo vamos a usar para llamar las funciones que tengamos en nuestros accions 

  // cuando el usuario haga submit
  const submitNuevoProducto = e => {
    e.preventDefault();

    // validar formulario
    if(nombre.trim() ==='' || precioUni <=0){
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch(mostrarAlerta(alerta));
      return;
    }
    // si no hay errores
    dispatch(ocultarAlertaAction());
    // crear el nuevo producto
    agregarProducto({
      nombre,
      precioUni
    });

    // redireccionar 
    history.push('/');

  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta? <p className={alerta.classes}> {alerta.msg}</p>: null }
            <form
              onSubmit={submitNuevoProducto}
            >

              <div className="form-group">
                <label>Nombre Producto</label>
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
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
                  onChange={e => guardarPrecio(Number(e.target.value))}
                  />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                  Agregar
                </button>
            </form>
            { cargando ? <p> Cargando ...</p> : null }
            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>: null}
          </div>
        </div>
      </div>
    </div>
    );
}
 
export default NuevoProductos;