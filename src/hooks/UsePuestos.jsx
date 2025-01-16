import {useState} from 'react'
import { Form } from 'antd';
const UsePuestos = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    const [puestos, setPuestos] = useState([]);
    const [arrendatarios, setArrendatarios] = useState([]);

    const [valueInput, setValueInput] = useState(null);

    const [open, setOpen] = useState(false)
    const [observacion, setObservacion] = useState(null)

    const [showModalObservacion, setShowModalObservacion] = useState(false)
    const [idpuesto, setIdpuesto] = useState(null)

    // const [showModalContrato, setShowModalContrato] = useState(false)

    // const openModalContrato = (id) => {
    //     setIdpuesto(id)
    //     setShowModalContrato(true)
    // }

    const openModalObservacion = (id) => {
      setIdpuesto(id)
      setShowModalObservacion(!showModalObservacion)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false);
        setOpen(false);
    };

  const [form] = Form.useForm();
  const [observationForm] = Form.useForm();

   const showOpen = (id) => {
    setObservacion(id, true);
    setOpen(true);
   }

    const handleCancel = () => {
        form.resetFields();
        setCurrentLocation(null);
        setIsModalVisible(false);
        setIsEditModalVisible(false)
        setOpen(false);
        setShowModalObservacion(false);
    };

    
    const handleEdit = (location, id) => {
      
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
    setCurrentLocation,
    handleEdit,

    puestos,
    setPuestos,

    arrendatarios,
    setArrendatarios , 

    form,

    
    valueInput,
    setValueInput,

    open,
    setOpen,
    showOpen,
    observacion,
    setObservacion,

    showModalObservacion,
    openModalObservacion,
    idpuesto,
    setIdpuesto,

    observationForm
   }
    
  
}

export default UsePuestos