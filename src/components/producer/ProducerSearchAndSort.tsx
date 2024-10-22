import React, { ChangeEvent } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface ProducerSearchAndSortProps {
  searchTerm: string;
  sortKey: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (e: SelectChangeEvent) => void;
  onSearchClick: () => void;
}

const ProducerSearchAndSort: React.FC<ProducerSearchAndSortProps> = ({
  searchTerm,
  sortKey,
  onSearchChange,
  onSortChange,
  onSearchClick,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={8}>
        <TextField
          label="名前または地域で検索"
          value={searchTerm}
          onChange={onSearchChange}
          fullWidth
          sx={{ borderRadius: 1.5 }}
        />
      </Grid>
      <Grid item xs={6} sm={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onSearchClick}
          sx={{ height: "100%", minWidth: "100px", borderRadius: 10 }}
        >
          検索
        </Button>
      </Grid>
      <Grid item xs={6} sm={2}>
        <FormControl fullWidth>
          <InputLabel>並び替え</InputLabel>
          <Select value={sortKey} onChange={onSortChange}>
            <MenuItem value="name">名前</MenuItem>
            <MenuItem value="region">地域</MenuItem>
            <MenuItem value="sales">売上</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ProducerSearchAndSort;
