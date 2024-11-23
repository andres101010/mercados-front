
import { Modal, Form, Input, Button, DatePicker, Select  } from 'antd';
import UsePuestos from '../hooks/UsePuestos.jsx';
import { createLocal, editLocal, getLocal } from '../services/local.js';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllArrendatarios } from '../services/arrendatario.js';
const Puestos = () => {
  // const [form] = Form.useForm();

  const { Option } = Select;

  const { place } = useParams();

  
  const { 
    handleOk,
    handleCancel,
    isEditModalVisible,
    currentLocation,
    setCurrentLocation,
    handleEdit ,
    puestos,
    setPuestos,
    arrendatarios,
    setArrendatarios ,
    form
  } = UsePuestos();

  // const datos = [
  //   {
  //     nombre: "Andrea Joana Miranda Cano",
  //     cedula: "7152364",
  //     numeroLocal: "001",
  //     estado: "Asignado",
  //     estadoColor: "darkcyan",
  //     fecha: "10/15/2023"
  //   },
  //   {
  //     nombre: "",
  //     cedula: "",
  //     numeroLocal: "002",
  //     estado: "Libre",
  //     estadoColor: "rgb(180, 17, 5)",
  //     fecha: ""
  //   },
  //   {
  //     nombre: "",
  //     cedula: "",
  //     numeroLocal: "003",
  //     estado: "Libre",
  //     estadoColor: "rgb(180, 17, 5)",
  //     fecha: ""
  //   }
  // ];


  const handleGetArrendatarios = async (place) => {
    try {
      const result = await getAllArrendatarios(place)
      setArrendatarios(result.data)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleGetLocal = async (place) => {
    try {
      const allPuestos = await getLocal(place);
      setPuestos(allPuestos?.data?.allLocals);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(()=>{
    handleGetLocal(place);
    handleGetArrendatarios(place);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[place])
  console.log("puestossssssss", puestos);
  console.log("arre", arrendatarios);
  console.log("currentLocation", currentLocation);
 
  const handleCreateLocal = async () => {
    try {
      await createLocal(place);
      await handleGetLocal(place)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Puesto Creado Con Exito',
        confirmButtonText: 'Aceptar'
    });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Ocurrió un error al crear el local.';
      console.log("Error creating local", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'Aceptar'
    });
    }
  }
  const onFinishEdit = async () => {
    try {
      const body ={
        nombre: currentLocation.nombre,
        carnet: currentLocation.carnet,
        number: currentLocation.number,
        fecha: currentLocation.fecha,
        arrendatario: arrendatarios?.map((row)=>row._id),
        mercado: currentLocation.mercado,
        newNumber: currentLocation.newNumber
      }
      await editLocal(body, currentLocation._id)
      await handleGetLocal(place)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Puesto Editado Con Exito',
        confirmButtonText: 'Aceptar'
    });
    form.resetFields();

      handleOk(); 

    } catch (error) {
      console.log("Error: ", error);
      const errorMessage = error?.response?.data?.message || 'Ocurrió un error al crear el local.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'Aceptar'
    });
    }
  };

 
  useEffect(() => {
    if (currentLocation) {
      form.setFieldsValue({
        nombre: currentLocation.nombre,
        carnet: currentLocation.carnet,
        number: currentLocation.number,
        arrendatario: arrendatarios.map((row) => row.name),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, form]);

  const onValuesChange = (changedValues, allValues) => {
    setCurrentLocation((prev) => ({
      ...prev,
      ...allValues,
      ...(changedValues.nombre && { nombre: changedValues.nombre }), // Solo agregar si se modifica
      ...(changedValues.number && { newNumber: changedValues.number }),
    }));
  };
  
  console.log("currentLocation", currentLocation);
  return (
    <div>
      <div className="right_col" role="main">
         

            
            <Modal
              title="Editar Puestos"
              open={isEditModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
             
              {currentLocation &&  (
                  <Form
                    form={form}
                    key={currentLocation._id}
                    onValuesChange={onValuesChange}
                    layout="vertical"
                    name="edit-form"
                   
                    onFinish={onFinishEdit} // Define `onFinishEdit` para procesar los datos editados
                  >
                    <Form.Item
                      label="Nombre "
                      name="nombre"
                      rules={[{ required: true, message: 'Por favor ingrese el nombre !' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Carnet"
                      name="carnet"
                      rules={[{ required: true, message: 'Por favor ingrese El Carnet!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Numero Del Puesto"
                      name="number"
                      rules={[{ required: true, message: 'Por favor ingrese el Numero del Puesto!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Fecha Del Contrato"
                      name="fecha"
                      rules={[{ required: true, message: 'Por favor ingrese La Fecha del Contrato!' }]}
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>

                    <Form.Item
                      label="Arrendatario"
                      name="arrendatario"
                      rules={[{ required: false, message: 'Por favor seleccione El Arrendatario!' }]}
                    >
                      <Select placeholder="Seleccione uno">
                        {arrendatarios.length === 0 ? (
                          <Option>No Hay Datos..</Option>
                        ) : (
                          arrendatarios.map((row, i) => (
                            <Option key={i} value={row.name}>
                              {row.name}
                            </Option>
                          ))
                        )}
                      </Select>
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
                    <h2>Lista de casetas </h2>
                    
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">
                      <div className="row">
                          <div className="col-sm-12">
                            <div className="card-box table-responsive">
                    <p className="text-muted font-13 m-b-30">
                      El Gobierno Autonomo Municipal de Tarija - Cercado tiene la jurisdiccion de designar en calidad de arriendo, los puestos de Cada mercado de la provincia cercado en la ciudada de Tarija, manteniendo el orden y el uso adecuado de los puestos dedicados al comercio.
                    </p>
                    
                    {/* <div className="dropdown"  style={{  marginBottom: '20px' }}>
                    <button type="button"  data-toggle="modal" data-target="#NuevoMercado" style={{color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}} onClick={() => showModal() }>  <i className="fa fa-plus" style={{ marginRight: '4px' }} ></i>Nuevo</button>
                    </div> */}

                    <div>
                    <table id="datatable-buttons" className="table table-striped table-bordered" style={{width:"100%"}}>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Carnet</th>
                          <th>Puesto</th>
                          <th>Estado</th>
                          <th>Fecha de Contrato</th>
                          <th>Contrato</th>
                          <th>Desiganar</th>
                        </tr>
                      </thead>


                      {/* <tbody>
                        <tr>
                          <td>Andrea Joana Miranda Cano</td>
                          <td>7152364</td>
                          <td>001</td>
                          <td><label style={{color:"white", backgroundColor:"darkcyan"}}>Asignado</label></td>
                          <td>10/15/2023</td>
                          <td>
                            <button type="button" className="btn btn-info fa fa-file-pdf-o"></button>
                          </td>
                          <td>
                            <button type="button" className="btn btn-info fa fa-plus"></button>
                            <button type="button" className="btn btn-primary fa fa-pencil"></button>
                          </td>
                        </tr>

                        <tr>
                          <td> <label style={{ opacity: 'calc(0)' }}
                          >zzz</label></td>
                          <td></td>
                          <td>002</td>
                          <td><label style= {{color:"white", backgroundcolor:"rgb(180, 17, 5) "}}>Libre</label></td>
                          <td></td>
                          <td>
                            <button type="button" className="btn btn-info fa fa-file-pdf-o"></button>
                          </td>
                          <td>
                            <button type="button" className="btn btn-info fa fa-plus"></button>
                            <button type="button" className="btn btn-primary fa fa-pencil"></button>
                          </td>
                        </tr>

                        <tr>
                          <td> <label style={{opacity: "calc(0)"}}>zzz</label></td>
                          <td></td>
                          <td>003</td>
                          <td><label style={{color:"white", backgroundColor:"rgb(180, 17, 5)"}}>Libre</label></td>
                          <td></td>
                          <td>
                            <button type="button" className="btn btn-info fa fa-file-pdf-o"></button>
                          </td>
                          <td>
                            <button type="button" className="btn btn-info fa fa-plus"></button>
                            <button type="button" className="btn btn-primary fa fa-pencil"></button>
                          </td>
                        </tr>
                        
                      </tbody> */}

                      <tbody>
                        { puestos.length === 0 ?
                        (
                          <tr>
                            <td colSpan="6" style={{textAlign:'center'}}><span>No Hay Datos</span></td>
                            <td>
                                <button type="button" className="btn btn-info fa fa-plus" onClick={() => handleCreateLocal(place) }></button>
                                {/* <button type="button" className="btn btn-primary fa fa-pencil" onClick={() => handleEdit(location)}></button> */}
                            </td>
                          </tr>
                        ) :
                        
                          puestos?.map((dato, index) => (
                            <tr key={index}>
                              <td>
                                <label style={{
                                   opacity: dato.name ? 1 : 0,
                                   textAlign:'center',
                                   width: '100%',
                                   backgroundColor: 'darkcyan',
                                   borderRadius: '5px',
                                   color: 'white' 
                                   }}>{dato.name}</label>
                              </td>
                              <td><label style={{
                                textAlign:'center',
                                width: '100%',
                                backgroundColor: 'darkcyan',
                                borderRadius: '5px',
                                color: 'white'
                              }}>{dato.carnet}</label></td>
                              <td> <label  style={{textAlign:'center',
                                width: '100%',
                                backgroundColor: 'darkcyan',
                                color: 'white',
                                borderRadius: '5px',
                              }}> {dato.number}</label></td>
                              <td>
                                <label  style={{
                                            color: dato.status === 'libre' ? 'white' : 'white',  // Siempre blanco para el texto
                                            backgroundColor: dato.status === 'libre' ? 'red' : 'darkcyan',  // Fondo rojo para "libre" y darkcyan para otros casos
                                            width: '100%',
                                            textAlign: 'center',
                                            borderRadius: '5px',
                                          }}
                                >{dato.status}</label>
                              </td>
                              <td><label 
                                style={{
                                  color: dato.status === 'libre' ? 'white' : 'white',  // Siempre blanco para el texto
                                  backgroundColor: dato.status === 'libre' ? 'red' : 'darkcyan',  // Fondo rojo para "libre" y darkcyan para otros casos
                                  width: '100%',
                                  textAlign: 'center',
                                  borderRadius: '5px',
                                }}
                              >{dato.fechaDeContrato}</label></td>
                              <td>
                                <button type="button" className="btn btn-info fa fa-file-pdf-o"></button>
                              </td>
                              <td>
                                <button type="button" className="btn btn-info fa fa-plus" onClick={() => handleCreateLocal() }></button>
                                <button type="button" className="btn btn-primary fa fa-pencil" onClick={() => handleEdit(dato, dato._id)}></button>
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
    </div>
  )
}

export default Puestos