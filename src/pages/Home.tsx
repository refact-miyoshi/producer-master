import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import AnnouncementList from "../components/Home/AnnouncementsList";
import ManualDownload from "../components/Home/ManualDownloadButton";

const Home: React.FC = () => {
  const [announcements, setAnnouncements] = useState<
    { id: number; title: string; date: string; detail: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/announcements")
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("お知らせデータの取得エラー", error);
      });
  }, []);

  return (
    <Box>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 500,
            color: "#333",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }} // フォントサイズをレスポンシブに
        ></Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 }, // スマホでは小さめの余白
          }}
        >
          {/* お知らせリストのボックスに枠線追加 */}
          <Box
            sx={{
              border: "1px solid #ccc", // 枠線
              borderRadius: 2, // 角の丸み
              p: { xs: 2, sm: 3 }, // 内側の余白
              bgcolor: "#fff", // 背景色を白に
            }}
          >
            <AnnouncementList announcements={announcements} />
          </Box>
          <ManualDownload />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
