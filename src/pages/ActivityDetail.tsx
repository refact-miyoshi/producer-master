import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

// Activity インターフェースの定義
interface Activity {
  id: number;
  date: string;
  name: string;
  client: string;
  method: string;
  details: string;
}

const ActivityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLパラメータからIDを取得
  const [activity, setActivity] = useState<Activity | null>(null); // 活動の状態を管理するuseStateフック

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/activities/${id}`) // IDに基づいて活動を取得
        .then((response) => setActivity(response.data)) // 活動データを状態にセット
        .catch((error) =>
          console.error("Error fetching activity details", error)
        ); // エラーが発生した場合にコンソールに出力
    }
  }, [id]);

  if (!activity) {
    return <Typography>活動が見つかりません。</Typography>; // 活動が見つからない場合のメッセージ
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            活動詳細
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">{`日時: ${activity.date}`}</Typography>
          <Typography variant="h6">{`名前: ${activity.name}`}</Typography>
          <Typography variant="h6">{`営業先: ${activity.client}`}</Typography>
          <Typography variant="h6">{`方法: ${activity.method}`}</Typography>
          <Typography variant="h6">{`詳細: ${activity.details}`}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ActivityDetail;
