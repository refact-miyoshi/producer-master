import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

interface Producer {
  id: number;
  name: string;
  email: string;
  productType: string;
  region: string;
  sales: number;
}

const ProducerEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLパラメータからIDを取得
  const navigate = useNavigate();
  const [producer, setProducer] = useState<Producer | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/producers/${id}`)
        .then((response) => setProducer(response.data))
        .catch((error) =>
          console.error("Error fetching producer details", error)
        );
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducer({ ...producer, [e.target.name]: e.target.value } as Producer);
  };

  const handleSave = () => {
    if (producer) {
      axios
        .put(`http://localhost:3001/api/producers/${producer.id}`, producer)
        .then(() => navigate("/producer-master"))
        .catch((error) => console.error("Error updating producer", error));
    }
  };

  if (!producer) {
    return <Typography>生産者が見つかりません。</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            生産者編集
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

export default ProducerEditPage;
