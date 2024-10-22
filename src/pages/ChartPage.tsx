import React from "react";
import { Box } from "@mui/material";
import ProducerChart from "../components/chart/ProducerChart";

const ChartPage: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: "#f4f6f8",
        height: "100vh",
        ml: { sm: "30px" },
      }}
    >
      <ProducerChart />
    </Box>
  );
};

export default ChartPage;
