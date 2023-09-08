/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your city by clicking on the city of the map" />
    );
  const countries = cities.reduce((arr, city) => {
    const country = arr.map((city) => city.country);
    if (country.includes(city.country)) {
      return arr;
    } else {
      return [...arr, city];
    }
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
