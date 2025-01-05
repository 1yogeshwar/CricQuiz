import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./componants/Navbar";
import Quiz from "./pages/Quiz/Quiz";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import QuizPage from "./pages/Quiz/QuizPage"; // Adjust the path if necessary


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main app routes with Navbar */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Standalone route for QuizPage */}
        <Route path="/quiz/:category" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
