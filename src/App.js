import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Example from "./components/header/Headers";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";
import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {
  return (
   <BrowserRouter>
   <Example/>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/edit/:id" element={<Edit/>}/>
   <Route path="/profile/:id" element={<Profile/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
