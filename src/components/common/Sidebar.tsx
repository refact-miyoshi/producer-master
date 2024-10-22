import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import {
  Home,
  Person,
  Map,
  BarChart,
  History,
  FileCopy,
  PieChart,
} from "@mui/icons-material";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle }) => {
  const sidebarContent = (
    <List sx={{ flexGrow: 1, pt: 2 }}>
      {[
        { label: "ホーム", icon: <Home />, path: "/" },
        { label: "生産者マスタ", icon: <Person />, path: "/producer-master" },
        { label: "実績", icon: <BarChart />, path: "/performance" },
        { label: "生産者カルテ", icon: <PieChart />, path: "/chart" },
        { label: "営業MAP", icon: <Map />, path: "/map" },
        { label: "活動履歴", icon: <History />, path: "/activity-history" },
        { label: "営業資料", icon: <FileCopy />, path: "/sales-documents" },
      ].map(({ label, icon, path }) => (
        <ListItem
          component={Link}
          to={path}
          key={label}
          sx={{
            color: "white",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
            transition: "background-color 0.3s",
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 200,
            border: "none",
          },
        }}
      >
        <Box
          sx={{
            width: 200,
            height: "100vh",
            bgcolor: "#0A1929",
            color: "white",
            padding: 1,
            boxShadow: 3,
          }}
        >
          {sidebarContent}
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
