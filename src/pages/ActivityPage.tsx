import React from "react";
import ActivityHistory from "../components/activity/ActivityHistory";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b", // プライマリーカラー
    },
    secondary: {
      main: "#ff7043", // セカンダリーカラー
    },
    background: {
      default: "#f5f5f5", // ページの背景色
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600, // タイトルのフォントウェイト
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px", // 余白の調整
          borderRadius: "12px", // 角を丸く
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // シャドウ
        },
      },
    },
  },
});

const ActivityPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ActivityHistory />{" "}
    </ThemeProvider>
  );
};

export default ActivityPage;
