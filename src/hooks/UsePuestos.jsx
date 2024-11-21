import {useState} from 'react'
import { Form } from 'antd';
const UsePuestos = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    const [puestos, setPuestos] = useState([]);
    const [arrendatarios, setArrendatarios] = useState([]);
    const showModal = () => {
        console.log("click modal");
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false)
    };

  const [form] = Form.useForm();


    const handleCancel = () => {
        form.resetFields();
        setCurrentLocation(null);
        setIsModalVisible(false);
        setIsEditModalVisible(false)

    };

    
    const handleEdit = (location, id) => {
      console.log("location: " , location);
      console.log("id: " , id);
      setCurrentLocation({...location, id}); 
      setIsEditModalVisible(true);  // Mostrar el modal de edición
    };

  return {
    isModalVisible,
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel,

    isEditModalVisible,
    currentLocation,
    handleEdit,

    puestos,
    setPuestos,

    arrendatarios,
    setArrendatarios , 

    form
   }
    
  
}

export default UsePuestos