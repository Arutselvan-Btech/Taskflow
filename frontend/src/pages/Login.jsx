import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/login",
        form
      );


      localStorage.setItem(
        "token",
        res.data.token
      );


      alert(res.data.message);


      navigate("/dashboard");


    } catch (err) {

      alert(
        err.response?.data?.message 
        || "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="auth-container">


      <form
      className="auth-box"
      onSubmit={handleLogin}
     >

<h1 className="app-title">
   📋 TaskFlow
</h1>

<p className="app-desc">
  Organize your tasks, track progress 
  and improve your productivity
</p>


<div className="features">

  <p>✅ Create & Manage Tasks</p>

   <p>📊 Track Daily Progress</p>

   <p>🚀 Stay Productive</p>

</div>

 <h2>Login</h2>

   <input

          type="email"

          name="email"

          placeholder="Email"

          value={form.email}

          onChange={handleChange}

          required

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          value={form.password}

          onChange={handleChange}

          required

        />



        <button>

          {
            loading
            ? "Logging in..."
            : "Login"
          }

        </button>



        <p>

          Don't have an account?

          <Link to="/register">
             Register
          </Link>

        </p>


      </form>


    </div>

  );

}


export default Login;