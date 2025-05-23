import { Route ,Routes } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import Connexion from "./Connexion";
import HomePage from "./HomePage";
import MotDePasseOublié from "./MotDePasseOublié"
import HomeClient from "./ClientPage/HomeClient";
import ProfilePage from "./ClientPage/ProfilePage";
import TechniciansList from "./ClientPage/TechniciansList";
import LoginModal from "./LoginModal";
import RequestHistory from "./ClientPage/RequestHistory";
import AllReviewsPage from "./ClientPage/AllReviewsPage";
import PaymentMethodsPage from "./ClientPage/PaymentMethodsPage";
import HelpSupportPage from "./ClientPage/HelpSupportPage";
import ChatInterface from "./ClientPage/ChatInterface";
import Ofreures from "./ClientPage/Ofreures";
import DemandTypeSelection from "./ClientPage/DemandTypeSelection";
import DemandPublique from "./ClientPage/DemandPublique";
import TechnicienHome from "./Technicien/TechnicienHome";

import PageSupport from "./Technicien/PageSupport";
import PageParametres from "./Technicien/PageParametres";
import DemandesPrivees from "./Technicien/DemandesPrivees";
import AdminPage from "./Admin/AdminPage";
import ConfirmDialog from "./Admin/ConfirmDialog";
import Test from "./test";
import EmailVerificationPage from "./EmailVerificationPage";

function App(){

  return (
      <Routes>
      <Route path="/RegistrationPage" element={<RegistrationPage />} />
      <Route path="/Connexion"element={<Connexion />} />
      <Route path="/HomePage"element={<HomePage/>}/>
      <Route path="/MotDePasseOublié"element={<MotDePasseOublié />}/>
      
      <Route path="/HomeClient" element={<HomeClient />} /> 
      <Route path="/ProfilePage" element={<ProfilePage/>}/>
<Route path="/TechniciansList" element={<TechniciansList/>}/>
<Route path="/LoginModal" element={<LoginModal/>}/>
<Route path="/RequestHistory" element={<RequestHistory/>}/>
<Route path="/AllReviewsPage" element={<AllReviewsPage/>}/>
<Route path="/PaymentMethodsPage" element={<PaymentMethodsPage/>}/>
<Route path="/HelpSupportPage" element={<HelpSupportPage/>}/>
<Route path="/ChatInterface" element={<ChatInterface/>}/>
<Route path="/Ofreures" element={<Ofreures/>}/>
<Route path="/DemandTypeSelection" element={<DemandTypeSelection/>}/>
<Route path="/DemandPublique" element={<DemandPublique/>}/>
<Route path="/TechnicienHome" element={<TechnicienHome/>}/>

<Route path="/PageSupport" element={<PageSupport/>}/>
<Route path="/PageParametres" element={<PageParametres/>}/>
<Route path="/DemandesPrivees" element={<DemandesPrivees/>}/>
<Route path="/AdminPage" element={<AdminPage/>}/>
<Route path="/ConfirmDialog" element={<ConfirmDialog/>}/>
<Route path="/Test" element={<Test/>}/>
<Route path="/EmailVerificationPage" element={<EmailVerificationPage/>}/>

      </Routes>
  )
};
export default App;


