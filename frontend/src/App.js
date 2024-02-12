import React, { useState } from "react";
import FeedbackForm from "./feedback/FeedbackForm";
import Navbar from "./Navbar/Navbar";
import HelpUs from "./help-us-find-page/HelpUs";
import AboutUs from "./About/AboutUs";
import Dashboard from "./Admin/Dashboard";
import Home from "./home-page/Home";
import GoToTop from "./go-to-top/GoToTop";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LostUpload from './lost-details-upload-page/LostUpload';
import FoundUpload from './found-item-details-page/FoundUpload';
import ItemDetails from "./item-gallery-details/ItemDetails";
import ItemGallery from "./items-gallery/ItemGallery";
import CategorySelection from "./items-gallery/CategorySelection";
import Faq from "./faq/Faq";
import UsersList from "./Admin/UsersList";
import FoundTable from "./Admin/FoundTable";
import LostTable from "./Admin/LostTable";
import CollectedTable from "./Admin/CollectedTable";
import Footer from "../src/Footer/Footer";

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = (theme) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(theme);
  };

  const [showConfirmPage, setShowConfirmPage] = useState(false);

  const showConfirm = (value) => {
    setShowConfirmPage(value);
  };

  return (
      <Router>
          <>
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <Routes>
              {/* Routes updated to remove ProtectedRoute and Login functionality */}
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/about" element={<AboutUs theme={theme} />} />
              <Route path="/faq" element={<Faq theme={theme} />} />
              <Route path="/dashboard" element={<Dashboard theme={theme} />} />
              <Route path="/usertable" element={<UsersList theme={theme} />} />
              <Route path="/foundtable" element={<FoundTable theme={theme} />} />
              <Route path="/losttable" element={<LostTable theme={theme} />} />
              <Route path="/collectedtable" element={<CollectedTable theme={theme} />} />
              <Route path="/lost" element={<LostUpload theme={theme} />} />
              <Route path="/found" element={<FoundUpload theme={theme} />} />
              <Route path="/feedback" element={<FeedbackForm theme={theme} />} />
              <Route path="/items" element={<CategorySelection theme={theme} />} />
              <Route path="/items/:category" element={<ItemGallery func={showConfirm} theme={theme} />} />
              <Route path="/details/:id" element={<ItemDetails func={showConfirm} theme={theme} />} />
              <Route path="/helpusfind" element={<HelpUs theme={theme} />} />
            </Routes>
            <GoToTop />
            <Footer />
          </>
      </Router>
  );
};

export default App;
