import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthRoute = ({ children }) => {
    const user = true;
    if (!user) {
        toast.error("You must login first")
        return <Navigate to="/login" />;
    }
    return children;
};

export default AuthRoute;