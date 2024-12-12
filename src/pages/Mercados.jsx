
import { Modal, Form, Input, Button } from 'antd';
import useMercados from '../hooks/useMercados';
import { createMercado, editMercado, deleteMercado } from '../services/mercados';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
const Mercados = () => {
  const {mercados, handleMercados} = useContext(UserContext)
  const [form] = Form.useForm();
  const { isModalVisible,
          // setIsModalVisible,
          showModal,
          handleOk,
          handleCancel,
          isEditModalVisible,
          currentLocation,
          handleEdit ,
          // handleDelete,
          valueInput,
          setValueInput
        } = useMercados();


  // const locations = [
  //   {
  //     name: "La Loma",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "San Martin",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "Molino",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "Negro",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "Abasto del Sur",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "Campesino",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "San Bernardo",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "El Dorado",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "Eduardo Avaroa",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "Lourdes",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   },
  //   {
  //     name: "Bolivar",
  //     number: 58,
  //     address: "Calle Cochabamba Nro.234",
  //     mapLink: "https://maps.app.goo.gl/FGzTudHAEPHTPf7bA"
  //   }
  // ];

  const initialValues = { nombre: '', direccion: '', mapLink: ''};

  const onFinish = async (values) => {
    // console.log('Datos del formulario:', values);
    try {
      await createMercado(values)
      Swal.fire({
        icon: 'Success',
        title: 'success',
        text: "Mecado Creado Con Exito..",
        confirmButtonText: 'Aceptar'
    });
      await handleMercados();
      form.resetFields();

      handleOk(); // Llama a handleOk con los datos del formulario
    } catch (error) {
      console.log("Error: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
        confirmButtonText: 'Aceptar'
    });
    handleOk(); // Llama a handleOk con los datos del formulario
    
    }
  
    

  };

  const onFinishEdit = async (values) => {
    
    try {
      await editMercado(values,currentLocation.id);
      Swal.fire({
        icon: 'Success',
        title: 'success',
        text: "Mecado Editado Con Exito..",
        confirmButtonText: 'Aceptar'
    });
      
      await handleMercados()
      form.resetFields();

      handleOk(); // Llama a handleOk con los datos del formulario
    } catch (error) {
      console.log("Error: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
        confirmButtonText: 'Aceptar'
    });
    handleOk(values);
    }
    
  };

  const handleDelete = async (location) => {
    // setCurrentLocation(location._id); 
    // console.log("deleting location", location._id);
    try {
      await deleteMercado(location._id);
      Swal.fire({
        icon: 'Success',
        title: 'success',
        text: "Mecado Eliminado Con Exito..",
        confirmButtonText: 'Aceptar'
    });
    await handleMercados();

    } catch (error) {
      console.log("error deleting location", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
        confirmButtonText: 'Aceptar'
    });
    }
}

  const data = !valueInput ? mercados.data : mercados.data.filter((datos)=> datos.nombre.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()));

  const handleData = (e) => {
    setValueInput(e.target.value)
  }

  return (
    <div className="nav-md">
    <div className="container body">
            <Modal
                title="Nuevo Mercado"
                open={isModalVisible}
                // onOk={handleOk}
                footer={null}
                onCancel={handleCancel}
            >
    
              <div>
                <Form
                  form={form}
                  layout="vertical"
                  name="demo-form"
                  initialValues={initialValues}
                  onFinish={onFinish} // Maneja el envío del formulario
                >
                  <Form.Item
                    label="Nombre del Mercado"
                    name="nombre"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre del mercado!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Dirección"
                    name="direccion" // Cambiado a minúsculas
                    rules={[{ required: true, message: 'Por favor ingrese la Dirección!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Enlace del Mapa"
                    name="mapLink"
                    rules={[{ required: true, message: 'Por favor ingrese el Enlace del Mapa!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button 
                      onClick={handleCancel} 
                      style={{
                        color: '#17a2b8', 
                        borderColor: '#17a2b8', 
                        marginRight: '10px'
                      }}
                    >
                      Cerrar
                    </Button>
                    <Button 
                      type="primary"
                      htmlType="submit" // Envía el formulario al hacer clic
                      style={{
                        backgroundColor: '#17a2b8', 
                        borderColor: '#17a2b8'
                      }}
                    >
                      Guardar Cambios
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>

            <Modal
              title="Editar Mercado"
              open={isEditModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              {currentLocation && (
                <Form
                  layout="vertical"
                  name="edit-form"
                  initialValues={{
                    nombre: currentLocation.nombre,
                    direccion: currentLocation.direccion,
                    mapLink: currentLocation.mapLink,
                  }}
                  onFinish={onFinishEdit} // Define `onFinishEdit` para procesar los datos editados
                >
                  <Form.Item
                    label="Nombre del Mercado"
                    name="nombre"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre del mercado!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Dirección"
                    name="direccion"
                    rules={[{ required: true, message: 'Por favor ingrese la dirección!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Enlace del Mapa"
                    name="mapLink"
                    rules={[{ required: true, message: 'Por favor ingrese el enlace del mapa!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button onClick={handleCancel} style={{ marginRight: '10px' }}>
                      Cerrar
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Guardar Cambios
                    </Button>
                  </div>
                </Form>
              )}
            </Modal>


        <div className="right_col" role="main">
          <div className="">
              <div className="page-title">
                  <div className="title_left">
                      <h3>Mercados<small> - GAMT</small></h3>
                  </div>
      
      
              </div>
      
              <div className="clearfix"></div>
      
              <div className="row">
      
                  <div className="col-md-12 col-sm-12 ">
                      <div className="x_panel">
                          <div className="x_title">
                              <h2>Lista de Mercados </h2>
                              <ul className="nav navbar-right panel_toolbox">
      
                                  <li className="dropdown">
                                      <button type="button"  data-toggle="modal" data-target="#NuevoMercado" style={{color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}} onClick={() => showModal() }>  <i className="fa fa-plus" style={{ marginRight: '4px' }} ></i>Nuevo</button>
                                  </li>
      
                              </ul>
                              <div className="clearfix"> </div>
                          </div>
                          <div className="x_content">
                              <div className="row">
                                  <div className="col-sm-12">
                                      <div className="card-box table-responsive">
                                          <p className="text-muted font-13 m-b-30">
                                              El Gobierno Autonomo Municipal de Tarija - Cercado tiene la jurisdiccion de designar en calidad de arriendo, los puestos de Cada mercado de la provincia cercado en la ciudada de Tarija, manteniendo el orden y el uso adecuado de los puestos dedicados al comercio.
                                          </p>
                                          <div className="d-flex justify-content-end">
                                          <div className="input-group" style={{ width: '200px' }}>
                                            <span className="input-group-text bg-light">
                                               <i className="fas fa-search"></i>
                                            </span>
                                            <input 
                                              type="text" 
                                              className="form-control shadow-sm" 
                                              placeholder="Buscar" 
                                              onChange={handleData} 
                                            />
                                          </div>
                                        </div>
                                        <div className="table-container">
                                          <table id="datatable" className="table table-striped table-bordered" style={{width:"100%" }}>
                                              <thead>
                                                  <tr >
                                                      <th>Nombre</th>
                                                      <th>Puestos</th>
                                                      <th>Ubicacion</th>
                                                      <th>Editar o eliminar</th>
                                                      <th>Imprimir Reporte</th>
      
                                                  </tr>
                                              </thead>
      
      
                                          

                                              <tbody>
                                                      {data?.map((location, index) => (
                                                        <tr key={index}>
                                                          <td data-label="Nombre:">{location.nombre}</td>
                                                          <td data-label="Puestos: ">{location.local ? location.local : 0}</td>
                                                          <td  style={{ position: 'relative' }}>
                                                          <span>{location.direccion}</span>
                                                            <a
                                                              href={location.mapLink}
                                                              className="btn btn-info fa fa-map-marker"
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                              // style={{ marginLeft: '5px', color: 'white' }}
                                                              style={{
                                                                position: 'absolute',
                                                                right: '5px', // Ajusta según tu preferencia
                                                                top: '50%',
                                                                transform: 'translateY(-50%)',
                                                                color: 'white'
                                                              }}
                                                            ></a>
                                                          </td>
                                                          <td>
                                                            <button type="button" className="btn btn-warning fa fa-pencil" onClick={() => handleEdit(location,location._id)}></button>
                                                            <button type="button" className="btn btn-danger fa fa-close" onClick={()=> handleDelete(location)}></button>
                                                          </td>
                                                          <td>
                                                            <Link to={`/${location._id}/pdf`}><button type="button" className="btn btn-info fa fa-file-pdf-o"></button></Link>
                                                          </td>
                                                        </tr>
                                                      ))}
                                                    </tbody>
                                          </table>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
      
      
              </div>
          </div>
      </div>
        

        <footer>
          <div className="pull-right">
          </div>
          <div className="clearfix"></div>
        </footer>
      </div>
    


    

   {/* <div className="modal fade" id="ubicacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Ubicacion de Mercado</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div> */}

{/* 
    <div className="modal fade" id="ubicacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Editar Mercado</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div> */}
    

  {/* <div className="modal fade" id="NuevoMercado" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Nuevo Mercado</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form id="demo-form2" data-parsley-validate className="form-horizontal form-label-left">
            
                        <div className="item form-group">
                          <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="first-name">Nombre del Medcado <span className="required">*</span>
                          </label>
                          <div className="col-md-6 col-sm-6 ">
                            <input type="text" id="first-name" required="required" className="form-control " />
                          </div>
                        </div>
                        <div className="item form-group">
                          <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="last-name">Puestos <span className="required">*</span>
                          </label>
                          <div className="col-md-6 col-sm-6 ">
                            <input type="number" id="last-name" name="last-name" required="required" className="form-control" />
                          </div>
                        </div>
                        <div className="item form-group">
                          <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="last-name">Dirección <span className="required">*</span>
                          </label>
                          <div className="col-md-6 col-sm-6 ">
                            <input type="text" id="last-name" name="last-name" required="required" className="form-control" />
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                          <button type="button" className="btn btn-primary">Guardar Cambios</button>
                        </div>
                      </form>
                      
                    </div>
                    
                  </div>
                </div>
              </div> */}


  </div>
  )
}

export default Mercados