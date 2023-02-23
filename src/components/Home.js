import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

// style
import "../style/home.css";

const Home = () => {
  // Init
  const [inclination, setInclination] = useState("");
  const [orientation, setOrientation] = useState("");
  const [result, setResult] = useState(null);

  // UseEffect
  useEffect(() => {
    const fetchData = async (i, o) => {
      try {
        let url =
          "https://site--prenoms-back--gw6mlgwnmzwz.code.run/cumkwatt/api";
        url += "?i=" + inclination;
        url += "&o=" + orientation;
        const response = await axios.get(url);
        setResult(response.data);
        return;
      } catch (error) {
        console.log(error.message);
        alert("une erreur s'est produite avec le serveur de calcul");
        return;
      }
    };
    setResult(null);
    if (
      ["10", "20", "30", "40", "50", "60", "70"].includes(inclination) &&
      ["WEST", "SUDWEST", "SUD", "SUDEST", "EST"].includes(orientation)
    ) {
      fetchData(inclination, orientation);
    }
  }, [inclination, orientation]);

  // Return
  return (
    <main>
      <h1>Calcul du rendement de production des PV</h1>

      <section className="inputs">
        <Form className="datas">
          <Form.Group className="mb-3">
            <Form.Label>Inclinaison des panneaux (degré)</Form.Label>
            <Form.Select
              onChange={(e) => {
                setInclination(e.target.value);
              }}
            >
              <option>Selectionnez une inclinaison</option>
              <option value="10">10°</option>
              <option value="20">20°</option>
              <option value="30">30°</option>
              <option value="40">40°</option>
              <option value="50">50°</option>
              <option value="60">60°</option>
              <option value="70">70°</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Orientation des panneaux</Form.Label>
            <Form.Select
              onChange={(e) => {
                setOrientation(e.target.value);
              }}
            >
              <option>Selectionnez une orientation</option>
              <option value="WEST">OUEST</option>
              <option value="SUDWEST">SUD-OUEST</option>
              <option value="SUD">SUD</option>
              <option value="SUDEST">SUD-EST</option>
              <option value="EST">EST</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </section>

      {result && (
        <section className="results">
          <p>Coefficient de rendement à appliquer</p>
          <p className="coef">{Number(result).toFixed(2)}</p>
        </section>
      )}
    </main>
  );
};
export default Home;
