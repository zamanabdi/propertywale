import React, { useState } from "react";
import keyImage from "../assets/key.jpeg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {getAuth,createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });

  const {name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password);

      updateProfile(auth.currentUser,{
        displayName:name
      })

      const user = userCredentials.user;
      const formDataCopy = {...formData}
      delete formData.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db,"users",user.uid),formDataCopy);
      // toast.success("you are successfully registered");
      // navigate("/");
    } catch (error) {
      toast.error("something went wrong with the registration")
      
    }
  }

  return (
    <section className="text-3xl text-center mt-6">
      <h1 className="font-bold text-gray-500">Sign Up</h1>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={keyImage} alt="keyImage" className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit = {onSubmit}>
            <input
              type={"text"}
              placeholder={"Full Name"}
              className="mb-6 w-full text-[15px] font-normal px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type={"email"}
              placeholder={"Email address"}
              className="mb-6 w-full text-[15px] font-normal px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="relative mb-6">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder={"password"}
                className="w-full text-[15px] font-normal px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                id="password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="flex flex-row justify-between items-center text-[14px] whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                have an account?&nbsp;
                <Link
                  className="hover:underline text-orange-600 transition duration-200 ease-in-out hover:text-red-700"
                  to={"/sign-in"}
                >
                  Sign in
                </Link>
              </p>
              <p>
                <Link
                  to={"/forgot-password"}
                  className="hover:underline text-blue-600 transition duration-200 ease-in-out hover:text-red-700"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign up
            </button>

            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center text-[14px] text-semibold mx-4">or</p>
            </div>
            <OAuth/>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
