import { Link, useParams } from 'react-router-dom';
import { getAllArrendatarios, createArrendatario } from '../services/arrendatario';
import UseArrendatarios from '../hooks/UseArrendatarios';
import { useEffect, useCallback } from 'react';
import { Modal, Form, Input, Button, DatePicker,Checkbox, List  } from 'antd';
import Swal from 'sweetalert2';
import { getPagos, createPago } from '../services/pagos';
import moment from "moment";


const { MonthPicker } = DatePicker;

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
            setWeekOffset,
            valueInput,
            setValueInput,

            selectedMonth,
            setSelectedMonth,
            excludedDates,
            setExcludedDates,
            isCalendarOpen,
            setIsCalendarOpen,
            
            selectedPaymentDates,
            setSelectedPaymentDates,

            isCalendarOpen2,
            setIsCalendarOpen2,
    } = UseArrendatarios();
    const { place } = useParams();
 
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
 

  const initialValues = { name: '', lastName: '', cedula: '', phone:'', address:'', rubro: '',};

  const onFinish = async (values) => {
   
    try {
      await createArrendatario(values, place)
      Swal.fire({
        icon: 'Success',
        title: 'success',
        text: "Arrendatario Creado Con Exito..",
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
    
       console.log("value", values);
       console.log("selectedPaymentDates",selectedPaymentDates)
       const body = {
        arrendatario:currentLocation._id,
        local: currentLocation.local?.map((row)=>row._id),
        // diasPagados: values.fechas ? values.fechas : [values.fecha.format('YYYY-MM-DD')],
        diasPagados: selectedPaymentDates,
        monto: values.monto,
        excludedDates : excludedDates,
        mes: values.mes || values.fecha
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
      setExcludedDates([])
      setSelectedMonth(null)
      setIsCalendarOpen(false)
      setSelectedPaymentDates([])
    } catch (error) {
      console.log("Error: ", error);
      const errorMessage = error?.response?.data?.error || 'Ocurrió un error al crear el Pago.';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'Aceptar'
    });
    form.resetFields();
    handleOk(); 
      setShowModaPago(false);
      setExcludedDates([])
      setSelectedMonth(null)
      setIsCalendarOpen(false)
    
    }
  };

  const data = !valueInput ? arrendatario : arrendatario.filter((row)=>row.name.toLowerCase().includes(valueInput.toLowerCase()));
  const handleData = (e) => {
    setValueInput(e.target.value)
  }

  
  const handleCheckboxChange = (e) => {
    setIsMultipleDates(e.target.checked);
    // Reset selected month and excluded dates when toggling
    setSelectedMonth(null);
    setExcludedDates([]);
    form.resetFields(['fecha', 'fechas']);

  };


  const handleMonthChange = (date) => {
    setSelectedMonth(date);
    setExcludedDates([]); // Reset excluded dates when changing the month
  };

  const handleDateSelection = (date) => {
    if (!date) return;

    const formattedDate = date.format('YYYY-MM-DD');
    setExcludedDates((prev) => {
      if (!prev.includes(formattedDate)) {
        return [...prev, formattedDate];
      }
      return prev;
    });
  };

  const handleRemoveDate = (dateToRemove) => {
    setExcludedDates((prev) => prev.filter((date) => date !== dateToRemove));
  };



  const handlePaymentDateSelection = (dates) => {
    console.log("dates", dates)
    if (!dates || dates.length === 0) return; // Evitar valores nulos

    const formattedDates = [dates].map(date => date.format("YYYY-MM-DD"));

    // Agregar solo las fechas nuevas, evitando duplicados
    setSelectedPaymentDates((prevDates) => [
      ...new Set([...prevDates, ...formattedDates])
    ]);
  };

  
  const handleRemovePaymentDate = (date) => {
    setSelectedPaymentDates(selectedPaymentDates.filter(d => d !== date));
  };
  

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const toggleCalendar2 = () => {
    setIsCalendarOpen2(!isCalendarOpen2);
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

                  <Form.Item
                    label="Rubro del Arrendatario"
                    name="rubro"
                    rules={[{ required: true, message: 'Por favor ingrese el rubro del Arrendatario!' }]}
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
        <>
          <Form.Item
            label="Seleccionar Mes"
            name="mes"
            rules={[{ required: true, message: 'Por favor seleccione el mes!' }]}
          >
            <MonthPicker
              format="YYYY-MM"
              onChange={handleMonthChange}
              value={selectedMonth}
            />
          </Form.Item>

          {selectedMonth && (
            <>
              <Form.Item label="Seleccionar Fechas para Excluir">
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={handleDateSelection}
                  // disabledDate={disabledDate}
                  // disabledDate={(current) => current && current < moment().startOf('day')}
                  disabledDate={(current) => current && current < moment(pagos.fechaDeContrato, 'YYYY-MM-DD').startOf('day')}
                  open={isCalendarOpen}
                />
                <Button type="primary" onClick={toggleCalendar} style={{ marginTop: '10px' }}>
                  {isCalendarOpen ? 'Cerrar Calendario' : 'Abrir Calendario'}
                </Button>
              </Form.Item>

              <Form.Item>
                <p>Días excluidos seleccionados:</p>
                <List
                  dataSource={excludedDates}
                  renderItem={(date) => (
                    <List.Item
                      actions={[
                        <Button
                          type="link"
                          onClick={() => handleRemoveDate(date)}
                          key="remove"
                        >
                          Eliminar
                        </Button>,
                      ]}
                    >
                      {date}
                    </List.Item>
                  )}
                />
              </Form.Item>


                 {/* Seleccionar fechas a pagar */}
    {/* <Form.Item label="Seleccionar Fechas a Pagar">
      <DatePicker
        format="YYYY-MM-DD"
        onChange={handlePaymentDateSelection}
        disabledDate={(current) => current && current < moment(pagos.fechaDeContrato, 'YYYY-MM-DD').startOf('day')}
      />
    </Form.Item> */}

<Form.Item label="Seleccionar Fechas a Pagar">
        <DatePicker
          format="YYYY-MM-DD"
          onChange={handlePaymentDateSelection}
          disabledDate={(current) => current && current < moment(pagos.fechaDeContrato, "YYYY-MM-DD").startOf("day")}
          open={isCalendarOpen2}
        />
         <Button type="primary" onClick={toggleCalendar2} style={{ marginTop: '10px' }}>
                  {isCalendarOpen2 ? 'Cerrar Calendario' : 'Abrir Calendario'}
         </Button>
      </Form.Item>

    <Form.Item>
      <p>Días seleccionados para pagar:</p>

        <List
          dataSource={selectedPaymentDates}
          renderItem={(date) => (
            <List.Item 
              key={date} 
              actions={[
                <Button key={`remove-${date}`} type="link" onClick={() => handleRemovePaymentDate(date)}>
                  Eliminar
                </Button>
              ]}
            >
              {date}
            </List.Item>
          )}
        />
    </Form.Item>


            </>
          )}
        </>
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
                    >Día Pagado: {dia} <i className="fa fa-check"></i></label></div>
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
                    >Día No Pagado: {dia} <i className="fa fa-exclamation-triangle"></i></label></div>
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
                                          <div className="d-flex justify-content-between align-items-center">
                                             <button type="button"  data-toggle="modal" data-target="#NuevoMercado" style={{color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}}  onClick={() => showModal() } >  <i className="fa fa-plus" style={{ marginRight: '4px' }} ></i>Nuevo</button>
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
                                          
                                          <table id="datatable" className="table table-striped table-bordered" style={{width:"100%"}}>
                                              <thead>
                                                  <tr>
                                                      <th>Nombre</th>
                                                      <th>Carnet</th>
                                                      <th>Mercado</th>
                                                      <th>Puesto</th>
                                                      <th>Rubro</th>
                                                      <th>Pagar</th>
                                                      <th>Ultimo Reporte De Pago</th>
                                                      <th>Pago De Todo el Año</th>
      
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
                                                    data.length == 0 ?
                                                    (
                                                        <tr><td colSpan={6}  style={{textAlign:'center'}} ><span style={{fontWeight:'bold'}}>No Hay Datos...</span></td></tr>
                                                    )
                                                    :
                                                    (
                                                      data.map((row, i)=>(
                                                        <tr key={i}>
                                                            <td  data-label="Nombre:"><label
                                                            style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}  
                                                            >{row.name}</label></td>
                                                            <td  data-label="Carnet:"><label
                                                            style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}
                                                            >{row.cedula}</label></td>
                                                            <td  data-label="Mercado:"><label
                                                             style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}
                                                            >{row.mercado.nombre}</label></td>
                                                            <td  data-label="Cant De Puestos:"><label
                                                             style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: row.local.length == 0 ? 'red' : 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}
                                                            >{row.local.length == 0 ? 'Sin Asignar' : row.local.map((file)=>file.number).join(', ')}</label></td>

                                                            <td  data-label="Rubro:"><label
                                                             style={{
                                                              textAlign:'center',
                                                              width: '100%',
                                                              backgroundColor: 'darkcyan',
                                                              borderRadius: '5px',
                                                              color: 'white' 
                                                            }}
                                                            >{row.rubro}</label></td>


                                                            <td><button type="button" className="btn btn-warning fa fa-money" data-toggle="modal" data-target="#PagarCanchaje" onClick={()=>handleShowModalPago(row,row.id)} disabled={row.local == 0} style={{backgroundColor:row.local == 0 ? 'gray' : null}}></button>
                                                      </td>
                                                      <td>
                                                          <Link to={`/${row._id}pago/pdf`}> <button type="button" className="btn btn-info fa fa-file-pdf-o" disabled={row.local == 0} style={{backgroundColor:row.local == 0 ? 'gray' : null}}></button></Link>
      
                                                      </td>
                                                      <td>
                                                          <Link to={`/${row._id}todoElAño/pdf`}> <button type="button" className="btn btn-info fa fa-file-pdf-o" disabled={row.local == 0} style={{backgroundColor:row.local == 0 ? 'gray' : null}}></button></Link>
      
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