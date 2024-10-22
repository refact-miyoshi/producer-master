import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProducerSearchAndSort from "./ProducerSearchAndSort";
import ProducerTable from "./ProducerTable";
import ProducerCards from "./ProducerCards";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

export interface Producer {
  id: number;
  name: string;
  email: string;
  productType: string;
  region: string;
  sales: number;
}

const ProducerMaster: React.FC = () => {
  const navigate = useNavigate();
  const [producers, setProducers] = useState<Producer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof Producer>("name");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = () => {
    axios
      .get("http://localhost:3001/api/producers")
      .then((response) => {
        setProducers(response.data);
      })
      .catch((error) => {
        console.error("生産者データの取得エラー", error);
      });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    const newSortKey = e.target.value as keyof Producer;
    setSortKey(newSortKey);
    const sortedProducers = [...producers].sort((a, b) =>
      a[newSortKey] > b[newSortKey] ? 1 : -1
    );
    setProducers(sortedProducers);
  };

  const handleSearchClick = () => {
    axios
      .get(`http://localhost:3001/api/producers?search=${searchTerm}`)
      .then((response) => {
        setProducers(response.data);
      })
      .catch((error) => {
        console.error("生産者データの検索エラー", error);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          生産者管理ページ
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ borderRadius: 20, px: 3, py: 1.5 }}
          onClick={() => navigate("/producer-master/create")}
        >
          新規登録
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            mt: 2,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <ProducerSearchAndSort
            searchTerm={searchTerm}
            sortKey={sortKey}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onSearchClick={handleSearchClick}
          />

          {/* Table and Card View Switch Based on Screen Size */}
          {!isMobile ? (
            <ProducerTable producers={producers} setProducers={setProducers} />
          ) : (
            <ProducerCards producers={producers} />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProducerMaster;
