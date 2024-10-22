import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

const ProducerCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [producer, setProducer] = useState({
    name: "",
    email: "",
    productType: "",
    region: "",
    sales: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducer({ ...producer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .post("http://localhost:3001/api/producers", producer)
      .then(() => navigate("/producer-master"))
      .catch((error) => console.error("Error creating producer", error));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            生産者新規登録
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            name="name"
            label="名前"
            fullWidth
            value={producer.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="email"
            label="メール"
            fullWidth
            value={producer.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="productType"
            label="製品タイプ"
            fullWidth
            value={producer.productType}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="region"
            label="地域"
            fullWidth
            value={producer.region}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="sales"
            label="売上"
            fullWidth
            type="number"
            value={producer.sales}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSave}>
            保存
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProducerCreatePage;
