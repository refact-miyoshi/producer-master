import React from "react"; // Reactライブラリをインポート
import { Box, Paper, Typography, Button } from "@mui/material"; // Material-UIコンポーネントをインポート

// Producerインターフェースの定義
interface Producer {
  id: number; // プロデューサーのID
  name: string; // プロデューサーの名前
  email: string; // プロデューサーのメール
  productType: string; // プロデューサーの製品タイプ
  region: string; // プロデューサーの地域
  sales: number; // プロデューサーの売上
}

// ProducerCardListPropsインターフェースの定義
// ProducerCardListコンポーネントのpropsの型
interface ProducerCardListProps {
  producers: Producer[]; // プロデューサーの配列を受け取る
}

// ProducerCardListコンポーネントの定義
const ProducerCardList: React.FC<ProducerCardListProps> = ({ producers }) => {
  return (
    // Boxコンポーネント：レイアウトを整える
    <Box>
      {producers.map((producer, index) => (
        // Paperコンポーネント：各プロデューサーカードを表示
        <Paper
          sx={{ mb: 2, p: 2, bgcolor: index % 2 === 0 ? "#f5f5f5" : "white" }} // 背景色を交互に設定
          key={producer.id} // ユニークキーを設定
        >
          {/* プロデューサーの情報を表示 */}
          <Typography variant="h6">
            {producer.name} ({producer.id})
          </Typography>
          <Typography>メール: {producer.email}</Typography>
          <Typography>製品タイプ: {producer.productType}</Typography>
          <Typography>地域: {producer.region}</Typography>
          <Typography>売上: {producer.sales}</Typography>
          {/* 編集・削除ボタン */}
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
              編集
            </Button>
            <Button variant="outlined" color="secondary">
              削除
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ProducerCardList; // コンポーネントをエクスポート
