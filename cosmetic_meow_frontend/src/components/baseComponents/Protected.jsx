import { Navigate } from "react-router-dom";
import { getUser } from "./localStorage";

export default function Protected({ children }) {
  const user = getUser();
  if (user) return children;
  return <Navigate to="/" />;
}
