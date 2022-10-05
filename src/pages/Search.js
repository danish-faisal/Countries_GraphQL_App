import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";

const SEARCH_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      capital
      code
      currency
    }
  }
`;

function Search() {
  const [countryCode, setCountryCode] = useState("");
  const [searchCountry, { loading, error, data }] =
    useLazyQuery(SEARCH_COUNTRY);

  const enterSearch = () => {
    if (countryCode === "") {
      return alert("Please Enter a Country Code");
    }

    searchCountry({ variables: { code: countryCode.toUpperCase() } });
    setCountryCode("");
  };

  return (
    <div className="search">
      <div className="input">
        <Link to="/">List of Countries</Link>
        <input
          type="text"
          placeholder="Enter Country Code (ex: AU)"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <button onClick={enterSearch}>Search</button>
      </div>
      <div className="searchCountry">
        {data && data.country && (
          <div className="countryDisplay">
            <h1>{data.country.name}</h1>
            <h1>Capital: {data.country.capital} </h1>
            <h1> Currency: {data.country.currency}</h1>
            <h1> Country Code: {data.country.code}</h1>
          </div>
        )}
        {data && data.country === null && <h1>Invalid Code</h1>}
      </div>
    </div>
  );
}

export default Search;
