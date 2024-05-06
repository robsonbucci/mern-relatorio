import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Publisher from "./pages/Publisher";
import Finished from "./pages/publisher/Finished";
import List from "./pages/publisher/List";
import CreateReport from "./pages/report/CreateReport";
import ReportList from "./pages/report/ReportList";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/report/create" element={<CreateReport />} />
        <Route path="/report/list" element={<ReportList />} />
        <Route path="/publisher/create" element={<Publisher />} />
        <Route path="/finished" element={<Finished />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/publishers" element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
