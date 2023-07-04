import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Forms from "../components/Forms/Forms";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import formText from "../data/formText.json";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../features/userAuthentication/userAuthAction";

const Register = () => {
  const [inputDetails, setInputDetails] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.app);

  const validateInput = (data) => {
    if (data.fullName.trim() === "") {
      toast.error("Fullname is a required field");
      return false;
    }
    if (data.userName.trim() === "") {
      toast.error("Username is a required field");
      return false;
    }
    if (data.userName.length < 6) {
      toast.error("Username must be at least 6 characters");
      return false;
    }
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
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateInput(inputDetails)) {
      const result = await dispatch(userSignUp(inputDetails));
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login");
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
        formText={formText.register}
        buttonAction={() => handleSubmit()}
      />
      <Footer />
    </div>
  );
};

export default Register;
