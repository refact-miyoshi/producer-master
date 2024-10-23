import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Linkをインポート

// Activity インターフェースの定義
interface Activity {
  id: number;
  date: string;
  name: string;
  client: string;
  method: string;
  details: string;
}

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <>
      {activities.length > 0 ? (
        <List>
          {activities.map((activity) => (
            <ListItem
              key={activity.id}
              sx={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                mb: 2,
              }}
              component={Link} // Linkコンポーネントとして扱う
              to={`/activities/${activity.id}`} // 詳細ページへのリンク
            >
              <ListItemText
                primary={`[${activity.date}] ${activity.name} - ${activity.method}`}
                secondary={`営業先: ${activity.client}, 詳細: ${activity.details}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>活動履歴が見つかりません。</Typography>
      )}
    </>
  );
};

export default ActivityList;
