import { Product } from "../../types/dataDisplay.types";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Refreshbutton from "../refreshButton/Refreshbutton";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import {
  containerStyle,
  titleStyle,
  gridContainerStyle,
  cardStyle,
  mediaStyle,
  refreshBtnWrapperStyle,
} from "../../styles/dataDisplayStyles/DataDisplay.styles";

function Datadisplay() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const dataFetch = useCallback(async () => {
    try {
      setLoading(true);
      const ecommerceData = await axios.get<Product[]>(
        "https://fakestoreapi.com/products/"
      );
      setProducts(ecommerceData.data);
  setSelectedProducts(ecommerceData.data);  // Initially, show all products
      setLoading(false);
      console.log("Data refreshed:", ecommerceData.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }, []);

  
  // Filter products by category
  const mensFilter = () => {
    const filtered = products.filter((item) => item.category === "men's clothing");
    setSelectedProducts(filtered);  // Show only men's products
  };

  const womensFilter = () => {
    const filtered = products.filter((item) => item.category === "women's clothing");
    setSelectedProducts(filtered);  // Show only women's products
  };

  const resetFilter = () => {
    setSelectedProducts(products);  // Reset to show all products
  };

  useEffect(() => {
    dataFetch();
  }, [dataFetch]);

  if (error) return <div>Error loading...</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Container sx={containerStyle}>
      <Typography variant="h4" sx={titleStyle} gutterBottom>
        Datadisplay
      </Typography>

      

      <Grid container spacing={4} sx={gridContainerStyle}>
        {selectedProducts.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={cardStyle}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
                sx={mediaStyle}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  ${item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {item.rating.rate} ({item.rating.count} reviews)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={refreshBtnWrapperStyle}>
        <button onClick={mensFilter}>Mens</button>
        <button onClick={womensFilter}>Womens</button>
        <button onClick={resetFilter}>Reset</button>
        <Refreshbutton refresh={dataFetch} />
      </div>
    </Container>
  );
}

export default Datadisplay;
