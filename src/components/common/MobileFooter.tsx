import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import { Home, Map, History, FileCopy, MoreVert } from "@mui/icons-material"; // お弁当アイコン用に MoreVert を使用
import { Person, BarChart, PieChart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MobileFooter: React.FC = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // お弁当メニュー用のアンカー
  const navigate = useNavigate();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/activity-history");
        break;
      case 2:
        navigate("/map");
        break;
      case 3:
        navigate("/sales-documents");
        break;
      default:
        break;
    }
  };

  // お弁当メニューの開閉処理
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleCloseMenu();
  };

  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => handleNavigation(newValue)}
        >
          <BottomNavigationAction label="ホーム" icon={<Home />} />
          <BottomNavigationAction label="活動履歴" icon={<History />} />
          <BottomNavigationAction label="MAP" icon={<Map />} />
          <BottomNavigationAction label="営業資料" icon={<FileCopy />} />

          {/* お弁当メニュー */}
          <BottomNavigationAction
            label="その他"
            icon={<MoreVert />} // 3点リーダーアイコン
            onClick={handleOpenMenu} // クリックでメニューを展開
          />
        </BottomNavigation>
      </Paper>

      {/* お弁当メニューの展開内容 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            width: 200, // メニューの幅
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("/producer-master")}>
          <Person sx={{ mr: 1 }} /> 生産者マスタ
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/performance")}>
          <BarChart sx={{ mr: 1 }} /> 実績
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/chart")}>
          <PieChart sx={{ mr: 1 }} /> 生産者カルテ
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileFooter;
