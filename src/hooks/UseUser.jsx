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
      const uploadLocation = {
        ...location,
        id: id,
        carnet: Number(location.carnet),
        phone: Number(location.phone)
      }
      setCurrentLocation(uploadLocation);
      
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