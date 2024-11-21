import { useParams } from 'react-router-dom';
import { getAllArrendatarios, createArrendatario } from '../services/arrendatario';
import UseArrendatarios from '../hooks/UseArrendatarios';
import { useEffect, useCallback } from 'react';
import { Modal, Form, Input, Button, DatePicker,Checkbox } from 'antd';
import Swal from 'sweetalert2';
import { getPagos, createPago } from '../services/pagos';
import moment from "moment";

const Arrendatarios = () => {
  const [form] = Form.useForm();

    const {
        arrendatario,
        setArrendatarios,
        isModalVisible,
            // setIsModalVisible,
            showModal,
            handleOk,
            handleCancel,

            // isEditModalVisible,
            currentLocation,
            // handleEdit,

            showModaPago,
            setShowModaPago,
            handleShowModalPago,
            isMultipleDates,
            setIsMultipleDates,
            pagos,
            setPagos,
            mostrarPagados,
            togglePagos,
            weekOffset,
            setWeekOffset
    } = UseArrendatarios();
    const { place } = useParams();

   
  const handleCheckboxChange = (e) => {
    setIsMultipleDates(e.target.checked);
    // Opcional: Resetear el campo de fecha al cambiar la opción
    form.resetFields(['fecha', 'fechas']);
  };


    const getArrendatarios = async (place) => {
        try {
            const result = await getAllArrendatarios(place);
            setArrendatarios(result?.data)
        } catch (error) {
            console.log("error", error);
        }
    }

    const getpagos = useCallback(async () => {
      if (!currentLocation || !currentLocation._id) {
        console.warn("currentLocation o _id no está definido.");
        return;
      }
    
      try {
        const idLocal = currentLocation.local.map((row)=>row._id);
        const idMercado = currentLocation.mercado._id;
        moment.updateLocale("en", { week: { dow: 1 } }); // Establece lunes como primer día de la semana

        // Calcula las fechas en función del desplazamiento de semanas
        const fechaInicial = moment()
          .startOf("week")
          .add(weekOffset, "weeks") // Ajusta la semana según el desplazamiento
          .format("YYYY-MM-DD");
        const fechaFinal = moment()
          .endOf("week")
          .add(weekOffset, "weeks") // Ajusta la semana según el desplazamiento
          .format("YYYY-MM-DD");
        const res = await getPagos(currentLocation._id, fechaInicial, fechaFinal, idLocal, idMercado);
        setPagos(res.data);
      } catch (error) {
        console.log("Error al obtener pagos:", error);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLocation, weekOffset]); // Dependencia necesaria
    

    useEffect(()=>{
      getpagos()
    },[getpagos])

    useEffect(()=>{
       getArrendatarios(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[place])
 

  const initialValues = { name: '', lastName: '', cedula: '', phone:'', address:''};

  const onFinish = async (values) => {
   
    try {
      await createArrendatario(values, place)
      Swal.fire({
        icon: 'Success',
        title: 'success',
        text: "Mecado Creado Con Exito..",
        confirmButtonText: 'Aceptar'
    });
      await getArrendatarios(place)
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
       
       // Convertir las fechas en formato deseado antes de enviarlas
    if (values.fechas) {
      const [startDate, endDate] = values.fechas;
      const startDateString = startDate.format('YYYY-MM-DD'); // Convierte a string
      const endDateString = endDate.format('YYYY-MM-DD');     // Convierte a string
     
      const allDates = [];
      let currentDate = moment(startDateString).startOf('day');

      while (currentDate.isSameOrBefore(moment(endDateString).startOf('day'))) {
        allDates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'day');
      }

      // Reemplazar fechas por el rango generado
      values.fechas = allDates;
    }

       const body = {
        arrendatario:currentLocation._id,
        local: currentLocation.local?.map((row)=>row._id),
        diasPagados: values.fechas ? values.fechas : [values.fecha.format('YYYY-MM-DD')],
        monto: values.monto
       }
      const res = await createPago(body)
      const respSuccess = res.data.message || 'Pago Exitoso.'
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: respSuccess,
        confirmButtonText: 'Aceptar'
    });
       form.resetFields();
      handleOk(); 
      setShowModaPago(false);
    } catch (error) {
      console.log("Error: ", error);
      const errorMessage = error?.response?.data?.error || 'Ocurrió un error al crear el Pago.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'Aceptar'
    });
    }
  };


  return (
    <div>
          <Modal
                title="Nuevo Arrendatario"
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
                    label="Nombre del Arrendatario"
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre del Arrendatario!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Apellido del Arrendatario"
                    name="lastName"
                    rules={[{ required: true, message: 'Por favor ingrese el Apellido del Arrendatario!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Carnet"
                    name="cedula" // Cambiado a minúsculas
                    rules={[{ required: true, message: 'Por favor ingrese El Numero Del Carnet!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Telefono"
                    name="phone" // Cambiado a minúsculas
                    rules={[{ required: true, message: 'Por favor ingrese El Numero Del Telefono!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Direccion"
                    name="address" // Cambiado a minúsculas
                    rules={[{ required: true, message: 'Por favor ingrese La Direccion!' }]}
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
            title="Pagar Cachaje"
            open={showModaPago}
            // onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
          >
          
            <div>
              {
                currentLocation ?
                (
                  <Form
                  form={form}
                  layout="vertical"
                  name="demo-form"
                  initialValues={{
                    name: currentLocation.name,
                    puesto: (currentLocation.local || []).map((file) => file.number).join(", "),
                    mercado: currentLocation.mercado.nombre,
                    apellido: currentLocation.lastName,
                    telefono: currentLocation.phone
                  }}
                  onFinish={onFinishEdit}
                >
                  <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre!' }]}
                  >
                    <Input disabled/>
                  </Form.Item>

                  <Form.Item
                    label="Apellido"
                    name="apellido"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre!' }]}
                  >
                    <Input disabled/>
                  </Form.Item>

                  <Form.Item
                    label="Telefono"
                    name="telefono"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre!' }]}
                  >
                    <Input disabled/>
                  </Form.Item>

                  <Form.Item
                    label="Puesto"
                    name="puesto"
                    rules={[{ required: true}]}
                  >
                    <Input type='text' disabled/>
                  </Form.Item>

                  <Form.Item
                    label="Mercado"
                    name="mercado"
                    rules={[{ required: true }]}
                  >
                    <Input type='text' disabled/>
                  </Form.Item>

                  <Form.Item
                    label="Monto"
                    name="monto"
                    rules={[{ required: true, message: 'Por favor ingrese el Monto!' }]}
                  >
                    <Input type='number'/>
                  </Form.Item>

                  <Form.Item>
                    <Checkbox onChange={handleCheckboxChange}>
                      Seleccionar varias fechas
                    </Checkbox>
                  </Form.Item>

                  {!isMultipleDates ? (
                      <Form.Item
                        label="Fecha Del Pago"
                        name="fecha"
                        rules={[{ required: true, message: 'Por favor ingrese la Fecha del Pago!' }]}
                      >
                        <DatePicker format="YYYY-MM-DD" />
                      </Form.Item>
                    ) : (
                     
                      <Form.Item
                          label="Fechas Del Pago"
                          name="fechas"
                          rules={[{ required: true, message: 'Por favor ingrese las Fechas del Pago!' }]}
                        >
                          <DatePicker.RangePicker
                            format="YYYY-MM-DD"
                            // onChange={(dates, dateStrings) => {
                            //   if (dates && dates.length === 2) {
                            //     // Usamos los valores de `dateStrings` para garantizar precisión
                            //     const [startDateStr, endDateStr] = dateStrings;

                            //     // Convertimos las cadenas en Moment.js
                            //     const startDate = moment(startDateStr, 'YYYY-MM-DD').startOf('day');
                            //     const endDate = moment(endDateStr, 'YYYY-MM-DD').startOf('day');

                            //     console.log("startDate:", startDate.format('YYYY-MM-DD'));
                            //     console.log("endDate:", endDate.format('YYYY-MM-DD'));

                            //     const allDates = [];
                            //     let currentDate = startDate.clone();

                            //     // Generar las fechas intermedias
                            //     while (currentDate.isSameOrBefore(endDate, 'day')) {
                            //       allDates.push(currentDate.format('YYYY-MM-DD'));
                            //       currentDate.add(1, 'day'); // Avanzar al siguiente día
                            //     }

                            //     console.log('Fechas generadas:', allDates);
                            //     // Aquí puedes manejar `allDates` según sea necesario
                            //     return allDates
                            //   } else {
                            //     console.log("No se seleccionaron dos fechas válidas");
                            //   }
                            // }}
                          />
                        </Form.Item>






                    )}

            <div>
            <div style={{ marginBottom: "20px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button type="button" onClick={togglePagos} style={{color:'white', backgroundColor: mostrarPagados ? 'orange' : 'darkcyan', borderRadius:'5px', border:'none', fontSize:'18px'}}>
                {mostrarPagados ? "Mostrar Dias No Pagados" : "Mostrar Dias Pagados"}
              </button>
              <button type="button" onClick={() => setWeekOffset(weekOffset - 1)} style={{color:'white', backgroundColor: pagos?.noPagados?.every((row) => new Date(row) <= new Date(pagos.fechaDeContrato)) ? 'gray' :'darkcyan', borderRadius:'5px', border:'none', }} disabled={pagos?.noPagados?.every((row) => new Date(row) <= new Date(pagos.fechaDeContrato))}>
              <i className="fa fa-arrow-left" ></i> Semana Anterior
              </button>
              <button type="button" onClick={() => setWeekOffset(weekOffset + 1)} style={{color:'white', backgroundColor: weekOffset == 0 ? 'gray' : 'darkcyan', borderRadius:'5px', border:'none', }} disabled={weekOffset == 0}>
              Siguiente Semana <i className="fa fa-arrow-right" ></i> 
              </button>
            </div>
            
            <p style={{color:'red'}}>Fecha De Inicio de Contrato: {pagos.fechaDeContrato}</p>
            
            <div>
              { mostrarPagados ? (
                pagos?.pagados?.length === 0 ? (
                  <p
                  style={{
                    textAlign:'center',
                    width: '100%',
                    backgroundColor: 'red',
                    borderRadius: '5px',
                    color: 'white' 
                  }}
                  >No hay días pagados.</p>
                ) : (
                  pagos?.pagados?.map((dia, index) => (
                    <div key={index}><label
                    style={{
                      textAlign:'center',
                      width: '100%',
                      backgroundColor: 'darkcyan',
                      borderRadius: '5px',
                      color: 'white',
                      margin:'3px' 

                    }}
                    >Día Pagado: {dia}</label></div>
                  ))
                )
              ) : (
                pagos?.noPagados?.length === 0 ? (
               
                  
                  <p
                  style={{
                    textAlign:'center',
                    width: '100%',
                    backgroundColor: 'red',
                    borderRadius: '5px',
                    color: 'white' 
                  }}
                  >No hay días no pagados.</p>           
                 
                ) : (
                  

                  pagos?.noPagados?.map((dia, index) => (
                    <div key={index}>
                    <label
                    style={{
                      textAlign:'center',
                      width: '100%',
                      backgroundColor: pagos?.noPagados?.every((row) => new Date(row) <= new Date(pagos.fechaDeContrato)) ? 'gray' : 'orange',
                      borderRadius: '5px',
                      color: 'white',
                      margin:'3px' 
                    }}
                    >Día No Pagado: {dia}</label></div>
                  ))
                )
              )}
            </div>
            </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button 
                      onClick={()=>handleCancel()} 
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
                ) :
                (
                  null
                )
              }
           
            </div>
          </Modal>

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
                              <h2>Lista de Arrendatarios </h2>
                              
                              <div className="clearfix"> </div>
                          </div>
                          <div className="x_content">
                              <div className="row">
                                  <div className="col-sm-12">
                                      <div className="card-box table-responsive">
                                          <p className="text-muted font-13 m-b-30">
                                              El Gobierno Autonomo Municipal de Tarija - Cercado tiene la jurisdiccion de designar en calidad de arriendo, los puestos de Cada mercado de la provincia cercado en la ciudada de Tarija, manteniendo el orden y el uso adecuado de los puestos dedicados al comercio.
                                          </p>
                                          <div className="dropdown">
                                             <button type="button"  data-toggle="modal" data-target="#NuevoMercado" style={{color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}}  onClick={() => showModal() } >  <i className="fa fa-plus" style={{ marginRight: '4px' }} ></i>Nuevo</button>
                                          </div>
                                          <table id="datatable" className="table table-striped table-bordered" style={{width:"100%"}}>
                                              <thead>
                                                  <tr>
                                                      <th>Nombre</th>
                                                      <th>Carnet</th>
                                                      <th>Mercado</th>
                                                      <th>Puesto</th>
                                                      <th>Pagar</th>
                                                      <th>Imprimir Reporte</th>
      
                                                  </tr>
                                              </thead>
      
      
                                              <tbody>
                                                  {/* <tr>
                                                      <td>Juan Perez</td>
                                                      <td>54654561</td>
                                                      <td>La Loma</td>
                                                      <td>50</td>
                                                      <td><button type="button" className="btn btn-warning fa fa-money" data-toggle="modal" data-target="#PagarCanchaje"></button>
                                                      </td>
                                                      <td>
                                                          <button type="button" className="btn btn-info fa fa-file-pdf-o"></button>
      
                                                      </td>
                                                  </tr> */}
                                                  {
                                                    arrendatario.length == 0 ?
                                                    (
                                                        <tr><td colSpan={6}  style={{textAlign:'center'}} ><span style={{fontWeight:'bold'}}>No Hay Datos...</span></td></tr>
                                                    )
                                                    :
                                                    (
                                                     arrendatario.map((row, i)=>(
                                                        <tr key={i}>
                                                            <td><label
                                                            style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}  
                                                            >{row.name}</label></td>
                                                            <td><label
                                                            style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}
                                                            >{row.cedula}</label></td>
                                                            <td><label
                                                             style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}
                                                            >{row.mercado.nombre}</label></td>
                                                            <td><label
                                                             style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}
                                                            >{row.local.length == 0 ? 'Sin Asignar' : row.local.map((file)=>file.number).join(', ')}</label></td>

                                                            <td><button type="button" className="btn btn-warning fa fa-money" data-toggle="modal" data-target="#PagarCanchaje" onClick={()=>handleShowModalPago(row,row.id)} disabled={row.local == 0} ></button>
                                                      </td>
                                                      <td>
                                                          <button type="button" className="btn btn-info fa fa-file-pdf-o" disabled={row.local == 0}></button>
      
                                                      </td>
                                                        </tr>
                                                     ))   
                                                    )
                                                  }
      
                                                        
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
  )
}

export default Arrendatarios