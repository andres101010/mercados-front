
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";
// Registrar los componentes en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Dashboard = () => {

const url = import.meta.env.VITE_URL_LOCAL;
// const url = import.meta.env.VITE_URL_SERVICE;
   

   const [info, setInfo] = useState([])

   const getInfo = async () => {
    try {
      const result = await axios.get(`${url}/getInfo`, {withCredentials: true});
      setInfo(result.data);
    } catch (error) {
      console.log("Error: ", error);
      throw error
    }
   }

   useEffect(()=>{
    getInfo()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

  
   // Datos para el gráfico
   const data = {
    labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    datasets: [
      {
        label: "Pagos",
        data: [info?.pagosPorDia?.lunes, info?.pagosPorDia?.martes, info?.pagosPorDia?.miercoles, info?.pagosPorDia?.jueves, info?.pagosPorDia?.vienes, info?.pagosPorDia?.sabado, info?.pagosPorDia?.domingo], // Datos numéricos
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Color de las barras
        borderColor: "rgba(75, 192, 192, 1)", // Color del borde
        borderWidth: 1, // Ancho del borde
      },
    ],
  };



  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ventas Diarias",
      },
    },
  };

  // Información para los cuadros estadísticos
  const stats = [
    { label: "Pagos Total Esta Semana", value:info?.result?.montoPagado ? `$ ${info?.result?.montoPagado}` : "$ 0", color: "green" },
    { label: "Dias No Pagados Esta Semana", value: info?.result?.fechasNoPagadas ? `${info?.result?.fechasNoPagadas?.length} días` : "", color: "red" },
    { label: "Total de Mercados", value: info?.mercados, color: "blue" },
    { label: "Total de Arrendatarios", value: info.arrendatarios, color: "purple" },
  ];

  return (
    <div className="right_col" role="main">
      

          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
                <h1 style={{ textAlign: "center" }}>Rendimiento De Mercados</h1>

                {/* Sección de Cuadros Estadísticos */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "20px",
                    marginBottom: "40px",
                  }}
                >
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        backgroundColor: stat.color,
                        color: "white",
                      }}
                    >
                      <h3 style={{ margin: "0", fontSize: "1.2em" }}>{stat.label}</h3>
                      <p style={{ margin: "5px 0", fontSize: "1.5em", fontWeight: "bold" }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Gráfico de Barras */}
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                  <Bar data={data} options={barOptions} />
                </div>
              </div>
            
          </div>
  );
};

export default Dashboard;
