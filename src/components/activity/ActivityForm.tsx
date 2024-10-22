import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Activity インターフェースの定義
interface ActivityFormProps {
  onSubmit: (activity: {
    date: string;
    name: string;
    client: string;
    method: string;
    details: string;
  }) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [method, setMethod] = useState("");
  const [details, setDetails] = useState("");

  const activityMethods = ["架電", "訪問", "メール", "その他"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, name, client, method, details });
    setDate("");
    setName("");
    setClient("");
    setMethod("");
    setDetails("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="日時"
            type="datetime-local"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="名前"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="営業先"
            fullWidth
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>方法</InputLabel>
            <Select value={method} onChange={(e) => setMethod(e.target.value)}>
              {activityMethods.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TextField
        label="詳細"
        fullWidth
        multiline
        rows={10}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        sx={{ mt: 1 }}
      />
      <Box sx={{ textAlign: "right", mt: 2 }}>
        <Button variant="contained" type="submit">
          送信
        </Button>
      </Box>
    </Box>
  );
};

export default ActivityForm;
