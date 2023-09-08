import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import "./index.css";
import City from "./components/City";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CityContext";

export default function App() {
  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />}></Route>
            <Route path="/products" element={<Product />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/app" element={<AppLayout />}>
              <Route
                index
                element={<Navigate to="cities" replace="true" />}
              ></Route>
              <Route path="cities/:id" element={<City />} />
              <Route path="cities" element={<CityList />}></Route>
              <Route path="countries" element={<CountryList />}></Route>
              <Route path="form" element={<Form />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}
