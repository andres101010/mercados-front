import UseLogin from "../hooks/UseLogin";
import { login } from "../services/login";
import { useNavigate } from 'react-router-dom';
import Spinner from "../component/spinner/Spinner";
import Swal from 'sweetalert2';
const Login = () => {
  const navigate = useNavigate();
  const { setEmail, setPassword, email, password, loading, setLoading, setUser} = UseLogin();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const resp = await login({ email, password });
  
      setUser(resp.user);
      localStorage.setItem('user', JSON.stringify(resp.user));
      navigate('/inicio'); // Redirige solo si `login` fue exitoso
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("error: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
        confirmButtonText: 'Aceptar'
    });
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <div>
    <a className="hiddenanchor" id="signup"></a>
    <a className="hiddenanchor" id="signin"></a>

    <div className="login_wrapper">
      <div className="animate form login_form">
        <section className="login_content">
         
          <form onSubmit={handleSubmit}>
            <h1>SDGM</h1>
            {
              loading ? 
                (<Spinner />)
                :
                (
                  <><div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    </div><div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required />
                      </div><div>
                        <button type="submit" className="btn btn-primary btn-block btn-flat">
                          Ingresar
                        </button>
                      </div></>
                )
            }
           

            <div className="clearfix"></div>

            <div className="separator">
              <div className="clearfix"></div>
              <br />
              <div>
                <h1>
                  <i className="fa fa-cog"></i>
                  <hr />
                  INFO TEC
                </h1>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
  )
}

export default Login