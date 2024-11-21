import {useState} from 'react'

const UseUser = () => {
    const [allUsers, setAllUsers] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);


    const showModal = () => {
        console.log("click modal");
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false)
    };

    
    const handleEdit = (location, id) => {
      
      setCurrentLocation({ ...location, id }); // Guardar el `location` que se está editando
      setIsEditModalVisible(true);  // Mostrar el modal de edición
    };

  return {
    allUsers,
    setAllUsers,

    isModalVisible,
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel,

    isEditModalVisible,
    currentLocation,
    handleEdit,
    // handleDelete,
  }
    
  
}

export default UseUser