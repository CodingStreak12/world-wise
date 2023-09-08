/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";

const CitiesContext = createContext();

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function getCity(id) {
    setIsLoading(true);
    const resp = await fetch(`${url}/cities/${id}`);
    const data = await resp.json();
    setCurrentCity(data);
    setIsLoading(false);
  }

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
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  return useContext(CitiesContext);
}
