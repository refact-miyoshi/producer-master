import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  onDrawerToggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onDrawerToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        width: `calc(100% - 200px)`, // サイドバー分の幅を引いた幅
        bgcolor: "#001E3C",
        color: "white",
        border: "none",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* メニューアイコン削除 */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
          >
            生産者管理システム
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "white",
              color: "white",
              fontSize: "0.875rem",
              padding: "4px 12px",
              "&:hover": {
                bgcolor: "white",
                color: "#0A1929",
              },
            }}
          >
            ログアウト
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
