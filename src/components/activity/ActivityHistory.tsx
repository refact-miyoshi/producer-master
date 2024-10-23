import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Divider } from "@mui/material";
import axios from "axios";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import SearchForm from "./SearchForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// Activity インターフェースの定義
interface Activity {
  id: number;
  date: string;
  name: string;
  client: string;
  method: string;
  details: string;
}

const ActivityHistory: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // モバイル判定

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/activities")
      .then((response) => {
        setActivities(response.data);
        setFilteredActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities", error);
      });
  }, []);

  const handleAddActivity = (activity: Omit<Activity, "id">) => {
    axios
      .post("http://localhost:3001/api/activities", activity)
      .then((response) => {
        const newActivity = response.data;
        setActivities((prev) => [...prev, newActivity]);
        setFilteredActivities((prev) => [...prev, newActivity]);
      })
      .catch((error) => {
        console.error("Error logging activity", error);
      });
  };

  const handleFilter = (filters: {
    date: string;
    name: string;
    client: string;
  }) => {
    let filtered = activities;
    if (filters.date) {
      filtered = filtered.filter((activity) =>
        activity.date.startsWith(filters.date)
      );
    }
    if (filters.name) {
      filtered = filtered.filter((activity) =>
        activity.name.includes(filters.name)
      );
    }
    if (filters.client) {
      filtered = filtered.filter((activity) =>
        activity.client.includes(filters.client)
      );
    }
    setFilteredActivities(filtered);
  };

  return (
    <Container maxWidth="md" sx={{ mt: isMobile ? 0 : 2, mb: 2 }}>
      {" "}
      {/* モバイルの時だけ余白を小さく */}
      {/* タイトル */}
      {/* フォーム */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#00796b", fontSize: "1.1rem" }}
        >
          活動情報を入力してください
        </Typography>
        <Divider sx={{ my: 1, mb: 3 }} />
        <ActivityForm onSubmit={handleAddActivity} />
      </Box>
      {/* 検索フォームとリスト */}
      <Box>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#00796b", fontSize: "1.1rem" }}
        >
          検索・フィルタリング
        </Typography>
        <Divider sx={{ my: 1 }} />
        <SearchForm onFilter={handleFilter} />
        <Divider sx={{ my: 1 }} />
        <ActivityList activities={filteredActivities} />
      </Box>
    </Container>
  );
};

export default ActivityHistory;
