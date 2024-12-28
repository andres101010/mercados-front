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
             color:"darkcyan"
        },
        p: {
            fontSize: 12,
            color: "darkgray",
        },
        textHeader: {
            fontSize: 22,
            color: "darkcyan",
            textAlign: "center"
        },
        headerArrendatario: {
            fontSize: 22,
            margin: 15,
            color:"darkcyan"
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
        }
    });
    
    let nameMercado;
    dataPdf.length > 0 ? dataPdf?.map((row)=> nameMercado = row.mercado.nombre) : dataPdfPago.length > 0 ? dataPdfPago.map((row)=> nameMercado =  row.pago.local.mercado.nombre) : dataPdfContrato.length > 0 ? dataPdfContrato.map((row)=> nameMercado =  row.contrato.mercado.nombre) : null
    
    // console.log("dataPdfPago", dataPdfPago);
    // console.log("dataPdfCONTRATO", dataPdfContrato);

    return (
        // <Document>
        //     <Page size="A4" style={styles.page}>
        //         {
        //             // eslint-disable-next-line react/prop-types
        //             dataPdf.length == 0 ? null :
        //             // eslint-disable-next-line react/prop-types
        //             dataPdf.map((row, i)=>(
        //                 <>
        //                 <View style={styles.section}>
        //                     <Text style={styles.header}>Reporte De Mercados</Text>
        //                 </View>
        //                 <View style={styles.section}>
        //                     <Text style={styles.text}>Este es un ejemplo de texto dentro del PDF generado.</Text>
        //                 </View>
        //                 <View style={styles.section}>
        //                     <Text style={styles.text}>¡React-PDF es muy útil para crear documentos dinámicos!</Text>
        //                 </View>
        //                 </>
        //             ))
        //         }
                
        //     </Page>
        // </Document>
        <Document>
        <Page size="A4" style={styles.page}>
                    <View style={styles.sectionHeader}>
                        {
                            dataPdf.length > 0 ? <Text style={styles.header}>Reporte De Mercados</Text> : dataPdfPago.length > 0 ?
                            <Text style={styles.header}>Reporte De Pagos</Text> : dataPdfContrato.length > 0 ? <Text style={styles.header}>Contrato</Text> : null

                        }
                        
                        <Text style={styles.p}>El Gobierno Autonomo Municipal de Tarija - Cercado tiene la jurisdiccion de designar en calidad de arriendo, los puestos de Cada mercado de la provincia cercado en la ciudada de Tarija, manteniendo el orden y el uso adecuado de los puestos dedicados al comercio.</Text>
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
                            : dataPdfContrato.length > 0 ?
                            <Text style={styles.headerArrendatario}>
                                    {'Acta De Entrega: '}
                            </Text> : null
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
                        <Text style={styles.header}>Contrato</Text>
                        <Text style={styles.text}>
                            {`Fecha De Contrato: ${row.fechaDeContrato}`}
                        </Text>
                        <Text style={styles.text}>
                        </Text>
                        <Text style={styles.text}>
                        </Text>
                        <Text style={styles.text}>
                        </Text>
                        <Text style={styles.text}>
                        </Text>
                        <Text style={styles.text}>
                        </Text>
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
            console.log("resp", response.data);
            const noIncludesPago = response.data.every(row => !row.pago); 
            const noIncludesContrato = response.data.every(row => !row.contrato); 
            if (JSON.stringify(dataPdf) !== JSON.stringify(response.data) && noIncludesPago && noIncludesContrato) {
                setDataPdf(response.data);
                console.log("entroo 1111");
            }else if(JSON.stringify(dataPdf) !== JSON.stringify(response.data) && noIncludesContrato){
                setDataPdfPago(response.data)
                console.log("entrooo 2222");
            }else{
                setDataPdfContrato(response.data)
                console.log("entroo3333");
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
    }, [dataPdf, dataPdfPago]);

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
