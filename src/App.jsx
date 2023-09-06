import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useState, useEffect } from "react";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:8000";
  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      const resp = await fetch(`${url}/cities`);
      const data = await resp.json();
      setCities(data);
      setIsLoading(false);
    }
    fetchCities();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/app" element={<AppLayout />}>
            <Route
              index
              element={<CityList isLoading={isLoading} cities={cities} />}
            ></Route>
            <Route path="cities/:id" element={<City />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
