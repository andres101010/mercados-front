
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
import { useEffect } from "react";
// Registrar los componentes en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Dashboard = () => {

const url = import.meta.env.VITE_URL_LOCAL;
   

   const info = async () => {
    try {
      const result = await axios.get(`${url}/getInfo`, {withCredentials: true});
      console.log("result: ", result);
    } catch (error) {
      console.log("Error: ", error);
    }
   }

   useEffect(()=>{
    info()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

   // Datos para el gráfico
   const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ventas 2024",
        data: [30, 45, 60, 70, 90, 100], // Datos numéricos
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
    { label: "Pagos Hoy", value: "$7,600", color: "green" },
    { label: "No pagados Hoy", value: "12 días", color: "red" },
    { label: "Total de mercados", value: "$1,520", color: "blue" },
    { label: "Total de arrendatarios", value: "Viernes ($2,200)", color: "purple" },
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
