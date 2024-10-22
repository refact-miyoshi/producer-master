import React, { useState, useEffect } from "react";
import axios from "axios";

interface Producer {
  id: number;
  name: string;
  sales: number;
  category: string;
}

const ProducerChart: React.FC = () => {
  const [producers, setProducers] = useState<Producer[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/producer-charts")
      .then((response) => {
        setProducers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching producer charts", error);
      });
  }, []);

  return (
    <div>
      <h1>Producer Chart</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Sales</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {producers.map((producer) => (
            <tr key={producer.id}>
              <td>{producer.id}</td>
              <td>{producer.name}</td>
              <td>{producer.sales}</td>
              <td>{producer.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProducerChart;
