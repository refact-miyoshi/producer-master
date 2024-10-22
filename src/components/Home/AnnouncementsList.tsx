import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Announcement {
  id: number;
  title: string;
  date: string;
  detail: string;
}

interface AnnouncementListProps {
  announcements: Announcement[];
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({
  announcements,
}) => {
  const navigate = useNavigate();

  // 最新のものを最初に表示するためにソート
  const sortedAnnouncements = [...announcements].sort((a, b) => b.id - a.id);

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 }, // スマホとPCでパディング調整
        bgcolor: "#fff",
        borderRadius: 2,
        maxHeight: { xs: 300, sm: 400 }, // スマホでは高さを抑える
        overflowY: "auto", // スクロールを可能に
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: { xs: "1rem", sm: "1.25rem" } }}
        >
          お知らせ一覧
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/announcements/create")}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" }, // スマホ用にフォントサイズを調整
          }}
        >
          新規登録
        </Button>
      </Box>
      <List>
        {sortedAnnouncements.slice(0, 5).map((announcement) => (
          <ListItem key={announcement.id} sx={{ px: 0 }}>
            <ListItemText
              primary={announcement.title}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {announcement.date}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {announcement.detail}
                  </Typography>
                </>
              }
              primaryTypographyProps={{
                fontSize: { xs: "0.875rem", sm: "1rem" }, // スマホ用にフォントサイズを調整
                fontWeight: 500,
              }}
              secondaryTypographyProps={{
                fontSize: "0.75rem",
                color: "#666",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AnnouncementList;
