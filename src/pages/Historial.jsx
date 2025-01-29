import UseHistorial from "../hooks/UseHistorial"
import { UserContext } from "../context/UserProvider";
import { useContext, useEffect } from "react";
import { getAllArrendatarios } from "../services/arrendatario";
const Historial = () => {
    const {
        selectedOption,
        handleChange,
        setArrendatarios,
        arrendatarios
    } = UseHistorial();
      const {  mercados } = useContext(UserContext)
      console.log("mercados: " ,mercados);
      console.log("selectedOption: " ,selectedOption);

      useEffect(() => {
        if (!selectedOption) return;
        const getArrendatario = async () => {
          try {
            const res = await getAllArrendatarios(selectedOption);
            setArrendatarios(res.data);
          } catch (error) {
            console.log("Error: ", error);
          }
        };
      
        getArrendatario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [selectedOption]); // Solo se ejecuta cuando cambia selectedOption
      
      console.log("arrendatarios", arrendatarios);
  return (
    <div>
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
                              <h2>Seccion Historial</h2>
                             
                              <div className="clearfix"> </div>
                          </div>
                          <div className="x_content">
                              <div className="row">
                                  <div className="col-sm-12">
                                      <div className="card-box table-responsive">
                                          <p className="text-muted font-13 m-b-30">
                                              El Gobierno Autonomo Municipal de Tarija - Cercado tiene la jurisdiccion de designar en calidad de arriendo, los puestos de Cada mercado de la provincia cercado en la ciudada de Tarija, manteniendo el orden y el uso adecuado de los puestos dedicados al comercio.
                                          </p>
                                
                                          
                                          <div>
                                            <h2>Selecciona un Mercado</h2>
                                            <select value={selectedOption} onChange={handleChange}>
                                                <option value="" disabled>
                                                -- Selecciona una opción --
                                                </option>
                                               
                                                {
                                                    mercados.data.map((row,i)=>(
                                                      <option value={row.nombre} key={i}>{row.nombre}</option>

                                                    ))
                                                }
                                            </select>
                                            <h6 style={{marginTop:'5px'}}>Opción seleccionada: {selectedOption}</h6>
                                            </div>
                                        
                                          {
                                            
                                          }

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

export default Historial