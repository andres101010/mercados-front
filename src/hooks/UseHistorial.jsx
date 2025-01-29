import { useState } from "react";

const UseHistorial = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [arrendatarios, setArrendatarios] = useState([])
  const handleChange = (event) => {
    setSelectedOption(event.target.value); 
  };
  return {
    selectedOption,
    handleChange,
    setArrendatarios,
    arrendatarios
  }
    
  
}

export default UseHistorial