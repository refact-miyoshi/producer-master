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

const AnnouncementCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState({
    title: "",
    detail: "", // 詳細を追加
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .post("http://localhost:3001/api/announcements", announcement)
      .then(() => {
        navigate("/"); // ホームページにリダイレクト
      })
      .catch((error) => console.error("Error creating announcement", error));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            新規お知らせ登録
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            name="title"
            label="タイトル"
            fullWidth
            value={announcement.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="detail"
            label="詳細"
            fullWidth
            multiline
            rows={4}
            value={announcement.detail}
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

export default AnnouncementCreatePage;
