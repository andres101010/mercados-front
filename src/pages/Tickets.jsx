import { Modal, Form, Input, Button } from "antd";
import UseTickets from "../hooks/UseTickets";
import { createTickets, getTickets, editTickets, deleteTickets } from "../services/tickets";
import Swal from 'sweetalert2';
import { useEffect } from "react";

const Tickets = () => {

    const {ticket, setTicket, showModal, setShowModal, handleShowModal, cancel, initialValues,form,  showUseTickets,
        handleShowUseTickets, dataUseTickets, setShowUseTickets, valueInput,
        setValueInput} = UseTickets();

    const getAllTickets = async () =>{ 
       const response = await getTickets();
       setTicket(response.data) 
    };

    useEffect(() => {
        getAllTickets();
    }, []);

    const onFinish = async (values) => {
        try {
            const obj = {
                cantidad:Number( values.cantidad),
                rubro: values.rubro
            }
            await createTickets(obj)
             Swal.fire({
                icon: 'success',
                 title: 'success',
                 text: "Ticket Creado Con Exito..",
                confirmButtonText: 'Aceptar'
            });
            setShowModal(false);
            form.resetFields();
            await getAllTickets();
        } catch (error) {
            console.log("error", error);
              const errorMessage = error?.response?.data?.message || 'Ocurrió un error al crear los tikets.';
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                    confirmButtonText: 'Aceptar'
                });
            throw error; 
        }
    }

    const onFinishEdit = async (values) => {
        try {
            
            const body = {
                id: dataUseTickets._id,
                cantidad: values.cantidad
            }
            await editTickets(body);
            Swal.fire({
                icon: 'success',
                 title: 'success',
                 text: "Ticket Cargado Con Exito..",
                confirmButtonText: 'Aceptar'
            });
            setShowUseTickets(false);
            form.resetFields();
            await getAllTickets()
        } catch (error) {
            console.log("error", error);
            throw error
        }
    }

    const deleteTiket = async (row) => {
        console.log("row", row);
        try {
            await deleteTickets(row._id)
            Swal.fire({
                icon: 'success',
                 title: 'success',
                 text: "Ticket Eliminado Con Exito..",
                confirmButtonText: 'Aceptar'
            });
            await getAllTickets();
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }

    const handleInput = (event) => {
        setValueInput(event.target.value);
    }
    let data = !valueInput ? ticket.tikets : ticket.tikets.filter((t) => t.rubro.toLowerCase().includes(valueInput.toLowerCase()) )
    return(
        <div>
        <Modal
          form={form}
          open={showModal}
          title="Nuevos Tickets"
          centered
          onCancel={cancel}
          footer={null}
        >
           <Form
                  key={form}
                  layout="vertical"
                  name="demo-form"
                  initialValues={initialValues}
                  onFinish={onFinish} // Maneja el envío del formulario
                >
                  <Form.Item
                    label="Cantidad De Tickets"
                    name="cantidad"
                    rules={[{ required: true, message: 'Por favor ingrese la cantidad de tickets' }]}
                  >
                    <Input type="number"/>
                  </Form.Item>
                  <Form.Item
                    label="Rubro"
                    name="rubro"
                    rules={[{ required: true, message: 'Por favor escriba el rubro' },{ pattern: /^[a-zA-Z\s]+$/, message: 'El rubro debe contener solo letras' }]}
                  >
                    <Input/>
                  </Form.Item>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button 
                      onClick={cancel} 
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
        </Modal>
        
        <Modal
        title="Ticket"
        centered
        open={showUseTickets}
        onCancel={cancel}
        footer={null}
        >
        {
            dataUseTickets &&
            <Form
            key={form}
            onFinish={onFinishEdit}
            initialValues={dataUseTickets}
            
            >
                <Form.Item
                  label="Cantidad"
                  name="cantidad"
                  initialValue={dataUseTickets.cantidad}
                >
                  <Input type="number" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button 
                      onClick={cancel} 
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
        }

        </Modal>

        <div className="page-title">
            <div className="title_left">
                <h3>Administradores<small> - GAMT</small></h3>
            </div>
    
    
        </div>
    
        <div className="clearfix"></div>

        <div className="row">
                  
        
                  <div className="col-md-12 col-sm-12 ">
                      <div className="x_panel">
                          <div className="x_title">
                              <h2>Seccion Tickets</h2>
                             
                              <div className="clearfix"> </div>
                          </div>
                          <div className="x_content">
                              <div className="row">
                                  <div className="col-sm-12">
                                      <div className="card-box table-responsive">
                                          <p className="text-muted font-13 m-b-30">
                                              El Gobierno Autonomo Municipal de Tarija - Cercado tiene la jurisdiccion de designar en calidad de arriendo, los puestos de Cada mercado de la provincia cercado en la ciudada de Tarija, manteniendo el orden y el uso adecuado de los puestos dedicados al comercio.
                                          </p>
                                          <div className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
                                           <button type="button"  data-toggle="modal" data-target="#NuevoMercado" style={{color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}} onClick={() => handleShowModal()} >  <i className="fa fa-plus" style={{ marginRight: '4px' }} ></i>Nuevo</button>

                                          <div className="input-group" style={{ width: '200px' }}>
                                            <span className="input-group-text bg-light">
                                               <i className="fas fa-search"></i>
                                            </span>
                                            <input 
                                              type="text" 
                                              className="form-control shadow-sm" 
                                              placeholder="Rubro" 
                                              onChange={handleInput} 
                                            />
                                          </div>
                                          </div>

                                         
                                          <div>
                                            {
                                                data?.length == 0 ? <p>Sin Datos</p> :
                                                data?.slice()
                                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                                .map((row,i)=>{
                                                    let fecha = row.createdAt.split("T")[0]
                                                    console.log("fecha", fecha);
                                                    return(
                                                        <div key={i} style={{width:'280px', height:'250px', margin:"auto", border:'solid 2px darkgray', borderRadius:'5px', padding:'5px', textAlign:'center', marginBottom:'5px'}}>
                                                            <h1>{fecha}</h1>
                                                            <p><strong>Total Tikets Inicial: {row.totalTickets}</strong></p>
                                                            <p><strong>Total Tikets Restantes: {row.availableTickets}</strong></p>
                                                            <p><strong>Rubro: {row.rubro}</strong></p>
                                                            <button className="btn btn-primary" onClick={()=> handleShowUseTickets(row)}>Usar Tickets</button>
                                                            <button className="btn btn-danger" onClick={()=>deleteTiket(row)} >Eliminar</button>
                                                        </div>
                                                    )
                                                })
                                            }
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

export default Tickets;