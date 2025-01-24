import { useState } from "react"
import { Form } from 'antd';

const UseTickets = () => {
    const [ticket, setTicket] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showUseTickets, setShowUseTickets] = useState(false)
    const [dataUseTickets, setDataUseTickets] = useState(null)
    const [valueInput, setValueInput] = useState(null);

    let initialValues = {cantidad: '', rubro:''};


    const [form] = Form.useForm();


    const handleShowModal = () => {
        setShowModal(true)
    }
    const handleShowUseTickets = (data) => {
        console.log("data", data);
        setDataUseTickets(data)
        setShowUseTickets(true)
    }
    const cancel = () => {
        form.resetFields();
        setShowModal(false)
        setShowUseTickets(false)
        initialValues = {cantidad:'', rubro:''}
    }


    return{
        ticket,
        setTicket,
        showModal,
        setShowModal,
        handleShowModal,
        cancel,
        initialValues,
        form,
        showUseTickets,
        setShowUseTickets,
        handleShowUseTickets,
        dataUseTickets,
        valueInput,
        setValueInput
        
    }
}

export default UseTickets;