
import { Modal, Form, Input, Button, DatePicker, Select  } from 'antd';
import UsePuestos from '../hooks/UsePuestos.jsx';
import { createLocal, editLocal, getLocal, createObservacion, resetLocal } from '../services/local.js';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
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
    form,
    valueInput,
    setValueInput,

    open,
    // setOpen,
    showOpen,
    observacion,
    // setObservacion

    showModalObservacion,
    openModalObservacion,
    idpuesto,
    // setIdpuesto,
    observationForm

  } = UsePuestos();

 

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
  // console.log("puestossssssss", puestos);
  // console.log("arre", arrendatarios);
  // console.log("currentLocation", currentLocation);
  console.log("observaciones", observacion);
 
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

  const initialValues = { observacion: '', fecha: '',};


  const onFinish = async (values) => {
      console.log('Datos del formulario:', values);
      try {
        await createObservacion(observacion, values)
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: "Oservacion Creada Con Exito..",
          confirmButtonText: 'Aceptar'
      });
        await handleGetLocal(place) 
       
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

  const onFinishEdit = async () => {
    try {
      const body ={
        // nombre: currentLocation.nombre,
        // carnet: currentLocation.carnet,
        number: currentLocation.number,
        fecha: currentLocation.fecha,
        // arrendatario: arrendatarios?.map((row)=>row._id),
        arrendatario: currentLocation.arrendatario,
        mercado: currentLocation.mercado,
        newNumber: currentLocation.newNumber
      }
      await editLocal(body, currentLocation._id)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Puesto Editado Con Exito',
        confirmButtonText: 'Aceptar'
      });
      handleOk(); 
      form.resetFields();
      await handleGetLocal(place)

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
        nombre: currentLocation.nombre || currentLocation.name,
        carnet: currentLocation.carnet,
        number: currentLocation.number,
        arrendatario: arrendatarios?.map((row) => {
          const match = currentLocation?.arrendatario == row._id
          return match ? row.name : currentLocation.name; // Devuelve el nombre si hay coincidencia, de lo contrario null
      }),
        // arrendatario: currentLocation.nombre,
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
  const data = !valueInput ? puestos : puestos.filter((row)=> row?.name?.toLowerCase().includes(valueInput.toLowerCase()) || row?.carnet?.toString().includes(valueInput) || row?.arrendatario?.rubro?.toLowerCase().includes(valueInput)) ;
  const handleData = (e) => {
    setValueInput(e.target.value)
  }
  const dataObservacion = showModalObservacion ? puestos.find((row)=>row._id == idpuesto) : [];
  console.log("dataObservacion",dataObservacion)

  const reset = async (id) => {
    try {
      await resetLocal(id)
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Puesto Reseteado Con Exito',
        confirmButtonText: 'Aceptar'
    });
      await handleGetLocal(place) 
    } catch (error) {
      console.log("error", error);
      let message = error.response.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'Aceptar'
    });
      throw error;
    }
  }

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
                    // initialValues={{
                    //   number: currentLocation?.number,
                    //   fecha: currentLocation?.fecha ? moment(currentLocation.fecha, 'YYYY-MM-DD') : null,
                    //   arrendatario: currentLocation?.arrendatario, // Aquí asegúrate de que coincida con el `value` en `<Option>`
                    // }}
                  >
                    {/* <Form.Item
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
                    </Form.Item> */}

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
                              {row.name + " " + row.lastName}
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

            <Modal
              title="Agregar Observacion"
              open={open}
              onCancel={handleCancel}
              footer={null}
            >
             
              
                  <Form
                    form={observationForm}
                  
                    layout="vertical"
                    name="edit-observacion"
                    initialValues={initialValues}
                    onFinish={onFinish} // Maneja el envío del formulario
                  >

                    <Form.Item
                      label="Fecha De La Observacion"
                      name="fecha"
                      rules={[{ required: true, message: 'Por favor ingrese La Fecha !' }]}
                    >
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>

                    <Form.Item
                      label="Falta"
                      name="falta"
                      rules={[{ required: true, message: 'Por favor ingrese Contenido!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Numero de Notificación"
                      name="numDeNotificacion"
                      rules={[{ required: true, message: 'Por favor ingrese Contenido!' }]}
                    >
                      <Input type='number'/>
                    </Form.Item>

                    <Form.Item
                      label="Observacion"
                      name="observacion"
                      rules={[{ required: true, message: 'Por favor ingrese Contenido!' }]}
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
      
            </Modal>

            <Modal
            title="Observaciones"
             open={showModalObservacion}
             onCancel={handleCancel}

            >
              {
                showModalObservacion && dataObservacion.length != 0 ?
                  dataObservacion.observaciones.map((row,i)=>(
                    <div key={i} style={{border:'solid 2px gray', textAlign:'center', margin:'2px', backgroundColor:'red', color:'white'}}>
                      <h3>{row.fecha}</h3>
                      <h3>{row.falta}</h3>
                      <h3>{`Observacion: ${row.observacion ? row.observacion : "Sin Observaciones"}`}</h3>
                      <p style={{border:'solid 1px white', borderRadius:'50%', width:'35px', height:'30px',margin:'auto', backgroundColor:'white', marginBottom:'4px'}}><i className="fa fa-times text-danger"></i></p>
                      <Link to={`/${row._id}observaciones/pdf`}> <button type="button" style={{backgroundColor: 'darkGray', color:"white",fontWeight:"bold", margin:'7px', borderRadius:'8px'}}>Imprimir</button></Link>
                    </div>
                  ))
                 : null
              }
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
                    <div>
                      <button type="button" className="btn btn-info fa fa-plus" onClick={() => handleCreateLocal() }> Agregar Puesto</button>
                    </div>
                    <table id="datatable-buttons" className="table table-striped table-bordered" style={{width:"100%"}}>
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Carnet</th>
                          <th>Puesto</th>
                          <th>Estado</th>
                          <th>Fecha de Contrato</th>
                          <th>Rubro</th>
                          <th>Acta</th>
                          <th>Desiganar/reset</th>
                          <th>Agregar Observaciones</th>
                          <th>Ver Observaciones</th>
                        </tr>
                      </thead>


                      <tbody>
                        { data.length === 0 ?
                        (
                          <tr>
                            <td colSpan="6" style={{textAlign:'center'}}><span>No Hay Datos</span></td>
                            <td>
                                <button type="button" className="btn btn-info fa fa-plus" onClick={() => handleCreateLocal(place) }></button>
                                {/* <button type="button" className="btn btn-primary fa fa-pencil" onClick={() => handleEdit(location)}></button> */}
                            </td>
                          </tr>
                        ) :
                        
                          data?.map((dato, index) => (
                            <tr key={index}>
                              <td  data-label="Nombre:">
                                <label style={{
                                   opacity: dato.name ? 1 : 0,
                                   textAlign:'center',
                                   width: '100%',
                                   backgroundColor: 'darkcyan',
                                   borderRadius: '5px',
                                   color: 'white' 
                                   }}>{dato.name}</label>
                              </td>
                              <td  data-label="Carnet:"><label style={{
                                textAlign:'center',
                                width: '100%',
                                backgroundColor: 'darkcyan',
                                borderRadius: '5px',
                                color: 'white'
                              }}>{dato.carnet}</label></td>
                              <td  data-label="Puesto:"> <label  style={{textAlign:'center',
                                width: '100%',
                                backgroundColor: 'darkcyan',
                                color: 'white',
                                borderRadius: '5px',
                              }}> {dato.number}</label></td>
                              <td  data-label="Asignado:">
                                <label  style={{
                                            color: dato.status === 'libre' ? 'white' : 'white',  // Siempre blanco para el texto
                                            backgroundColor: dato.status === 'libre' ? 'red' : 'darkcyan',  // Fondo rojo para "libre" y darkcyan para otros casos
                                            width: '100%',
                                            textAlign: 'center',
                                            borderRadius: '5px',
                                          }}
                                >{dato.status}</label>
                              </td>
                              <td  data-label="Fecha De Cont:"><label 
                                style={{
                                  color: dato.status === 'libre' ? 'white' : 'white',  // Siempre blanco para el texto
                                  backgroundColor: dato.status === 'libre' ? 'red' : 'darkcyan',  // Fondo rojo para "libre" y darkcyan para otros casos
                                  width: '100%',
                                  textAlign: 'center',
                                  borderRadius: '5px',
                                }}
                              >{dato.fechaDeContrato}</label></td>
                              <td  data-label="Fecha De Cont:"><label 
                                style={{
                                  color: dato.status === 'libre' ? 'white' : 'white',  // Siempre blanco para el texto
                                  backgroundColor: dato.status === 'libre' ? 'red' : 'darkcyan',  // Fondo rojo para "libre" y darkcyan para otros casos
                                  width: '100%',
                                  textAlign: 'center',
                                  borderRadius: '5px',
                                }}
                              >{dato?.arrendatario?.rubro}</label></td>
                              <td  data-label="Contrato">
                               <Link to={`/${dato._id}contrato/pdf`}> <button type="button" className="btn btn-info fa fa-file-pdf-o" ></button></Link>
                              </td>
                              <td  data-label="Asig/reset">
                                <button type="button" className="btn btn-primary fa fa-pencil" onClick={() =>  handleEdit(dato, dato._id)}></button>
                                <button type="button" className="btn btn-secondary fa fa-refresh" onClick={() => reset(dato._id)}></button>
                              </td>

                              <td  data-label="Agre. Observac">
                                <button type="button" className="btn btn-danger fa fa-file-pdf-o" onClick={()=>{showOpen(dato._id)}}></button>
                              </td>
                              <td  data-label="Ver">
                                <button type="button" className="btn btn-primary fa fa-arrow-right" onClick={()=>{openModalObservacion(dato._id)}} disabled={dato?.observaciones.length == 0}> {dato?.observaciones.length == 0 ? "Total 0" : `Total: ${dato?.observaciones?.length}`}</button>
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