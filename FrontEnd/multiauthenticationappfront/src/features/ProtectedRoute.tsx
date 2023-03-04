import React from "react";
import { Navigate } from "react-router-dom";
//import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks/hooks";
type Props = {
  children: JSX.Element;
};
export const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAppSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
