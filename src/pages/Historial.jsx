import UseHistorial from "../hooks/UseHistorial"
import { UserContext } from "../context/UserProvider";
import { useContext, useEffect } from "react";
import { getAllArrendatarios } from "../services/arrendatario";
import { getHistorial } from "../services/historial";
const Historial = () => {
    const {
        selectedOption,
        handleChange,
        setArrendatarios,
        arrendatarios,

        selectArrendatario,
        handleChangeArrendario,

        historial,
        setHistorial
    } = UseHistorial();
      const {  mercados } = useContext(UserContext)
      // console.log("mercados: " ,mercados);
      // console.log("selectedOption: " ,selectedOption);

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
      
      // console.log("arrendatarios", arrendatarios);
      // console.log("selectArrendatario", selectArrendatario);

      useEffect(()=>{
        if(!selectArrendatario) return;
        const historial = async () => {
          try {
            const res = await getHistorial(selectArrendatario)
            
            setHistorial(res.data)
          } catch (error) {
            console.log("error", error);
          }
        }
        historial();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[selectArrendatario])
      // console.log("historial",historial)
  return (
    <div className="pageResponsive">
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
                                
                                      <div className="responsive-div" style={{display:"flex", justifyContent:'space-between', textAlign:'center'}}>
                                            <div style={{margin:'auto'}}>
                                            <h2>Selecciona un Mercado</h2>
                                            <select value={selectedOption} onChange={handleChange}
                                             style={{
                                              padding: '10px', 
                                              borderRadius: '5px', 
                                              border: '1px solid #ccc', 
                                              backgroundColor: '#f9f9f9',
                                              fontSize: '16px', 
                                              color: '#333', 
                                              width: '100%', 
                                              maxWidth: '300px',
                                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                              cursor: 'pointer'
                                           }}>
                                                <option value="" disabled>
                                                -- Selecciona una opción --
                                                </option>
                                               
                                                {
                                                    mercados.data.map((row,i)=>(
                                                      <option value={row.nombre} key={i}>{row.nombre}</option>

                                                    ))
                                                }
                                            </select>
                                            {/* <h6 style={{marginTop:'5px'}}>Opción seleccionada: {selectedOption}</h6> */}
                                            </div>
                                        
                                        <div style={{margin:'auto'}}>
                                          {
                                            arrendatarios.length == 0 && !selectedOption ?
                                            <div>
                                              <h2>Esperando A Que Seleccione Un Mercado</h2>
                                            </div>
                                            :
                                            arrendatarios.length == 0 && selectedOption ?
                                            <div>
                                             <h2>Este Mercado No Tiene Arrendatarios</h2>
                                            </div>
                                            :
                                            <div>
                                            <h2>Selecciona un Arrendatario</h2>
                                            <select value={selectArrendatario} onChange={handleChangeArrendario}
                                            style={{
                                              padding: '10px', 
                                              borderRadius: '5px', 
                                              border: '1px solid #ccc', 
                                              backgroundColor: '#f9f9f9',
                                              fontSize: '16px', 
                                              color: '#333', 
                                              width: '100%', 
                                              maxWidth: '300px',
                                              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                              cursor: 'pointer'
                                          }}>
                                            
                                                <option value="" disabled>
                                                -- Selecciona una opción --
                                                </option>
                                               
                                                {
                                                    arrendatarios?.map((row,i)=>(
                                                      <option value={row._id} key={i}>{row.name + " " + row.lastName}</option>

                                                    ))
                                                }
                                            </select>
                                            {/* <h6 style={{marginTop:'5px'}}>Opción seleccionada: {selectArrendatario}</h6> */}
                                            </div>
                                          }
                                        </div>
                                      </div>

                                      <div style={{width:'100%'}}>
                                        {
                                          historial.data?.historial?.length == 0 ? 
                                          <div style={{textAlign:'center', marginTop:'40px'}}>
                                            <h1>Este Arrendado No Tiene Historial </h1>
                                          </div> :
                                          historial.data?.historial?.map((row,i)=>(
                                            <div key={i} style={{textAlign:'center', marginTop:'40px'}}>
                                              <h1>HISTORIAL</h1>
                                              <h1>{ `N° ${i + 1}`}</h1>
                                              <h3>{row.arrendatario.name + " " + row.arrendatario.lastName}</h3>
                                              <h2>{row.mercado.nombre}</h2>
                                              <h2>{"Puesto " + " " + row.local?.number}</h2>
                                              <h2>{"Fecha Inicial " + " " + row.fechaInicial}</h2>
                                              <h2>{"Fecha De Salida " + " " + row.fechaFinal}</h2>
                                              <h3 style={{marginTop:'15px'}}>{"Observaciones Del Puesto "}</h3>
                                              {
                                                row.observaciones.length == 0 ?
                                                <h2>No Tiene Observaciones</h2>
                                                :
                                                row.observaciones.map((obs,i)=>(
                                                  <div key={i} >
                                                    <h2>{`Fecha De Observacion:  ${obs.fecha}`}</h2>
                                                    <h2>{`${obs.observacion}`}</h2>
                                                  </div>
                                                ))
                                              }
                                            </div>
                                          ))
                                        }
                                        {
                                          historial.data?.pagos?.length == 0 ?
                                          <h2>No Tiene Pagos Hechos</h2>
                                          :
                                          historial.data?.pagos?.map((row, i)=>(
                                          <div key={i} style={{textAlign:'center', marginTop:'40px'}}>
                                            <h1>Pagos</h1>
                                            <h1>{ `N° ${i + 1}`}</h1>
                                            <h2>{`Mes: ${row.mes}`}</h2>
                                            <h2>{`Dias Pagados: ${row.diasPagados.length}`}</h2>
                                            <h2>{`Monto: ${row.monto}`}</h2>
                                            <h2>{`Fecha de Pago: ${row.fechaPago}`}</h2>
                                          </div>
                                          ))
                                        }
                                      </div>
                                       

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