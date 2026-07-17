import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });


  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };


  const handleRegister = async(e)=>{
    e.preventDefault();

    try{

      const res = await API.post(
        "/auth/register",
        form
      );

      alert(res.data.message);

      navigate("/");

    }
    catch(err){

      alert(
        err.response?.data?.message 
        || "Register Failed"
      );

    }

  };


  return(

    <div
    style={{
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      background:"#f2f2f2"
    }}
    >

      <form
      onSubmit={handleRegister}
      style={{
        width:"400px",
        padding:"30px",
        background:"white",
        borderRadius:"10px",
        boxShadow:"0 0 10px gray"
      }}
      >

        <h2 style={{textAlign:"center"}}>
          Register
        </h2>


        <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"15px"
        }}
        />


        <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"15px"
        }}
        />


        <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"15px"
        }}
        />


        <button
        style={{
          width:"100%",
          padding:"12px",
          marginTop:"20px",
          background:"#007bff",
          color:"white",
          border:"none"
        }}
        >
          Register
        </button>


        <p style={{textAlign:"center"}}>
          Already have account?
          <Link to="/">
            Login
          </Link>
        </p>

      </form>


    </div>

  );
}


export default Register;