import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Common/Navbar";
import BannerPage from "./Componenet/BannerPage";
import UserCount from "./Componenet/UserCount";
import Features from "./Componenet/Features";
import Health from "./Componenet/Health";
import Doctor from "./Componenet/Doctor";
import Feedback from "./Componenet/Feedback";
import Footer from "./Common/Footer/Footer";
import { Customers } from "./Componenet/Customers";
import SignIn from "./Auth/SignUp/SignIn";
import BeforeHeader from "./Common/Header/BeforeHeader";
import LoginPage from "./Auth/Login/LoginPage";
import AfterLoginHeader from "./Common/Header/AfterLoginHeader";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./Componenet/Dashboard/Dashboard";
import Payment from "./Componenet/Payment/Error";
import Forgot from "./Auth/Forgot/Forgot";
import Verify from "./Auth/Verify/Verify";
import Changepassword from "./Auth/ChangePassword/Changepassword";
import AdminDashboard from "./Layout/AdminDashboard/AdminDashboard";
import DashboardAdmin from "./Componenet/AdminDash/DashboardAdmin";
import UserList from "./Componenet/UserList/Deposite";
import AddUser from "./Componenet/UserList/AddUser";
import EditUser from "./Componenet/UserList/EditUser";
import Account from "./Componenet/PolicyList/Account";
import Transfer from "./Componenet/ClaimList/Transfer";
import HospitalDashboard from "./Layout/HospitalLayout/HospitalDashboard";
import HospitalDetials from "./Componenet/HospitalDashboard/HospitalDetials";
import HospitalClaimList from "./Componenet/HospitalClaim/HospitalClaimList";
import UpdateUser from "./Componenet/UpdateUser/UpdateUser";
import AdminPassword from "./Componenet/AdminPassword/AdminPassword";
import AdminUpdate from "./Componenet/AdminUpdate.jsx/AdminUpdate";
import AuthProvider, { AuthContext } from "./Auth/context/Auth";
import { Toaster } from "react-hot-toast";
import AuthGuard from "./Auth/AuthGuard";
import Mission from "./Componenet/OurMission/Mission";
import OurValue from "./Componenet/OurValues/OurValue";
import Leader from "./Componenet/LeaderShip/Leader";
import Cards from "./Common/DashboardCards/Cards";
import Personal from "./Common/PersonalInformation/Personal";
import Plans from "./Componenet/Payment/Plans";
import EditPlans from "./Componenet/UserList/EditPlans";
import ViewClaim from "./Componenet/ClaimList/ViewClaim";
import NoDataFound from "./Common/NoDataFound/NoDataFound";
import ViewPolicy from "./Componenet/PolicyList/ViewPolicy";
import HospitalPolicies from "./Componenet/PolicyList/HospitalPolicies";
import CreateClaim from "./Componenet/PolicyList/CreateClaim";
import ClaimCard from "./Pages/ClaimCard";
import Repoting from "./Componenet/Report/Repoting";
import UserPlans from "./Componenet/Payment/UserPlans";
import TermTitle from "./Componenet/Termandcondition/TermTitle";
import Term from "./Componenet/Termandcondition/Term";
import PlansCard from "./Common/DashboardCards/PlansCard";
import PoliciesPlan from "./Common/DashboardCards/PoliciesPlan";
import ReportCard from "./Common/DashboardCards/ReportCard";
import Teams from "./Componenet/LeaderShip/Teams";

