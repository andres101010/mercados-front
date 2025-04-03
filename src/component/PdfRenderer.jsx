/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { getInfoPdf } from "../services/pdf";




const MyDocument = ({dataPdf, dataPdfPago, dataPdfContrato, dataPdfObservaciones, dataPdfPagoTodo}) => {

    
    const generarRangoMeses = (fechaInicio, resumenPagos) => {
        if(resumenPagos.length > 0){
            const mesesDisponibles = resumenPagos
              .map(([mes]) => mes) // Extraemos solo los nombres de los meses
              .sort((a, b) => {
                const [mesA, añoA] = a.split('-');
                const [mesB, añoB] = b.split('-');
          
                const fechaA = new Date(`${añoA}-${mesANumero(mesA)}-01`);
                const fechaB = new Date(`${añoB}-${mesANumero(mesB)}-01`);
          
                return fechaA - fechaB;
              });
          
            // console.log("Meses Disponibles Ordenados:", mesesDisponibles);
          
            const inicio = new Date(fechaInicio);
            // const fin = new Date(`${mesesDisponibles.at(-1).split('-')[1]}-${mesANumero(mesesDisponibles.at(-1).split('-')[0])}-01`);
          
            const [mesTexto, año] = mesesDisponibles.at(-1).split('-');
            const mes = mesANumero(mesTexto); // Suponiendo que devuelve el número del mes (Ej: Marzo → 3)
            const fin = new Date(año, mes - 1, 1); // mes - 1 porque en JS enero = 0, febrero = 1, marzo = 2...
    
            // console.log("Fecha Fin:", fin);
    
            fin.setMonth(fin.getMonth() + 1, 0);
          
            let meses = [];
            let actual = new Date(inicio);
    
            while (actual <= fin) {  
            const nombreMes = actual.toLocaleString('es-ES', { month: 'long' });
            const año = actual.getFullYear();
            const key = `${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}-${año}`;
    
            meses.push(key);
            actual.setMonth(actual.getMonth() + 1); 
            }
    
            return meses;
        }
    };

   
    

      const mesANumero = (mes) => {
        const meses = {
          "Enero": "01", "Febrero": "02", "Marzo": "03", "Abril": "04",
          "Mayo": "05", "Junio": "06", "Julio": "07", "Agosto": "08",
          "Septiembre": "09", "Octubre": "10", "Noviembre": "11", "Diciembre": "12"
        };
        return meses[mes];
      };
      
      let mesesPago;
      let deudasPorAño;

    if (dataPdfPagoTodo.length > 0) {
        const { fechaContrato, resumenPagos } = dataPdfPagoTodo[0];
        mesesPago = generarRangoMeses(fechaContrato, resumenPagos);
      
        // Crear una nueva estructura con objetos
        mesesPago = mesesPago?.map((mes) => {
            const pagoEncontrado = resumenPagos.find(r => r[0] === mes); // Buscar coincidencia
    
            return {
                mes, 
                pago: pagoEncontrado ? pagoEncontrado[1] : null // Si hay pago, lo agrega; si no, null
            };
        });
    
      

        // Extraemos los años únicos
        deudasPorAño = mesesPago?.reduce((acc, val) => {
            const año = val.mes.split("-")[1]; // Extraemos el año del mes
            if (!acc[año]) {
                acc[año] = { deudaAnual: 0, meses: [] };
            }
            
            // Agregamos el mes a la lista de meses
            acc[año].meses.push(val);
            
            // Sumamos la deuda si hay pago registrado
            if (val.pago) {
                acc[año].deudaAnual += val.pago.deudaMensual;
            }

            return acc;
        }, {});

        if(deudasPorAño){
            dataPdfPagoTodo = Object.entries(deudasPorAño).map(([año, datos]) => ({
                año,
                deudaAnual: datos.deudaAnual,
                meses: datos.meses
            }));
        }
    }

    // console.log("deudasPorAño", deudasPorAño)

   

    // console.log("dataPdfPagoTodo",dataPdfPagoTodo)

    // console.log("dataPdf",dataPdf)
    

    const styles = StyleSheet.create({
        page: {
            flexDirection: "column",
            padding: 20,
        },
        sectionHeader: {
            margin: 10,
            padding: 10,
            textAlign: "center",
        },
        section: {
            margin: 10,
            padding: 10,
            border: "1px solid #ccc",
            textAlign: "center",
        },
        header: {
            fontSize: 28,
            marginBottom: 10,
            marginTop: 10,
            color: "black",
            fontWeight:"bold",
        },
        text: {
            fontSize: 12,
             color:"black",
             textAlign:"center",
        },
        p: {
            fontSize: 12,
            color: "#36454F",

        },
        textHeader: {
            fontSize: 22,
            color: "black",
            textAlign: "center",
            marginBottom: "5px",
            fontWeight:"bold",

        },
        headerArrendatario: {
            fontSize: 22,
            margin: 15,
            color:"darkcyan",
            textAlign:"center"
        },
        sectionPago: {
            margin: 10,
            padding: 10,
            border: "1px solid #ccc",
            textAlign: "center",
            height: "70%",
        },
        textPago: {
            fontSize: 15,
            color:"#212529",
            marginBottom: "15px",

        },
        headerTextPago:{
            fontSize: 22,
            color:"darkcyan",
            marginBottom: "10px",
        },
        headerContrato: {
            fontSize: 20,
            margin: 15,
            color:"darkgray",
            textAlign: "center"

        },
        headerObs:{
            fontSize:20,
            margin: 15,
            color:"darkcyan",
            textAlign: "center",
            fontWeight:"bold",

        },
        textObs:{
            fontSize: 15,
             color:"#36454F",
             textAlign:"center",
             marginTop: 10,
             fontWeight:"bold",
        }
    });
    const stylesTable = StyleSheet.create({
        table: {
          display: "table",
          width: "auto",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#bdbdbd",
          margin: 10,
        },
        tableRow: {
          flexDirection: "row",
        },
        tableCellHeader: {
          backgroundColor: "#f2f2f2",
          borderWidth: 1,
          borderColor: "#bdbdbd",
          padding: 5,
          fontWeight: "bold",
          flex: 1,
          textAlign: "center",
        },
        tableCellHeader2: {
          backgroundColor: "#f2f2f2",
          borderWidth: 1,
          borderColor: "#bdbdbd",
          padding: 5,
          fontWeight: "bold",
          flex: 1,
          textAlign: "center",
          fontSize: 14
        },
        tableCell: {
          borderWidth: 1,
          borderColor: "#bdbdbd",
          padding: 5,
          flex: 1,
          textAlign: "center",
        },
        tableCell2: {
          borderWidth: 1,
          borderColor: "#bdbdbd",
          padding: 5,
          flex: 1,
          textAlign: "center",
          fontSize: 10,
        },
        tableTitle: {
          fontSize: 14,
          marginBottom: 10,
          textAlign: "center",
          fontWeight: "bold",
        },
      });
    let nameMercado;
    dataPdf.length > 0 && dataPdf[0].reporte  ? dataPdf[0].reporte.map((row)=> nameMercado = row.mercado?.nombre) : dataPdfPago.length > 0 && dataPdfPago[0].pago ? dataPdfPago.map((row)=> nameMercado =  row.pago.local.mercado.nombre) : dataPdfContrato.length > 0 ? dataPdfContrato.map((row)=> nameMercado =  row.contrato.mercado.nombre) : dataPdfObservaciones.length > 0 ? dataPdfObservaciones.map((row)=> nameMercado = row.mercado.nombre) : nameMercado = "Sin Registros asignados"
    
    let dias ;
    let año;
    let mes;
    dataPdfContrato.map((row)=> {
        dias = row.contrato.fechaDeContrato?.split("-")[2]
        año = row.contrato.fechaDeContrato?.split("-")[0]
        mes = row.contrato.fechaDeContrato?.split("-")[1] - 1
    })

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", 
        "Junio", "Julio", "Agosto", "Septiembre", 
        "Octubre", "Noviembre", "Diciembre"
    ];
    // console.log("datapdfpagoTodo", dataPdfPagoTodo);
    // console.log("dataPdfCONTRATO", dataPdfContrato);
    // console.log("dias", dias);
    // console.log("año", año);
    // console.log("mes", mes);
    // console.log("meses", meses[mes]);
    return (
       
        <Document>
        <Page key="page1" size="A4" style={styles.page}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.p}>GOBIERNO AUTONOMO MUNICIPAL DE TARIJA</Text>
                        <Text style={styles.p}>Direccion de Orden Y seguridad Ciudadana</Text>
                        <Text style={styles.p}>Unidad Tecnica De Mercados Municipales</Text>
                        {
                            dataPdf.length > 0 && dataPdf[0].reporte ? <Text style={styles.header}>Reporte De Mercados</Text> : dataPdfPago.length > 0 ?
                            <Text style={styles.header}>Reporte De Pagos</Text> : dataPdfContrato.length > 0 ? <Text style={styles.header}>Acta De Entrega De Puesto De Venta</Text> : 
                            dataPdfObservaciones.length > 0 ? <Text style={styles.header}>Reporte De Observaciones</Text> : dataPdfPagoTodo.length > 0 ? <Text style={styles.header}>Reporte De Pago Anual</Text> : null

                        }
                        
                        
                    </View>
                    {
                        dataPdfPagoTodo.length > 0 ?
                        <Text style={styles.textHeader}>
                            {`Sin Registros`}
                        </Text>
                        :
                    <Text style={styles.textHeader}>
                            {`Mercado: ${nameMercado}`}
                    </Text>

                    }
                    {
                         dataPdf.length > 0 && dataPdf[0].reporte ?          
                            <Text style={styles.headerArrendatario}>
                                    {'Arrendatario '}
                            </Text>
                            : dataPdfPago.length > 0 && dataPdfPago[0].pago ?
                            <Text style={styles.headerArrendatario}>
                                    {'Pago: '}
                            </Text>
                            // : dataPdfContrato.length > 0 ?
                            // <Text style={styles.headerArrendatario}>
                            //         {'Acta De Entrega '}
                            // </Text> 
                            : null
                    }
            {
                 dataPdf.length > 0 && dataPdf[0].reporte  ?  dataPdf[0].reporte.map((row, i) => (
                    <View style={styles.section} key={i}>
                        
                        
                        <Text style={styles.headerTextPago}>
                            {`Nombre`}
                        </Text>
                        <Text style={styles.text}>
                            {`${row.name} ${row.lastName}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Cédula`}
                        </Text>
                        <Text style={styles.text}>
                            {`${row.cedula}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Teléfono`}
                        </Text>
                        <Text style={styles.text}>
                            {`${row.phone}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Direccion`}
                        </Text>
                        <Text style={styles.text}>
                            {`${row.address}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Fecha De Contrato`}
                        </Text>
                        <Text style={styles.text}>
                            {`${row?.local?.map((row)=>row.fechaDeContrato)}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Puesto Numero`}
                        </Text>
                        <Text style={styles.text}>
                            {`${row?.local?.map((row)=>row.number)}`}
                        </Text>
                    </View>
                    

                ))
                : dataPdfPago.length > 0 && dataPdfPago[0].pago ?
                dataPdfPago.map((row, i)=>(
                    <View style={styles.sectionPago} key={i}>
                        
                        
                        <Text style={styles.headerTextPago}>
                            {'Arrendatario:' } 
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago?.arrendatario.name} ${row.pago?.arrendatario.lastName}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Cédula: `}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago?.arrendatario.cedula}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Teléfono: `}
                        </Text>
                        <Text style={styles.textPago}>
                            {` ${row.pago?.arrendatario.phone}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Direccion:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {` ${row.pago?.arrendatario.address}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Fecha De Pago:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago?.fechaPago.split('T')[0]}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Local Numero:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago?.local.number}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Estado:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago?.local.status}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Monto:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago?.monto}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Monto Por Dia:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago?.montoPorDia}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {/* {`Dias Pagados : ${row.pago.diasPagados.map((row)=> row)}`} */}
                            {`Días Pagados:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {/* {`Dias Pagados : ${row.pago.diasPagados.map((row)=> row)}`} */}
                            {`${row.pago?.diasPagados.join(', ')}`}
                        </Text>
                    </View>
                )
            ) : 
            dataPdfContrato.length > 0 ? 
            dataPdfContrato.map((row)=>{
                return (
                    <View style={styles.sectionContrato} key={row.id}>
                        
                      
                        <Text style={styles.text}>
                        {`A los ${dias} dias del mes de ${meses[mes]} de ${año} la DIRECCION - ADMINISTRACION DE MERCADOS MUNICIPALES en el marco de lo estipulado por el Articulo 11°,Paragrafo IV del REGLAMENTO DE ORGANIZACION  Y FUNCIONAMIENTO DE MERCADO MUNICIPALES, REALIZA LA ENTREGA DEL PUESTO DE VENTA al Señor/a ${row.contrato.arrendatario.name}${row.contrato.arrendatario.lastName}. Portador de la cedula de Identidad N° ${row.contrato.arrendatario.cedula} de acuerdo a las siguentes caracteristicas: `}
                        </Text>

                        <View style={stylesTable.table}>
                        {/* Encabezado de la tabla */}
                        <View style={stylesTable.tableRow}>
                        <Text style={stylesTable.tableCellHeader}>Numero De Puesto</Text>
                        <Text style={stylesTable.tableCellHeader}>Sector(rubro)</Text>
                        <Text style={stylesTable.tableCellHeader}>Monto Previsto(diario)</Text>
                        <Text style={stylesTable.tableCellHeader}>Monto Previsto(mensual)</Text>
                        <Text style={stylesTable.tableCellHeader}>Agua</Text>
                        <Text style={stylesTable.tableCellHeader}>Luz</Text>
                        </View>
                        {/* Filas de la tabla */}
                        {
                            dataPdfContrato.map((row,i)=>(
                                <View style={stylesTable.tableRow} key={i}>
                                   <Text style={stylesTable.tableCell}>{row.contrato.number}</Text>
                                   <Text style={stylesTable.tableCell}>{row.contrato.arrendatario.rubro}</Text>
                                   <Text style={stylesTable.tableCell}> {row.contrato.pago?.montoPorDia != null ? `${row.contrato.pago.montoPorDia} Bs` : "Aun No Tiene Registros Se Pago"}</Text>
                                   <Text style={stylesTable.tableCell}>-------</Text>
                                   <Text style={stylesTable.tableCell}>Si</Text>
                                   <Text style={stylesTable.tableCell}>Si</Text>
                                </View>
                            ))
                        }
                       
                    </View>

                        <Text style={styles.text}>
                            {`De igual manera el/a Sr/a ${row.contrato.arrendatario.name}${row.contrato.arrendatario.lastName}, manifienta su compromiso de Brindar estricto cumplimiento a lo determinado por el REGLAMENTO DE ORGANIZACION Y FUNCIONAMIENTO DE MERCADOS MUNICIPALES y demas normativas legal conexa, como asi mismo a cumplir con todas y cada una de las obligaciones establecidas por la Direccion De Mercados y el Gobierno Autonomo Municipal de Tarija, requisitos fundamentales para asumir la titularidad Formal de un puesto de ventas.En caso de incimplimiento por parte del Titular , el Gobierno Autonomo Municipal de Tarija, mediante la direccion de Mercados y sus brazos operativos impondra las sanciones determinadas en la normativa legal vigente y para tal efecto.`}
                        </Text>
                        <Text style={styles.text}>
                            {`ART. N°6 Numeral 32: Titular del Puesto; Es la persona que realiza una actividad economica en un puesto de venta en el interior de los mercados municipales cuyo nombre  se encuentra inscrito, en el registro de actividades econoimicas  de la Direccion de ingresos. La titularidad de un Puesto en ningun caso significa significa ceder el derecho propietario del mismo (corresponde solo al derecho de uso en tanto cumpla con sus obligaciones).`}
                        </Text>
                      

                         <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '30px' }}>
                        {/* Columna de Arrendatario */}
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>{`----------`}</Text>
                            <Text style={{ fontSize: '15px', textAlign: 'center' }}>{`Recibi Conforme`}</Text>
                            <Text style={{ fontSize: '10px', textAlign: 'center', marginTop:'5px' }}>{`Nombre___________________`}</Text>
                            <Text style={{ fontSize: '10px', textAlign: 'center', marginTop:'5px' }}>{`CI___________________`}</Text>
                        </View>

                        {/* Columna de Arrendado */}
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>{`----------`}</Text>
                            <Text style={{ fontSize: '15px', textAlign: 'center' }}>{`Entregue Conforme`}</Text>
                            {/* <Text style={{ fontSize: '15px', textAlign: 'center' }}>{`Arrendado`}</Text> */}
                            <Text style={{ fontSize: '10px', textAlign: 'center', marginTop:'5px' }}>{`Nombre___________________`}</Text>
                            <Text style={{ fontSize: '10px', textAlign: 'center', marginTop:'5px' }}>{`CI___________________`}</Text>
                        </View>
                        </View>

                    </View>
                )
            })
            : dataPdfObservaciones.length > 0 ?
            dataPdfObservaciones.map((row)=>(
                
                    <View style={styles.sectionContrato} key={row.id}>
                         <Text style={styles.headerObs}>
                        {`Datos Personales `}
                        </Text>
                         <Text style={styles.textObs}>
                        {`Nombre: ${row.arrendatario.name} ${row.arrendatario.lastName}`}
                        </Text>
                         <Text style={styles.textObs}>
                        {`CI: ${row.arrendatario.cedula}`}
                        </Text>
                         <Text style={styles.textObs}>
                        {`Direccion: ${row.arrendatario.address}`}
                        </Text>
                         <Text style={styles.textObs}>
                        {`Telefono: ${row.arrendatario.phone}`}
                        </Text>
                        <Text style={styles.headerObs}>
                        {`Rubro `}
                        </Text>
                        <Text style={styles.textObs}>
                        {`${row.arrendatario.rubro}`}
                        </Text>
                        <Text style={styles.headerObs}>
                        {`Local `}
                        </Text>
                        <Text style={styles.textObs}>
                        {`N°: ${row.mercado.local}`}
                        </Text>
                        <Text style={styles.headerObs}>
                        {`Observaciones `}
                        </Text>
                        <Text style={styles.textObs}>
                        {`N° De Notificacion: ${row.observacion.numNotificacion}`}
                        </Text>
                        <Text style={styles.textObs}>
                        {`Fecha: ${row.observacion.fecha}`}
                        </Text>
                        <Text style={styles.textObs}>
                        {`Falta: ${row.observacion.falta}`}
                        </Text>
                        <Text style={styles.textObs}>
                        {`OBSERVACION`}
                        </Text>
                        <Text style={styles.textObs}>
                        {` ${row.observacion.observacion}`}
                        </Text>
                        
                    </View>
                
            ))
            : dataPdfPagoTodo.length > 0 ?
              dataPdfPagoTodo.map((row,i)=>(
            <View style={stylesTable.table} key={i}>
                {/* Encabezado de la tabla */}
                <View style={stylesTable.tableRow}>
                        <Text style={stylesTable.tableCellHeader2}>Año</Text>
                        <Text style={stylesTable.tableCellHeader2}>Dias Cont.</Text>
                        <Text style={stylesTable.tableCellHeader2}>Dias Pagados</Text>
                        <Text style={stylesTable.tableCellHeader2}>Dias Adeud.</Text>
                        <Text style={stylesTable.tableCellHeader2}>Deuda</Text>
                        <Text style={stylesTable.tableCellHeader2}>Deuda Anual</Text>
                </View>

                    {/* Filas de la tabla */}
        {row.meses?.map((mesData, j) => (
            <View style={stylesTable.tableRow} key={j}>
                {/* <Text style={stylesTable.tableCell2}>{row.año}</Text> */}
                <Text style={stylesTable.tableCell2}>{mesData.mes}</Text>
                <Text style={stylesTable.tableCell2}>{mesData.pago?.diasTotales || "Sin Registro de pago"}</Text>
                <Text style={stylesTable.tableCell2}>{mesData.pago?.diasPagados || "0"}</Text>
                <Text style={stylesTable.tableCell2}>{mesData.pago?.diasAdeudados || "0"}</Text>
                <Text style={stylesTable.tableCell2}>{mesData.pago?.deudaMensual || "-"}</Text>
                <Text style={stylesTable.tableCell2}>{j === row.meses.length - 1 ? row.deudaAnual : "-"}</Text>
            </View>
        ))}
                       
                
              </View>
              ))

              : null
            }
            
        </Page>
    </Document>

    );
};

const PdfRenderer = () => {
    const [showPdf, setShowPdf] = React.useState(true);
    // const printContainerRef = useRef(null);

    const [dataPdf, setDataPdf] = React.useState([])
    const [dataPdfPago, setDataPdfPago] = React.useState([])
    const [dataPdfContrato, setDataPdfContrato] = React.useState([])
    const [dataPdfObservaciones, setDataPdfObservaciones] = React.useState([])
    const [dataPdfPagoTodo, setDataPdfPagoTodo] = React.useState([])
    const { place } = useParams();

    const infoPdf = async () => {
        try {
            const response = await getInfoPdf(place);
            const noIncludesPago = response.data.every(row => !("pago" in row)); 
            const noIncludesContrato = response.data.every(row => !("contrato" in row)); 
            const noIncludesObservaciones = response.data.every(row => !("observacion" in row)); 
            const noIncludesPagoTodo = response.data.every(row => !("fechaContrato" in row));  
            const noIncludesReportes = response.data.every(row => !("reporte" in row));

            if (JSON.stringify(dataPdf) !== JSON.stringify(response.data) && noIncludesPago && noIncludesContrato && noIncludesObservaciones && noIncludesPagoTodo) {
                setDataPdf(response.data);
                console.log("entroo 1111");
            }else if(JSON.stringify(dataPdfPago) !== JSON.stringify(response.data) && noIncludesContrato && noIncludesObservaciones && noIncludesPagoTodo && noIncludesReportes) {
                setDataPdfPago(response.data)
                console.log("entrooo 2222");
            }else if(JSON.stringify(dataPdfContrato) !== JSON.stringify(response.data) && noIncludesPago && noIncludesObservaciones && noIncludesPagoTodo){
                setDataPdfContrato(response.data)
                console.log("entroo3333");
            }else if(JSON.stringify(dataPdfObservaciones) !== JSON.stringify(response.data) && noIncludesPago && noIncludesContrato && noIncludesPagoTodo) {
                console.log("entroo444");

                setDataPdfObservaciones(response.data)
            }else{
                console.log("entroooo 55555555555")
                setDataPdfPagoTodo(response.data)
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(()=>{
        infoPdf()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
 
    const handlePrint = React.useCallback(async () => {
        const blob = await pdf(<MyDocument dataPdf={dataPdf} dataPdfPago={dataPdfPago} dataPdfContrato={dataPdfContrato} dataPdfObservaciones={dataPdfObservaciones} dataPdfPagoTodo={dataPdfPagoTodo} />).toBlob();
        const url = URL.createObjectURL(blob);
    
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.top = "-1000px";
        iframe.src = url;
    
        iframe.onload = () => {
            iframe.contentWindow.print();
            URL.revokeObjectURL(url);
        };
    
        document.body.appendChild(iframe);
    }, [dataPdf, dataPdfPago, dataPdfContrato, dataPdfObservaciones, dataPdfPagoTodo]);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{textAlign:'center'}}>Genera El Reporte En PDF</h1>
            <button onClick={() => setShowPdf(!showPdf)}  style={{marginBottom: "10px" , color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}}>
                {showPdf ? "Cerrar Vista Previa" : "Mostrar Vista Previa"}
            </button>

            {showPdf && (
                <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "10px" }}>
                    <h3>Vista Previa del PDF</h3>
                    {/* Vista previa del PDF */}
                    <PDFViewer style={{ width: "100%", height: "500px" }}>
                        <MyDocument dataPdf={dataPdf} dataPdfPago={dataPdfPago} dataPdfContrato={dataPdfContrato} dataPdfObservaciones={dataPdfObservaciones} dataPdfPagoTodo={dataPdfPagoTodo}/>
                    </PDFViewer>
                </div>
            )}

            {/* Botón para descargar */}
            <PDFDownloadLink document={<MyDocument dataPdf={dataPdf}  dataPdfPago={dataPdfPago} dataPdfContrato={dataPdfContrato} dataPdfObservaciones={dataPdfObservaciones} dataPdfPagoTodo={dataPdfPagoTodo}/>} fileName="ejemplo-documento.pdf">
                {({loading }) =>
                    loading ? "Cargando documento..." : <button style={{marginBottom: "10px" , color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}}>Descargar PDF</button>
                }
            </PDFDownloadLink>

            {/* Botón para imprimir */}
            <button onClick={handlePrint}  style={{marginLeft: "10px" , marginBottom: "10px" , color:'white', backgroundColor:'#17a2b8', textTransform: 'none !important', fontSize:'14px', padding: '.375rem .75rem', borderRadius:'3px', borderColor:'#17a2b8', border:'solid 1px transparent'}}>
                Imprimir PDF
            </button>
        </div>
    );
};

export default PdfRenderer;
