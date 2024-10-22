// Layout.tsx
import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileFooter from "./MobileFooter";
import MobileTopbar from "./MobileTopbar";

const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      {!isMobile && <Sidebar open={true} onToggle={() => {}} />}
      {!isMobile && <Topbar onDrawerToggle={() => {}} />}
      {isMobile && <MobileTopbar />}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: { sm: "200px" }, mt: { xs: "64px" } }}
      >
        <Outlet />
      </Box>
      {isMobile && <MobileFooter />}
    </Box>
  );
};

export default Layout;
