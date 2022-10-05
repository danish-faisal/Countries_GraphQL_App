import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const LIST_OF_COUNTRIES = gql`
  {
    countries {
      name
      capital
      code
      currency
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(LIST_OF_COUNTRIES);

  return (
    <div className="home">
      <div className="title">
        <h1>List of Countries</h1>
        <Link to="/search">Search a Country</Link>
      </div>
      <div className="listOfCountries">
        {loading && <h3>Loading...</h3>}
        {error && <h3>error.message</h3>}
        {data &&
          data.countries.map((country) => (
            <div key={country.code} className="country">
              <h2>
                {country.name}
                <label>{country.code}</label>
              </h2>
              <h4>
                {country.capital} | {country.currency}
              </h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