import AdminTerm from "./Componenet/AdminTerm/AdminTerm";
import AdminAbout from "./Componenet/AdminAbout/AdminAbout";
import EditAbout from "./Componenet/AdminAbout/EditAbout";
import Enroll from "./Componenet/Enrollmant/Enroll";
// import Enroll2 from "./Componenet/Enrollmant/Enroll2";
import UhuruFAQ from "./Componenet/LeaderShip/UhuruFAQ";
import NewCard from "./Componenet/NewCard/NewCard";
import Faq from "./Componenet/FaqSwction/Faq";
import Addfaq from "./Componenet/FaqSwction/Addfaq";
// import Enroll2 from "./Componenet/Enrollmant/Enroll2";
import NewEnroll from "./Componenet/Enrollmant/NewEnroll";
import EditTerm from "./Componenet/AdminTerm/EditTerm";
import EditAboutData from "./Componenet/AdminTerm/EditAboutData";
import EditFAQS from "./Componenet/AdminTerm/EditFAQS";
import ImageEnroll from "./Componenet/Enrollmant/ImageEnroll";
import PaymentConfirmationPage from "./Componenet/Enrollmant/PaymentConfirmationPage";
import FloatingHeader from "./Common/Header/FloatingHeader";
import NewServices from "./Componenet/NewServices";
import NewFuture from "./Componenet/NewFuture";
import BeyoundInsurance from "./Componenet/BeyoundInsurance/BeyoundInsurance";
import FeedbackSlider from "./Componenet/FeedbackSlider";
import ContactUs from "./Common/Contact/ContactUs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Privacy from "./Componenet/Privacy&Policy/Privacy";
import PolicyTitle from "./Componenet/Privacy&Policy/PolicyTitle";
import SecondBanner from "./Componenet/UserList/SecondBanner";
import Zikzak from "./Componenet/ZikZakCard/Zikzak";
import AddPaln from "./Componenet/Payment/AddPaln";
import OurAboutUs from "./Componenet/OurValues/OurAboutUs";
import MissionTitle from "./Componenet/OurMission/MissionTitle";
import NewPolicy from "./Componenet/PolicyList/NewPolicy";
import NewViewPolicy from "./Componenet/PolicyList/NewViewPolicy";
import PaymentSuccess from "./Common/PersonalInformation/PaymentSuccess";
import Medicines from "./Componenet/Report/Medicines";
import ViewUserList from "./Componenet/UserList/ViewUserList";
import Diagonisis from "./Componenet/Report/Diagonisis";
import ComingSoon from "./Pages/ComingSoon";
import AdminUserlist from "./Componenet/UserList/AdminUserlist";
import BookNow from "./Componenet/Book/BookNow";
import Deposite from "./Componenet/UserList/Deposite";
import Whatsapp from "./Componenet/Whatsapp/Whatsapp";
import WithDraw from "./Componenet/UserList/Withdraw";
import Error from "./Componenet/Payment/Error";
import Subadmin from "./Componenet/SubAdmin/Subadmin";
import SubDetails from "./Componenet/SubAdmin/SubDetails";
// Home Page Component
const Home = () => (
  <>
    <BeforeHeader />

    <BannerPage />
    <Features />
    <NewServices />

    <NewFuture />
    <BeyoundInsurance />
    <Health />
    <BookNow />
    <Feedback />
    <Doctor />
    <SecondBanner />
    <FeedbackSlider />
    <Zikzak />
    <UhuruFAQ />
    <Footer />
  </>
);

