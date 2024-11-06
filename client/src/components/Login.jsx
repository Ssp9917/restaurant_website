import { useContext, useState } from "react";
// import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
// import { useDispatch, useSelector } from "react-redux";
// import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();

  // const userData = useSelector((state) => state);
  //   console.log(userData.user);

  // const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const {login} = useContext(AuthContext)

  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(data);
     
      console.log(response)
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error(error);
      alert('Error login up');
    }
  };

  return (
    <div className="p-3 absolute top-0 left-0 w-full h-full bg-gray-400 flex justify-center md:p-4">
      <div className="w-full relative max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-full text-center text-xl">
          Login
          <IoClose className="absolute right-3 top-3 cursor-pointer" onClick={() => navigate('/')} />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />
          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sing up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
// 3.2.00