
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

// Registrar los componentes en Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Dashboard = () => {
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

  // // Opciones para personalizar el gráfico
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top", // Posición de la leyenda
  //     },
  //     title: {
  //       display: true,
  //       text: "Gráfico de Barras - Ventas Mensuales",
  //     },
  //   },
  // };

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
    { label: "Total Ventas", value: "$7,600", color: "green" },
    { label: "No Ventas", value: "12 días", color: "red" },
    { label: "Promedio Diario", value: "$1,520", color: "blue" },
    { label: "Mejor Día", value: "Viernes ($2,200)", color: "purple" },
  ];

  return (
    <div className="right_col" role="main">
          {/* <div className="row" style="display: inline-block;">
            <div className=" top_tiles" style="margin: 10px 0;">
              <div className="col-md-3 col-sm-3  tile">
                <span>Total Sesiones</span>
                <h2>231,809</h2>
                <span className="sparkline_one" style="height: 160px;">
                      <canvas width="200" height="60" style="display: inline-block; vertical-align: top; width: 94px; height: 30px;"></canvas>
                  </span>
              </div>
              <div className="col-md-3 col-sm-3  tile">
                <span>Total Recaudado</span>
                <h2>$ 231,809</h2>
                <span className="sparkline_one" style="height: 160px;">
                      <canvas width="200" height="60" style="display: inline-block; vertical-align: top; width: 94px; height: 30px;"></canvas>
                  </span>
              </div>
              <div className="col-md-3 col-sm-3  tile">
                <span>Total Usuarios Activos</span>
                <h2>231,809</h2>
                <span className="sparkline_one" style="height: 160px;">
                      <canvas width="200" height="60" style="display: inline-block; vertical-align: top; width: 94px; height: 125px;"></canvas>
                  </span> 
              </div>
              <div className="col-md-3 col-sm-3  tile">
                <span>Total Gastos</span>
                <h2>231,809</h2>
                <span className="sparkline_one" style="height: 160px;">
                      <canvas width="200" height="60" style="display: inline-block; vertical-align: top; width: 94px; height: 30px;"></canvas>
                  </span>
              </div>
            </div>
          </div>
            <br/>


            <div className="row">
              <div className="col-md-12 col-sm-12 ">
                <div className="dashboard_graph x_panel">
                  <div className="x_title">
                    <div className="col-md-6">
                      <h3>Recaudaciones <small>Gráfica de Progreso</small></h3>
                    </div>
                    <div className="col-md-6">
                      <div id="reportrange" className="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
                        <i className="glyphicon glyphicon-calendar fa fa-calendar"></i>
                        <span>December 30, 2014 - January 28, 2015</span> <b className="caret"></b>
                      </div>
                    </div>
                  </div>
                  <div className="x_content">
                    <div className="demo-container" style="height:250px">
                      <div id="chart_plot_03" className="demo-placeholder"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-4 col-sm-6 ">
                <div className="x_panel fixed_height_320">
                  <div className="x_title">
                    <h2>App Devices <small>Sessions</small></h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                      </li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Settings 1</a>
                            <a className="dropdown-item" href="#">Settings 2</a>
                          </div>
                      </li>
                      <li><a className="close-link"><i className="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">
                    <h4>App Versions</h4>
                    <div className="widget_summary">
                      <div className="w_left w_25">
                        <span>1.5.2</span>
                      </div>
                      <div className="w_center w_55">
                        <div className="progress">
                          <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 66%;">
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </div>
                      <div className="w_right w_20">
                        <span>123k</span>
                      </div>
                      <div className="clearfix"></div>
                    </div>

                    <div className="widget_summary">
                      <div className="w_left w_25">
                        <span>1.5.3</span>
                      </div>
                      <div className="w_center w_55">
                        <div className="progress">
                          <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 45%;">
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </div>
                      <div className="w_right w_20">
                        <span>53k</span>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="widget_summary">
                      <div className="w_left w_25">
                        <span>1.5.4</span>
                      </div>
                      <div className="w_center w_55">
                        <div className="progress">
                          <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 25%;">
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </div>
                      <div className="w_right w_20">
                        <span>23k</span>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="widget_summary">
                      <div className="w_left w_25">
                        <span>1.5.5</span>
                      </div>
                      <div className="w_center w_55">
                        <div className="progress">
                          <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 5%;">
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </div>
                      <div className="w_right w_20">
                        <span>3k</span>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="widget_summary">
                      <div className="w_left w_25">
                        <span>0.1.5.6</span>
                      </div>
                      <div className="w_center w_55">
                        <div className="progress">
                          <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 2%;">
                            <span className="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </div>
                      <div className="w_right w_20">
                        <span>1k</span>
                      </div>
                      <div className="clearfix"></div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 ">
                <div className="x_panel tile fixed_height_320">
                  <div className="x_title">
                    <h2>Daily users <small>Sessions</small></h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                      </li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Settings 1</a>
                            <a className="dropdown-item" href="#">Settings 2</a>
                          </div>
                      </li>
                      <li><a className="close-link"><i className="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">


<table className="" style={{ width: '100%' }}>
  <tbody>
    <tr>
      <th style={{ width: '37%' }}>
        <p>Top 5</p>
      </th>
      <th>
        <div className="col-lg-7 col-md-7 col-sm-7">
          <p className="">Device</p>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-5">
          <p className="">Progress</p>
        </div>
      </th>
    </tr>
    <tr>
      <td>
        <canvas className="canvasDoughnut" height="140" width="140" style={{ margin: '15px 10px 10px 0' }}></canvas>
      </td>
      <td>
        <table className="tile_info">
          <tbody>
            <tr>
              <td>
                <p><i className="fa fa-square blue"></i>IOS </p>
              </td>
              <td>30%</td>
            </tr>
            <tr>
              <td>
                <p><i className="fa fa-square green"></i>Android </p>
              </td>
              <td>10%</td>
            </tr>
            <tr>
              <td>
                <p><i className="fa fa-square purple"></i>Blackberry </p>
              </td>
              <td>20%</td>
            </tr>
            <tr>
              <td>
                <p><i className="fa fa-square aero"></i>Symbian </p>
              </td>
              <td>15%</td>
            </tr>
            <tr>
              <td>
                <p><i className="fa fa-square red"></i>Others </p>
              </td>
              <td>30%</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>


                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6 ">
                <div className="x_panel fixed_height_320">
                  <div className="x_title">
                    <h2>Profile Settings <small>Sessions</small></h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                      </li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Settings 1</a>
                            <a className="dropdown-item" href="#">Settings 2</a>
                          </div>
                      </li>
                      <li><a className="close-link"><i className="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">
                    <div className="dashboard-widget-content">
                      <ul className="quick-list">
                        <li><i className="fa fa-line-chart"></i><a href="#">Achievements</a></li>
                        <li><i className="fa fa-thumbs-up"></i><a href="#">Favorites</a></li>
                        <li><i className="fa fa-calendar-o"></i><a href="#">Activities</a></li>
                        <li><i className="fa fa-cog"></i><a href="#">Settings</a></li>
                        <li><i className="fa fa-area-chart"></i><a href="#">Logout</a></li>
                      </ul>

                      <div className="sidebar-widget">
                        <h4>Profile Completion</h4>
                        <canvas width="150" height="80" id="chart_gauge_01" className="" style="width: 160px; height: 100px;"></canvas>
                        <div className="goal-wrapper">
                          <span id="gauge-text" className="gauge-value gauge-chart pull-left">0</span>
                          <span className="gauge-value pull-left">%</span>
                          <span id="goal-text" className="goal-value pull-right">100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6  widget_tally_box">
                <div className="x_panel">
                  <div className="x_title">
                    <h2>User Uptake</h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                      </li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Settings 1</a>
                            <a className="dropdown-item" href="#">Settings 2</a>
                          </div>
                      </li>
                      <li><a className="close-link"><i className="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">

                    <div id="graph_bar" style="width:100%; height:200px;"></div>

                    <div className=" bg-white progress_summary">

                      <div className="row">
                        <div className="progress_title">
                          <span className="left">Escudor Wireless 1.0</span>
                          <span className="right">This sis</span>
                          <div className="clearfix"></div>
                        </div>

                        <div className="">
                          <span>SSD</span>
                        </div>
                        <div className="">
                          <div className="progress progress_sm">
                            <div className="progress-bar bg-green" role="progressbar" data-transitiongoal="89"></div>
                          </div>
                        </div>
                        <div className=" more_info">
                          <span>89%</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="progress_title">
                          <span className="left">Mobile Access</span>
                          <span className="right">Smart Phone</span>
                          <div className="clearfix"></div>
                        </div>

                        <div className="">
                          <span>App</span>
                        </div>
                        <div className="">
                          <div className="progress progress_sm">
                            <div className="progress-bar bg-green" role="progressbar" data-transitiongoal="79"></div>
                          </div>
                        </div>
                        <div className=" more_info">
                          <span>79%</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="progress_title">
                          <span className="left">WAN access users</span>
                          <span className="right">Total 69%</span>
                          <div className="clearfix"></div>
                        </div>

                        <div className="">
                          <span>Usr</span>
                        </div>
                        <div className="">
                          <div className="progress progress_sm">
                            <div className="progress-bar bg-green" role="progressbar" data-transitiongoal="69"></div>
                          </div>
                        </div>
                        <div className=" more_info">
                          <span>69%</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

             
              <div className="col-md-4 col-sm-6 ">
                <div className="x_panel">
                  <div className="x_title">
                    <h2>Todays Weather <small>Sessions</small></h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                      </li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Settings 1</a>
                            <a className="dropdown-item" href="#">Settings 2</a>
                          </div>
                      </li>
                      <li><a className="close-link"><i className="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="temperature"><b>Monday</b>, 07:30 AM
                          <span>F</span>
                          <span><b>C</b>
                                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="weather-icon">
                          <span>
                                              <canvas height="84" width="84" id="partly-cloudy-day"></canvas>
                                          </span>

                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="weather-text">
                          <h2>Texas
                                              <i>Partly Cloudy Day</i>
                                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="weather-text pull-right">
                        <h3 className="degrees">23</h3>
                      </div>
                    </div>
                    <div className="clearfix"></div>


                    <div className="row weather-days">
                      <div className="col-sm-2">
                        <div className="daily-weather">
                          <h2 className="day">Mon</h2>
                          <h3 className="degrees">25</h3>
                          <span>
                                                  <canvas id="clear-day" width="32" height="32">
                                                  </canvas>

                                          </span>
                          <h5>15
                                              <i>km/h</i>
                                          </h5>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="daily-weather">
                          <h2 className="day">Tue</h2>
                          <h3 className="degrees">25</h3>
                          <canvas height="32" width="32" id="rain"></canvas>
                          <h5>12
                                              <i>km/h</i>
                                          </h5>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="daily-weather">
                          <h2 className="day">Wed</h2>
                          <h3 className="degrees">27</h3>
                          <canvas height="32" width="32" id="snow"></canvas>
                          <h5>14
                                              <i>km/h</i>
                                          </h5>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="daily-weather">
                          <h2 className="day">Thu</h2>
                          <h3 className="degrees">28</h3>
                          <canvas height="32" width="32" id="sleet"></canvas>
                          <h5>15
                                              <i>km/h</i>
                                          </h5>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="daily-weather">
                          <h2 className="day">Fri</h2>
                          <h3 className="degrees">28</h3>
                          <canvas height="32" width="32" id="wind"></canvas>
                          <h5>11
                                              <i>km/h</i>
                                          </h5>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="daily-weather">
                          <h2 className="day">Sat</h2>
                          <h3 className="degrees">26</h3>
                          <canvas height="32" width="32" id="cloudy"></canvas>
                          <h5>10
                                              <i>km/h</i>
                                          </h5>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>

              </div>
           

              <div className="col-md-4 col-sm-6 ">
                <div className="x_panel fixed_height_320">
                  <div className="x_title">
                    <h2>Incomes <small>Sessions</small></h2>
                    <ul className="nav navbar-right panel_toolbox">
                      <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                      </li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Settings 1</a>
                            <a className="dropdown-item" href="#">Settings 2</a>
                          </div>
                      </li>
                      <li><a className="close-link"><i className="fa fa-close"></i></a>
                      </li>
                    </ul>
                    <div className="clearfix"></div>
                  </div>
                  <div className="x_content">
                    <div className="dashboard-widget-content">
                      <ul className="quick-list">
                        <li><i className="fa fa-bars"></i><a href="#">Subscription</a></li>
                        <li><i className="fa fa-bar-chart"></i><a href="#">Auto Renewal</a> </li>
                        <li><i className="fa fa-support"></i><a href="#">Help Desk</a> </li>
                        <li><i className="fa fa-heart"></i><a href="#">Donations</a> </li>
                      </ul>

                      <div className="sidebar-widget">
                        <h4>Goal</h4>
                        <canvas width="150" height="80" id="chart_gauge_02" className="" style="width: 160px; height: 100px;"></canvas>
                        <div className="goal-wrapper">
                          <span className="gauge-value pull-left">$</span>
                          <span id="gauge-text2" className="gauge-value pull-left">3,200</span>
                          <span id="goal-text2" className="goal-value pull-right">$5,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Dashboard de Rendimiento</h2>

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
