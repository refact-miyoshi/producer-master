import React from "react"; // Reactライブラリをインポート
import { Card, CardContent, Typography, Button, Box } from "@mui/material"; // Material-UIコンポーネントをインポート

// Documentインターフェースの定義
interface Document {
  id: string; // ドキュメントのID
  title: string; // ドキュメントのタイトル
  url: string; // ドキュメントのURL
  uploadDate: string; // アップロード日
  uploadedBy: string; // アップロード者
}

// DocumentCardPropsインターフェースの定義
// DocumentCardコンポーネントのpropsの型
interface DocumentCardProps {
  documents: Document[]; // ドキュメントの配列を受け取る
}

// DocumentCardコンポーネントの定義
const DocumentCard: React.FC<DocumentCardProps> = ({ documents }) => {
  return (
    // Boxコンポーネントで囲み、ドキュメントカードを表示
    <Box>
      {documents.map((doc) => (
        // 各ドキュメントごとにCardコンポーネントを作成
        <Card key={doc.id} sx={{ mb: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6">{doc.title}</Typography>{" "}
            {/* ドキュメントのタイトル */}
            <Typography variant="body2" color="text.secondary">
              ID: {doc.id} {/* ドキュメントのID */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              アップロード日: {doc.uploadDate} {/* アップロード日 */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              アップロード者: {doc.uploadedBy} {/* アップロード者 */}
            </Typography>
            <Button
              href={`http://localhost:3001/${doc.url}`} // ダウンロードリンク
              target="_blank" // 新しいタブで開く
              rel="noopener noreferrer" // セキュリティ対策
              variant="contained"
              sx={{ mt: 1 }}
            >
              ダウンロード
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DocumentCard; // コンポーネントをエクスポート
