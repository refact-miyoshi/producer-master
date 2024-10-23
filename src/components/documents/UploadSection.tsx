import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Paper } from "@mui/material";

interface UploadSectionProps {
  onUploadSuccess: (newDocument: any) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadedBy", "yourUserName");
      axios
        .post("http://localhost:3001/api/sales-documents/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          onUploadSuccess(response.data);
          setFile(null);
        })
        .catch((error) => {
          console.error("ファイルアップロードエラー", error);
        });
    }
  };

  return (
    <Paper sx={{ p: 1, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // スマホでは縦並び、PCでは横並び
          gap: 1,
          alignItems: "center",
        }}
      >
        {/* ファイル選択フィールド (input要素に変更) */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            cursor: "pointer",
            height: "auto",
            fontSize: "inherit",
            border: "none", // 枠線を非表示
            padding: 0,
          }}
        />

        {/* アップロードボタン */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{
            minWidth: { xs: "100px", sm: "150px" },
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
        >
          アップロード
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadSection;
