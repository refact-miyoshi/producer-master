import React from "react";
import { Paper, Typography, Button } from "@mui/material";

const ManualDownload: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 }, // スマホとPCでパディング調整
        bgcolor: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          fontSize: { xs: "1rem", sm: "1.25rem" }, // スマホ用にフォントサイズを調整
        }}
      >
        使用方法マニュアル
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="/path-to-manual.pdf"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textTransform: "none",
          fontWeight: 500,
          fontSize: { xs: "0.875rem", sm: "1rem" }, // スマホ用にフォントサイズを調整
          bgcolor: "#1976d2",
          "&:hover": { bgcolor: "#1565c0" },
        }}
      >
        マニュアルをダウンロード
      </Button>
    </Paper>
  );
};

export default ManualDownload;
