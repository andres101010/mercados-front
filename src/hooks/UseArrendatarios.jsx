import {useState} from 'react'
const UseArrendatarios = () => {
    const [arrendatario,setArrendatarios] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);

    const [showModaPago, setShowModaPago] = useState(false);
    const [isMultipleDates, setIsMultipleDates] = useState(false);
    const [pagos, setPagos] = useState([]);

    const [mostrarPagados, setMostrarPagados] = useState(false); // Estado para alternar entre listas

    const [weekOffset, setWeekOffset] = useState(0); 

    const [valueInput, setValueInput] = useState(null);


    const [selectedMonth, setSelectedMonth] = useState(null);
    const [excludedDates, setExcludedDates] = useState([]);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);


    const togglePagos = () => {
        setMostrarPagados((prev) => !prev);
    };


    const handleShowModalPago = async (location, id) => {
      setCurrentLocation({ ...location, id })
      setShowModaPago(true); 
     
    }
    

    const showModal = () => {
        
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false)
        setShowModaPago(false)
        setPagos([])
        setWeekOffset(0)
        setExcludedDates([]);
        setIsMultipleDates(false);
        setSelectedMonth(null)
    };

    
    const handleEdit = (location, id) => {
      
      setCurrentLocation({ ...location, id }); // Guardar el `location` que se está editando
      setIsEditModalVisible(true);  // Mostrar el modal de edición
    };

  return {
    arrendatario,
    setArrendatarios,
    isModalVisible,
    setIsModalVisible,
    showModal,
    handleOk,
    handleCancel,

    isEditModalVisible,
    currentLocation,
    handleEdit,

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
    setIsCalendarOpen     
  }
    
  
}

export default UseArrendatarios