import { Product } from "../../types/dataDisplay.types";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Refreshbutton from "../refreshButton/Refreshbutton";

function Datadisplay() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
//   const [filterCategory, setFilterCategory]=useState<Product[]>([])
  

  const dataFetch = useCallback(async () => {
    try {
      setLoading(true);
      const ecommerceData = await axios.get<Product[]>(
        "https://fakestoreapi.com/products/"
      );
      setProducts(ecommerceData.data);
      setLoading(false);
      console.log("Data refreshed:", ecommerceData.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }, []);

  const productFilter = ()=>{

  }
  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  if (error) {
    return <div>Error loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Datadisplay
      {products.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} width="100" />
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <p>{item.category}</p>
          <p>
            ⭐ {item.rating.rate} ({item.rating.count} reviews)
          </p>
        </div>
      ))}
      <Refreshbutton refresh={dataFetch}/>
    </div>
  );
}

export default Datadisplay;
