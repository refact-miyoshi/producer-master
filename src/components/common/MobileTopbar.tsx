import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Badge,
  Typography,
} from "@mui/material";
import { AccountCircle, Notifications } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const MobileTopbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications] = useState<string[]>([
    "通知1: システムアップデート",
    "通知2: メンテナンス予定",
    "通知3: 新しいメッセージがあります",
  ]);
  const navigate = useNavigate();
  const location = useLocation(); // 現在のパスを取得

  // ページ名をマッピングする
  const pageTitles: { [key: string]: string } = {
    "/": "",
    "/my-page": "マイページ",
    "/settings": "設定",
    "/activity-history": "営業活動履歴",
    "/producer-master": "生産者マスタ",
    "/performance": "実績",
    "/chart": "生産者カルテ",
    "/map": "営業MAP",
    "/sales-documents": "営業資料",
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
    handleClose();
  };

  const handleMyPage = () => {
    navigate("/my-page");
    handleClose();
  };

  // 現在のページがホームかどうかをチェック
  const isHome = location.pathname === "/";

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#00740AFF", color: "white" }}>
      <Toolbar sx={{ position: "relative" }}>
        {/* ホームでは画像、他のページではページ名を表示 */}
        <Box
          sx={{
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            color: "#FFFFFFFF",
          }}
        >
          {isHome ? (
            <img
              src="/images/logo.png" // 画像のパス (public フォルダ内の画像を参照)
              alt="生産者管理システム"
              style={{ height: 40 }} // 画像の高さを調整
            />
          ) : (
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {pageTitles[location.pathname] || "ページ名なし"}{" "}
              {/* パスがマップにない場合のデフォルト */}
            </Typography>
          )}
        </Box>
        <Box sx={{ position: "absolute", right: 16, display: "flex" }}>
          {/* 通知アイコン */}
          <IconButton color="inherit" onClick={handleNotifMenu}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notifAnchorEl}
            open={Boolean(notifAnchorEl)}
            onClose={handleClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index} onClick={handleClose}>
                  {notification}
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleClose}>通知はありません</MenuItem>
            )}
          </Menu>

          {/* アカウントアイコン */}
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleMyPage}>マイページ</MenuItem>
            <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MobileTopbar;
