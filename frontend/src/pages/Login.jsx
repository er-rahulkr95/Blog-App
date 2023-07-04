import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Forms from "../components/Forms/Forms";
import { userLogIn } from "../features/userAuthentication/userAuthAction";
import formText from "../data/formText.json";

const Login = () => {
  const [inputDetails, setInputDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.app);

  const validateInput = (data) => {
    if (data.email === "") {
      toast.error("Email is a required field");
      return false;
    }
    if (data.password === "") {
      toast.error("Password is a required field");
      return false;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateInput(inputDetails)) {
      const result = await dispatch(userLogIn(inputDetails));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <NavBar hasHiddenAuthButtons />
      <Forms
        inputDetails={inputDetails}
        setInputDetails={setInputDetails}
        loading={loading}
        formText={formText.login}
        buttonAction={() => handleSubmit()}
        isLogin
      />
      <Footer />
    </div>
  );
};

export default Login;
