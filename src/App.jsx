
import {  Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import AddProducts from "./pages/admin/AddProducts";
import AdminHome from "./pages/admin/AdminHome";
import EditProduct from "./pages/admin/EditProduct";
import MaintainCategories from "./pages/admin/MaintainCategories";
import MaintainProducts from "./pages/admin/MaintainProducts";
import MaintainShops from "./pages/admin/MaintainShops";
import Chart from "./pages/Chart";
import NavigationBar from "./pages/components/NavigationBar";
import HomePage from "./pages/HomePage";
import Shops from "./pages/Shops";
import SingleProducts from "./pages/SingleProducts";
import I18nCompare from "./pages/superadmin/I18nCompare";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>

        <Route path=""                              element={<HomePage           />}/>
        <Route path="admin/AddProducts"             element={<AddProducts        />} />
        <Route path="admin/AdminHome"               element={<AdminHome          />} />
        <Route path="admin/EditProduct/:ProductID"  element={<EditProduct        />} />
        <Route path="admin/MaintainCategories"      element={<MaintainCategories />} />
        <Route path="admin/MaintainProducts"        element={<MaintainProducts   />} />
        <Route path="admin/MaintainShops"           element={< MaintainShops     />} />
        <Route path="AboutUs"                       element={<AboutUs            />} />
        <Route path="Chart"                         element={<Chart              />} />
        <Route path="Shops"                         element={<Shops              />} />
        <Route path="SingleProducts"                element={<SingleProducts     />} />
        <Route path="superadmin"                    element={<I18nCompare        />} />
        <Route path="*"                             element={<div>404</div>} />

      </Routes>
    </div>
  );
}

export default App;
