// import { useContext } from "react"
// import { UserContext } from "../context/UserProvider"
import { findUsers , createUser, editUser } from "../services/user"
import UseUser from "../hooks/UseUser"
import { useEffect } from "react";
import { Modal, Form, Input, Button, Select, Upload, InputNumber  } from 'antd';
import Swal from 'sweetalert2';
import { UploadOutlined } from '@ant-design/icons';

const Usuarios = () => {
    // const { handleMercados } = useContext(UserContext)
    const [form] = Form.useForm();
    const { Option } = Select;
    const { 
        allUsers,
        setAllUsers,
        isModalVisible,
        // setIsModalVisible,
        showModal,
        handleOk,
        handleCancel,
    
        isEditModalVisible,
        currentLocation,
        handleEdit,
        // handleDelete,
    } = UseUser();
    const getAllUsers = async () => {
        try {
           const users = await findUsers()
           setAllUsers(users.data.users)
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    useEffect(()=>{
        getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


const initialValues = { name: '', lastName:'', email: '', password: '',level: '', avatar: '', carnet: '', phone:'', cargo:'' };


const onFinish = async (values) => {
    
    try {
      Swal.fire({
        icon: 'Success',
        title: 'success',
        text: "Usuario Creado Con Exito..",
        confirmButtonText: 'Aceptar'
    });
      await createUser(values)
      await getAllUsers()
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
      const formData = new FormData();

      // Agregar los campos al FormData
      Object.keys(values).forEach((key) => {
          if (key === 'avatar' && values.avatar?.fileList?.length > 0) {
              // Extraer el archivo crudo
              formData.append('avatar', values.avatar.fileList[0].originFileObj);
          } else {
              // Agregar los demás campos
              formData.append(key, values[key]);
          }
      });
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }
      Swal.fire({
        icon: 'success',
        title: 'success',
        text: "Usuario Editado Con Exito..",
        confirmButtonText: 'Aceptar'
    });
      await editUser(formData , currentLocation._id)
      await getAllUsers()
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

//  console.log("currentLocation._id",currentLocation._id);
  return (
    <div>
            <Modal
                title="Nuevo Usuario"
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
                    label="Nombre del Usuario"
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre del Usuario!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Apellido"
                    name="lastName" // Cambiado a minúsculas
                    rules={[{ required: true, message: 'Por favor ingrese el Apellido Del Usuario!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor ingrese el Email!' },
                            { type: 'email', message: 'Por favor ingrese un Email válido!' }
                        ]}
                    >
                        <Input placeholder="Ingrese su Email" />
                    </Form.Item>

                  <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingrese la contraseña!' }]}
                  >
                    <Input  type="password" placeholder="Ingrese su contraseña"/>
                  </Form.Item>

                  <Form.Item
                    label="Nivel"
                    name="level"
                    rules={[{ required: true, message: 'Por favor Seleccione Un Nivel!' }]}
                  >
                    <Select placeholder="Seleccione Uno!">
                        <Option key="1" value="1">Administrador</Option>
                        <Option key="2" value="2">Digitador</Option>
                    </Select>
                  </Form.Item>

                  {/* <Form.Item
                    label="Foto"
                    name="avatar"
                    rules={[{ required: false, message: 'Por favor seleccione una foto!' }]}
                  >
                    <Upload 
                        listType="picture" // Muestra vistas previas de imágenes
                        beforeUpload={() => false} // Evita la carga automática
                        accept="image/*" // Restringe el tipo de archivo a imágenes
                    >
                        <Button icon={<UploadOutlined />}>Seleccionar Foto</Button>
                    </Upload>
                   
                  </Form.Item> */}

                  <Form.Item
                    label="Carnet"
                    name="carnet"
                    rules={[
                        { required: true, message: 'Por favor ingrese el número del carnet!' },
                        { type: 'number', message: 'El carnet debe ser un número válido!' }
                    ]}
                >
                    <InputNumber placeholder="Ingrese el número del carnet" style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Telefono"
                    name="phone"
                    rules={[
                        { required: true, message: 'Por favor ingrese el número de Telefono!' },
                        { type: 'number', message: 'El Telefono debe ser un número válido!' }
                    ]}
                >
                    <InputNumber placeholder="Ingrese el número del carnet" style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Cargo"
                    name="cargo"
                    rules={[{ required: true, message: 'Por favor Seleccione Un Cargo!' }]}
                  >
                    <Select placeholder="Seleccione Uno!">
                        <Option key="Administrador de Mercados" value="Administrador de Mercados">Administrador de Mercados</Option>
                        <Option key="Sub Administrador" value="Sub Administrador">Sub Administrador</Option>
                    </Select>
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
              title="Editar Usuario"
              open={isEditModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              {currentLocation && (
                <Form
                  layout="vertical"
                  name="edit-form"
                  initialValues={{
                    name: currentLocation.name,
                    lastName: currentLocation.lastName,
                    email: currentLocation.email,
                    cargo: currentLocation.cargo,
                    carnet: currentLocation.carnet,
                    password: currentLocation.password,
                    phone: currentLocation.phone,
                    avatar: currentLocation.avatar,
                    level: currentLocation.level,
                  }}
                  onFinish={onFinishEdit} // Define `onFinishEdit` para procesar los datos editados
                  encType="multipart/form-data"
                >
                      <Form.Item
                    label="Nombre del Usuario"
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre del Usuario!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Apellido"
                    name="lastName" // Cambiado a minúsculas
                    rules={[{ required: true, message: 'Por favor ingrese el Apellido Del Usuario!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor ingrese el Email!' },
                            { type: 'email', message: 'Por favor ingrese un Email válido!' }
                        ]}
                    >
                        <Input placeholder="Ingrese su Email" />
                    </Form.Item>

                  <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingrese la contraseña!' }]}
                  >
                    <Input  type="password" placeholder="Ingrese su contraseña"/>
                  </Form.Item>

                  <Form.Item
                    label="Nivel"
                    name="level"
                    rules={[{ required: true, message: 'Por favor Seleccione Un Nivel!' }]}
                  >
                    <Select placeholder="Seleccione Uno!">
                        <Option key="1" value="1">Administrador</Option>
                        <Option key="2" value="2">Digitador</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Foto"
                    name="avatar"
                    rules={[{ required: false, message: 'Por favor seleccione una foto!' }]}
                  >
                    <Upload 
                        listType="picture" // Muestra vistas previas de imágenes
                        beforeUpload={() => false} // Evita la carga automática
                        accept="image/*" // Restringe el tipo de archivo a imágenes
                    >
                        <Button icon={<UploadOutlined />}>Seleccionar Foto</Button>
                    </Upload>
                   
                  </Form.Item>

                  <Form.Item
                    label="Carnet"
                    name="carnet"
                    rules={[
                        { required: true, message: 'Por favor ingrese el número del carnet!' },
                        { type: 'number', message: 'El carnet debe ser un número válido!' }
                    ]}
                >
                    <InputNumber placeholder="Ingrese el número del carnet" style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Telefono"
                    name="phone"
                    rules={[
                        { required: true, message: 'Por favor ingrese el número de Telefono!' },
                        { type: 'number', message: 'El Telefono debe ser un número válido!' }
                    ]}
                >
                    <InputNumber placeholder="Ingrese el número del carnet" style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Cargo"
                    name="cargo"
                    rules={[{ required: true, message: 'Por favor Seleccione Un Cargo!' }]}
                  >
                    <Select placeholder="Seleccione Uno!">
                        <Option key="Administrador de Mercados" value="Administrador de Mercados">Administrador de Mercados</Option>
                        <Option key="Sub Administrador" value="Sub Administrador">Sub Administrador</Option>
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
                                <h2>Lista Usuarios habilitados </h2>
                                <ul className="nav navbar-right panel_toolbox">
        
                                    {/* <li className="dropdown">
                                        <button type="button" className="btn btn-info fa fa-plus" data-toggle="modal" data-target="#RegistroUsuarios"> Nuevo</button>
                                    </li> */}
        
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
                                            <div className="dropdown">
                                             <button type="button"  data-toggle="modal" data-target="#NuevoMercado" style={{color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}} onClick={() => showModal()} >  <i className="fa fa-plus" style={{ marginRight: '4px' }} ></i>Nuevo</button>
                                            </div>
                                            <table id="datatable" className="table table-striped table-bordered" style={{width:"100%"}}>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Carnet</th>
                                                        <th>Celular</th>
                                                        <th>Cargo</th>
                                                        <th>Permiso</th>
                                                        <th>Editar</th>
                                                        {/* <th>Movimientos</th> */}
        
                                                    </tr>
                                                </thead>
        
        
                                                <tbody>
                                                    {/* <tr>
                                                        <td>Dante Medina</td>
                                                        <td>46586723</td>
                                                        <td>75654981</td>
                                                        <td>Administrador de Mercados</td>
                                                        <td><label style={{color:"white", backgroundColor:"darkcyan"}}>Admin</label></td>
                                                        <td><button type="button" className="btn btn-warning fa fa-pencil"></button></td>
                                                        <td>
                                                            <button type="button" className="btn btn-info fa fa-file-pdf-o"></button>
        
                                                        </td>
                                                    </tr> */}
        
                                                    {
                                                        allUsers && allUsers.length == 0 ? 
                                                        (
                                                            <tr><td colSpan={6}  style={{textAlign:'center'}} ><span style={{fontWeight:'bold'}}>No Hay Datos...</span></td></tr>
                                                        ) 
                                                        : 
                                                        (
                                                            allUsers.map((row,i)=>(
                                                                <tr key={i}>
                                                                    <td  data-label="Nombre:">{row.name}</td>
                                                                    <td  data-label="Carnet:">{row.carnet}</td>
                                                                    <td  data-label="Telefono:">{row.phone}</td>
                                                                    <td>{row.cargo}</td>
                                                                    <td  data-label="Niv. De Usuario:"><label style={{color:"white", backgroundColor:"darkcyan", width:'100%', textAlign:'center'}}>{row.level == 1 ? "Admin" : row.level == 2 ? "Sub Admin" : ""}</label></td>
                                                                    <td><button type="button" className="btn btn-warning fa fa-pencil" onClick={()=>handleEdit(row, row._id)}></button></td>
                                                                    {/* <td>
                                                                        <button type="button" className="btn btn-info fa fa-file-pdf-o"></button>
                    
                                                                    </td> */}
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

export default Usuarios