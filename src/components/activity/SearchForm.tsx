import React, { useState } from "react";
import { Box, TextField, Grid, Button } from "@mui/material";

// フィルタリング用のプロパティインターフェース
interface SearchFormProps {
  onFilter: (filters: { date: string; name: string; client: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onFilter }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");

  const handleSearch = () => {
    onFilter({ date, name, client });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="名前で検索"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="営業先で検索"
            fullWidth
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            label="日付で検索"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "right", mt: 2 }}>
        <Button variant="contained" onClick={handleSearch}>
          検索
        </Button>
      </Box>
    </Box>
  );
};

export default SearchForm;
