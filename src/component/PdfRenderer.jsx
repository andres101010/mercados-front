/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { getInfoPdf } from "../services/pdf";

const MyDocument = ({dataPdf, dataPdfPago, dataPdfContrato}) => {
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
            color: "darkcyan",
            fontWeight:"bold",
        },
        text: {
            fontSize: 15,
             color:"darkcyan",
             textAlign:"center"
        },
        p: {
            fontSize: 12,
            color: "darkgray",
        },
        textHeader: {
            fontSize: 22,
            color: "darkcyan",
            textAlign: "center",
            marginBottom: "10px",
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
        tableCell: {
          borderWidth: 1,
          borderColor: "#bdbdbd",
          padding: 5,
          flex: 1,
          textAlign: "center",
        },
        tableTitle: {
          fontSize: 14,
          marginBottom: 10,
          textAlign: "center",
          fontWeight: "bold",
        },
      });
    let nameMercado;
    dataPdf.length > 0 ? dataPdf?.map((row)=> nameMercado = row.mercado.nombre) : dataPdfPago.length > 0 ? dataPdfPago.map((row)=> nameMercado =  row.pago.local.mercado.nombre) : dataPdfContrato.length > 0 ? dataPdfContrato.map((row)=> nameMercado =  row.contrato.mercado.nombre) : nameMercado = "Este Mercado No Tiene Puestros Asignados"
    
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
    // console.log("dataPdfPago", dataPdfPago);
    // console.log("dataPdfCONTRATO", dataPdfContrato);
    // console.log("dias", dias);
    // console.log("año", año);
    // console.log("mes", mes);
    // console.log("meses", meses[mes]);
    return (
       
        <Document>
        <Page size="A4" style={styles.page}>
                    <View style={styles.sectionHeader}>
                        {
                            dataPdf.length > 0 ? <Text style={styles.header}>Reporte De Mercados</Text> : dataPdfPago.length > 0 ?
                            <Text style={styles.header}>Reporte De Pagos</Text> : dataPdfContrato.length > 0 ? <Text style={styles.header}>Acta De Entrega De Puesto De Venta</Text> : null

                        }
                        
                        <Text style={styles.p}>GOBIERNO AUTONOMO MUNICIPAL DE TARIJA</Text>
                        <Text style={styles.p}>Direccion de Orden Y seguridad Ciudadana</Text>
                        <Text style={styles.p}>Unidad Tecnica De Mercados Municipales</Text>
                    </View>
                    
                    <Text style={styles.textHeader}>
                            {`Mercado: ${nameMercado}`}
                    </Text>
                    {
                         dataPdf.length > 0 ? 
                            <Text style={styles.headerArrendatario}>
                                    {'Arrendatarios: '}
                            </Text>
                            : dataPdfPago.length > 0 ?
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
                 dataPdf.length > 0 ?  dataPdf.map((row, i) => (
                    <View style={styles.section} key={i}>
                        
                        
                        <Text style={styles.text}>
                            {`Nombre: ${row.name} ${row.lastName}`}
                        </Text>
                        <Text style={styles.text}>
                            {`Cédula: ${row.cedula}`}
                        </Text>
                        <Text style={styles.text}>
                            {`Teléfono: ${row.phone}`}
                        </Text>
                        <Text style={styles.text}>
                            {`Direccion: ${row.address}`}
                        </Text>
                        <Text style={styles.text}>
                            {`Fecha De Contrato: ${row.local.map((row)=>row.fechaDeContrato)}`}
                        </Text>
                        <Text style={styles.text}>
                            {`Puesto Numero: ${row.local.map((row)=>row.number)}`}
                        </Text>
                    </View>
                    

                ))
                : dataPdfPago.length > 0 ?
                dataPdfPago.map((row, i)=>(
                    <View style={styles.sectionPago} key={i}>
                        
                        
                        <Text style={styles.headerTextPago}>
                            {'Arrendatario:' } 
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago.arrendatario.name} ${row.pago.arrendatario.lastName}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Cédula: `}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago.arrendatario.cedula}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Teléfono: `}
                        </Text>
                        <Text style={styles.textPago}>
                            {` ${row.pago.arrendatario.phone}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Direccion:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {` ${row.pago.arrendatario.address}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Fecha De Pago:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago.fechaPago.split('T')[0]}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Local Numero:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago.local.number}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Estado:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago.local.status}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Monto:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago.monto}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {`Monto Por Dia:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {`${row.pago.montoPorDia}`}
                        </Text>
                        <Text style={styles.headerTextPago}>
                            {/* {`Dias Pagados : ${row.pago.diasPagados.map((row)=> row)}`} */}
                            {`Días Pagados:`}
                        </Text>
                        <Text style={styles.textPago}>
                            {/* {`Dias Pagados : ${row.pago.diasPagados.map((row)=> row)}`} */}
                            {`${row.pago.diasPagados.join(', ')}`}
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
                            <Text style={{ fontSize: '15px', textAlign: 'center' }}>{`Firma`}</Text>
                            <Text style={{ fontSize: '15px', textAlign: 'center' }}>{`Arrendatario`}</Text>
                        </View>

                        {/* Columna de Arrendado */}
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>{`----------`}</Text>
                            <Text style={{ fontSize: '15px', textAlign: 'center' }}>{`Firma`}</Text>
                            <Text style={{ fontSize: '15px', textAlign: 'center' }}>{`Arrendado`}</Text>
                        </View>
                        </View>

                    </View>
                )
            })
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
    const { place } = useParams();

    const infoPdf = async () => {
        try {
            const response = await getInfoPdf(place);
            const noIncludesPago = response.data.every(row => !row.pago); 
            const noIncludesContrato = response.data.every(row => !row.contrato); 
            if (JSON.stringify(dataPdf) !== JSON.stringify(response.data) && noIncludesPago && noIncludesContrato) {
                setDataPdf(response.data);
                // console.log("entroo 1111");
            }else if(JSON.stringify(dataPdf) !== JSON.stringify(response.data) && noIncludesContrato){
                setDataPdfPago(response.data)
                // console.log("entrooo 2222");
            }else{
                setDataPdfContrato(response.data)
                // console.log("entroo3333");
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(()=>{
        infoPdf()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // console.log("aaaaa", dataPdfContrato);
    // Función para manejar la impresión
    // const handlePrint = async () => {
    //     const blob = await pdf(<MyDocument />).toBlob(); // Genera un blob del PDF
    //     const url = URL.createObjectURL(blob); // Crea una URL para el blob

    //     // Crea un iframe temporal para cargar el PDF y enviar la orden de impresión
    //     const iframe = document.createElement("iframe");
    //     iframe.style.position = "absolute";
    //     iframe.style.top = "-1000px";
    //     iframe.src = url;

    //     iframe.onload = () => {
    //         iframe.contentWindow.print(); // Ejecuta la impresión
    //         URL.revokeObjectURL(url); // Limpia la URL temporal
    //     };

    //     document.body.appendChild(iframe);
    // };
 
    const handlePrint = React.useCallback(async () => {
        const blob = await pdf(<MyDocument dataPdf={dataPdf} dataPdfPago={dataPdfPago} dataPdfContrato={dataPdfContrato} />).toBlob();
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
    }, [dataPdf, dataPdfPago, dataPdfContrato]);

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
                        <MyDocument dataPdf={dataPdf} dataPdfPago={dataPdfPago} dataPdfContrato={dataPdfContrato}/>
                    </PDFViewer>
                </div>
            )}

            {/* Botón para descargar */}
            <PDFDownloadLink document={<MyDocument dataPdf={dataPdf}  dataPdfPago={dataPdfPago} dataPdfContrato={dataPdfContrato}/>} fileName="ejemplo-documento.pdf">
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
