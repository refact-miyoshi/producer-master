import React from "react"; // Reactライブラリをインポート
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"; // Material-UIコンポーネントをインポート

// Documentインターフェースの定義
interface Document {
  id: string; // ドキュメントのID
  title: string; // ドキュメントのタイトル
  url: string; // ドキュメントのURL
  uploadDate: string; // アップロード日
  uploadedBy: string; // アップロード者
}

// DocumentTablePropsインターフェースの定義
// DocumentTableコンポーネントのpropsの型
interface DocumentTableProps {
  documents: Document[]; // ドキュメントの配列を受け取る
}

// DocumentTableコンポーネントの定義
const DocumentTable: React.FC<DocumentTableProps> = ({ documents }) => {
  return (
    // Tableコンポーネント：テーブル全体を表す
    <Table>
      {/* TableHeadコンポーネント：テーブルのヘッダー部分 */}
      <TableHead sx={{ bgcolor: "#e0f7fa" }}>
        <TableRow>
          <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>{" "}
          {/* ヘッダセル */}
          <TableCell sx={{ fontWeight: "bold" }}>タイトル</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>URL</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>アップロード日</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>アップロード者</TableCell>
        </TableRow>
      </TableHead>
      {/* TableBodyコンポーネント：テーブルのボディ部分 */}
      <TableBody>
        {documents.map((doc) => (
          // 各ドキュメントごとにTableRowを作成
          <TableRow key={doc.id} sx={{ "&:hover": { bgcolor: "#f1f1f1" } }}>
            {" "}
            {/* ホバー時に背景色を変更 */}
            <TableCell>{doc.id}</TableCell> {/* 各セルの内容 */}
            <TableCell>{doc.title}</TableCell>
            <TableCell>
              <a
                href={`http://localhost:3001/${doc.url}`} // ダウンロードリンク
                target="_blank" // 新しいタブで開く
                rel="noopener noreferrer" // セキュリティ対策
              >
                ダウンロード
              </a>
            </TableCell>
            <TableCell>{doc.uploadDate}</TableCell>
            <TableCell>{doc.uploadedBy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentTable; // コンポーネントをエクスポート
