import { useState } from "react";

const UseHistorial = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [arrendatarios, setArrendatarios] = useState([])
    const [selectArrendatario, setSelectArrendatario] = useState("")
    const [historial, setHistorial] = useState([]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value); 
    setSelectArrendatario("")
    setHistorial([])
  };
  const handleChangeArrendario = (event) => {
    setSelectArrendatario(event.target.value); 
  };
  return {
    selectedOption,
    handleChange,
    setArrendatarios,
    arrendatarios,

    selectArrendatario,
    handleChangeArrendario,

    historial,
    setHistorial
  }
    
  
}

export default UseHistorial