import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Auth/Login/LoginPage";
import DashboardLayout from "./Layout/DashboardLayout";
import AddUser from "./Componenet/UserList/AddUser";
import EditUser from "./Componenet/UserList/EditUser";
import Account from "./Componenet/PolicyList/Account";
import AdminUpdate from "./Componenet/AdminUpdate.jsx/AdminUpdate";
import AuthProvider, { AuthContext } from "./Auth/context/Auth";
import { Toaster } from "react-hot-toast";
import AuthGuard from "./Auth/AuthGuard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdminUserList from "./Componenet/UserList/AdminUserlist"
import ViewUserList from "./Componenet/UserList/ViewUserList";
import Deposite from "./Componenet/UserList/Deposite";
import Whatsapp from "./Componenet/Whatsapp/Whatsapp";
import WithDraw from "./Componenet/UserList/Withdraw";
import Error from "./Componenet/Payment/Error";
import Personal from "../src/Common/PersonalInformation/Personal"
import Transfer from "./Componenet/ClaimList/Transfer"


// Home Page Component

const LoginInPageSection = () => (
  <>
    <LoginPage />
 
  </>
);


const App = () => {
  const auth = React.useContext(AuthContext);
  const userData = auth?.userData;
  console.log("ADfsadfsdafs", userData);
  return (
    <div>
      <Toaster
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // theme={theme.palette.type}
      />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginInPageSection/>} />
            <Route
              path="/dashboard"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    <Personal />
                  
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/deposit-list"
              element={
                <AuthGuard>
                  <DashboardLayout>
                   <Deposite />
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
            <Route
              path="/user-list"
              element={
                <AuthGuard>
                  <DashboardLayout>
           <AdminUserList />
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
       
            <Route
              path="/whatsapp-user"
              element={
                <AuthGuard>
                  <DashboardLayout>
             <Whatsapp />
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
            <Route
              path="/transfer"
              element={
                <AuthGuard>
                  <DashboardLayout>
             <Transfer />
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
            <Route
              path="/withdrawal-list"
              element={
                <AuthGuard>
                  <DashboardLayout>
                   <WithDraw />
                 
                  </DashboardLayout>
                   </AuthGuard>
              }
            />
            <Route
              path="/add-user"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AddUser />
                       {/* <Subadmin /> */}
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
            <Route
              path="/edit-user"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <EditUser />
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
   
    
    
      
            <Route
              path="/error-lists"
              element={
                <AuthGuard>
                  <DashboardLayout>
                <Error />
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
 
            <Route
              path="/acounts-list"
              element={
                <AuthGuard>
                  <DashboardLayout>
             
                    <Account />
                  </DashboardLayout>
                 </AuthGuard>
              }
            />
     
    
  
          
            <Route
              path="/view-user"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                  <ViewUserList />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
