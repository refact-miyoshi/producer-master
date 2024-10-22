import React, { useState, useEffect } from "react"; // Reactと必要なフックをインポート
import axios from "axios"; // HTTPクライアントのaxiosをインポート
import { Paper, useMediaQuery, useTheme } from "@mui/material"; // Material-UIコンポーネントをインポート
import UploadSection from "./UploadSection"; // アップロードセクションコンポーネントをインポート
import DocumentList from "./DocumentList"; // ドキュメントリストコンポーネントをインポート

// Documentインターフェースの定義
export interface Document {
  id: string; // ドキュメントのID
  title: string; // ドキュメントのタイトル
  url: string; // ドキュメントのURL
  uploadDate: string; // アップロード日
  uploadedBy: string; // アップロード者
}

// SalesDocumentsコンポーネントの定義
const SalesDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]); // ドキュメントの状態を管理するためのフック
  const theme = useTheme(); // テーマを取得するためのフック
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // モバイル端末かどうかを判定するためのフック

  // コンポーネントがマウントされた時にドキュメントを取得する
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/sales-documents") // APIエンドポイントにGETリクエストを送信
      .then((response) => {
        setDocuments(response.data); // 取得したデータを状態にセット
      })
      .catch((error) => {
        console.error("Error fetching documents", error); // エラーが発生した場合にコンソールに出力
      });
  }, []); // 空の依存配列により、コンポーネントのマウント時に一度だけ実行

  // 新しいドキュメントがアップロードされた時の処理
  const handleUploadSuccess = (newDocument: Document) => {
    setDocuments([...documents, newDocument]); // 新しいドキュメントを追加して状態を更新
  };

  return (
    // コンテナコンポーネント：全体のレイアウトを整える
    <>
      {/* アップロードセクションコンポーネント */}
      <UploadSection onUploadSuccess={handleUploadSuccess} />
      {/* ドキュメントリストを表示するペーパコンポーネント */}
      <Paper sx={{ borderRadius: 2, boxShadow: 2 }}>
        <DocumentList documents={documents} isMobile={isMobile} />
      </Paper>
    </>
  );
};

export default SalesDocuments; // コンポーネントをエクスポート
