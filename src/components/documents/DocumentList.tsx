import React from "react"; // Reactライブラリをインポート
import { Document } from "./SalesDocuments"; // ドキュメント型をインポート
import DocumentTable from "./DocumentTable"; // ドキュメントテーブルコンポーネントをインポート
import DocumentCard from "./DocumentCard"; // ドキュメントカードコンポーネントをインポート

// DocumentListPropsインターフェースの定義
// DocumentListコンポーネントのpropsの型
interface DocumentListProps {
  documents: Document[]; // ドキュメントの配列を受け取る
  isMobile: boolean; // モバイル端末かどうかを示すフラグ
}

// DocumentListコンポーネントの定義
const DocumentList: React.FC<DocumentListProps> = ({ documents, isMobile }) => {
  // isMobileがtrueの場合はDocumentCard、falseの場合はDocumentTableを表示
  return isMobile ? (
    <DocumentCard documents={documents} /> // モバイルの場合、ドキュメントカードを表示
  ) : (
    <DocumentTable documents={documents} /> // デスクトップの場合、ドキュメントテーブルを表示
  );
};

export default DocumentList; // コンポーネントをエクスポート
