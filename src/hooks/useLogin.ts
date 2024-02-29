import { useState } from "react";
import { useLoading } from "./useLoading";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();
  const [userModel, setUser] = useState({
    email: '',
    password: ''
  });

  const handleLogin = () => {
    setLoading(true);
    
    // setTimeout(() => {
    //   login(userModel)
    //   .then((response) => {
    //     navigate('/dashboard');
    //   }).catch((error) => {
    //     console.log(error);
    //   }).finally(() => {
    //     setLoading(false);
    //   });
    // }, 1000)
  }

  const handleEmailChange = (value: string) => setUser({
    ...userModel,
    email: value
  });

  const handlePasswordChange = (value: string) => setUser({
    ...userModel,
    password: value
  });

  return {
    loading,
    setLoading,
    handleLogin,
    handleEmailChange,
    handlePasswordChange
  }
}