const SignInPage = () => (
  <>
    <BeforeHeader />
    <SignIn />
    <Footer />
  </>
);
const LoginInPageSection = () => (
  <>
    {/* <BeforeHeader /> */}
    <LoginPage />
    {/* <Footer /> */}
  </>
);
const OurMissionSection = () => (
  <>
    <BeforeHeader />
    <Mission />
    <MissionTitle />
    <Footer />
  </>
);
const OurValueSection = () => (
  <>
    <BeforeHeader />
    <OurValue />
    <Footer />
  </>
);
const OurValueSectionAbout = () => (
  <>
    <BeforeHeader />
    <OurAboutUs />
    <Footer />
  </>
);
const OurLeaderShipSection = () => (
  <>
    <BeforeHeader />
    <Leader />
    <Footer />
  </>
);
const OurTeams = () => (
  <>
    <BeforeHeader />
    <Teams />
    <Footer />
  </>
);
const TermCondition = () => (
  <>
    <BeforeHeader />


    <PolicyTitle />
    <Privacy />
    <Footer />
  </>
);
const TermConditionss = () => (
  <>
    <BeforeHeader />

    <UhuruFAQ />
    <Footer />
  </>
);
const EnrollMentSection = () => (
  <>
    <BeforeHeader />
    <Enroll />
    <Footer />
  </>
);
const EnrollMentSectionLogin = () => (
  <>
    <BeforeHeader />
    <NewEnroll />
    <Footer />
  </>
);
const ImageEnrollMentSectionLogin = () => (
  <>
    <BeforeHeader />
    <ImageEnroll />
    <Footer />
  </>
);
const PaymentEnrollMentSectionLogin = () => (
  <>
    <BeforeHeader />
    <PaymentConfirmationPage />
    <Footer />
  </>
);
const ContactSection = () => (
  <>
    <BeforeHeader />
    <ContactUs />
    <Feedback />
    <Footer />
  </>
);
// const BannerSection = () => (
//   <>
//     <BeforeHeader />
//     <SecondBanner />
//     <Footer />
//   </>
// );
const PolicySection = () => (
  <>
    <BeforeHeader />
   
    <TermTitle />
    <Term />
    <Footer />
  </>
);
const HealthSection = () => (
  <>
    <BeforeHeader />
    <Health />
    <Feedback />
    <Footer />
  </>
);
// const EnrollMentSectionLogin = () => (
//   <>
//     <BeforeHeader />
//     <Enroll2 />
//     <Footer />
//   </>
// );

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
            {/* <Route path="/" element={<ComingSoon />} /> */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/forgot" element={<Forgot />} />
            {/* <Route path="/login" element={<LoginInPageSection />} /> */}
            <Route path="/verify" element={<Verify />} />
            <Route path="/mission" element={<OurMissionSection />} />
            <Route path="/values" element={<OurValueSection />} />
            <Route path="/aboutUs" element={<OurValueSectionAbout />} />
            <Route path="/leader" element={<OurLeaderShipSection />} />
            <Route path="/teams" element={<OurTeams />} />
            <Route path="/story" element={<OurMissionSection />} />
            <Route path="/leaderShip" element={<OurValueSection />} />
            <Route path="/partnership" element={<OurLeaderShipSection />} />
            <Route path="/corporate" element={<OurTeams />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/policy" element={<TermCondition />} />
            <Route path="/faqs" element={<TermConditionss />} />
            <Route path="/enroll" element={<EnrollMentSection />} />
            <Route path="/enrollLogin" element={<EnrollMentSectionLogin />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/terms" element={<PolicySection />} />
            <Route path="/health" element={<HealthSection />} />
            <Route path="*" element={<NoDataFound />} />
            {/* <Route path="/banners" element={<BannerSection />} /> */}
            <Route
              path="/image-enroll"
              element={<ImageEnrollMentSectionLogin />}
            />
            <Route
              path="/payment-confirm"
              element={<PaymentEnrollMentSectionLogin />}
            />
            {/* <Route path="/enrollLogin" element={<EnrollMentSectionLogin />} /> */}
            {/* <Route path="/password" element={<Changepassword />} /> */}
            <Route
              path="/dashboard"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    {/* {userData?.role ==="admin"  && <Cards />} */}
                    {/* <Cards /> */}
                    <Personal />
                  
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/update"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <UpdateUser />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/password"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Changepassword />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/policy"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Health />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/payment"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Payment />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/plans"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    {/* <PlansCard /> */}
                    <Plans />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/user-plan"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <UserPlans />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/home"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    {               /* <DashboardAdmin /> */}
                    <Personal />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/deposit-list"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    <Deposite />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/user-list"
              element={
                // <AuthGuard>
                  <DashboardLayout>
               <AdminUserlist />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/sub-admin"
              element={
                // <AuthGuard>
                  <DashboardLayout>
               <Subadmin />
               {/* <SubDetails /> */}
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/whatsapp-user"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                   {/* <InsuranceUser /> */}
                   <Whatsapp />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/withdrawal-list"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                   <WithDraw />
                 
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/add-user"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    <AddUser />
                       {/* <Subadmin /> */}
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/edit-user"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    <EditUser />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/accounts"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <EditPlans />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/error-list"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    <AddPaln />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/passwords"
              element={
                <AuthGuard>
                  <AdminDashboard>
                    <AdminPassword />
                  </AdminDashboard>
                </AuthGuard>
              }
            />
            <Route
              path="/edits"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AdminUpdate />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/error-lists"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                <Error />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/report"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <ReportCard />
                    <Repoting />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/acounts-list"
              element={
                // <AuthGuard>
                  <DashboardLayout>
             
                    <Account />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/newPolicy"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    {/* {userData?.role==="admin" || userData?.role==="insurance"  && <PoliciesPlan />} */}
                    {/* <Cards /> */}
                    {/* <PoliciesPlan /> */}
                    <NewPolicy />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/about"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AdminTerm />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/aboutAdd"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <EditTerm />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/editabout"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <EditAboutData />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/editFaqs"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <EditFAQS />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/team"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <AdminAbout />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/faq"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Faq />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/addFaq"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Addfaq />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/teamAdd"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <EditAbout />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/policies"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <HospitalPolicies />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/create-claim"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <CreateClaim />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/transfer"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    {/* <Cards /> */}
                    {/* <ClaimCard /> */}
                    <Transfer />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/medicine"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    {/* <Cards /> */}
                    {/* <ClaimCard /> */}
                    <Medicines />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/diagnosis"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    {/* <Cards /> */}
                    {/* <ClaimCard /> */}
                <Diagonisis />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/viewClaim"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <ViewClaim />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/viewpolicy"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <ViewPolicy />
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
            <Route
              path="/newviewpolicy"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <NewViewPolicy />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/planlist"
              element={
                <AuthGuard>
                  <DashboardLayout>
                    <Health />
                  </DashboardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/hospital"
              element={
                <AuthGuard>
                  <AdminDashboard>
                    <HospitalDetials />
                  </AdminDashboard>
                </AuthGuard>
              }
            />
            <Route
              path="/hospitalClaim"
              element={
                // <AuthGuard>
                  <DashboardLayout>
                    <HospitalClaimList />
                  </DashboardLayout>
                // </AuthGuard>
              }
            />
            <Route
              path="/hospitalPolicy"
              element={
                <AuthGuard>
                  <AdminDashboard>
                    <Health />
                  </AdminDashboard>
                </AuthGuard>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
