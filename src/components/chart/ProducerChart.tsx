import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { jsPDF } from "jspdf";

const ProducerForm: React.FC = () => {
  // 初期状態の定義
  const [formData, setFormData] = useState({
    producerNumber: "",
    producerName: "",
    birthDate: "",
    healthStatus: "",
    address: "",
    businessType: "",
    landType: "自宅", // 自宅 or 借地
    scaleRiceField: "",
    scaleVegetableField: "",
    scaleFruitField: "",
    mainProduct: "",
    tel: "",
    mobile: "",
    fax: "",
    email: "",
    farmingYears: "",
    sustainableYears: "",
    successor: "無", // 有 or 無
    employeeCount: "",
    fieldAddress1: "",
    fieldArea1: "",
    fieldAddress2: "",
    fieldArea2: "",
    fieldAddress3: "",
    fieldArea3: "",
    deliveryMethod: "",
    supplier: "",
    pesticide: "無", // 有 or 無
    annualSales: "",
    salesToEverly1: "",
    salesToEverly2: "",
    salesToEverly3: "",
    requestToEverly: "",
    otherSalesDestinations: "",
    remarks: "",
    schedule: Array(12).fill(""),
  });

  // 入力変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PDF作成ハンドラ
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text("Producer Cart", 10, 10);
    doc.save("producer_cart.pdf");
  };

  return (
    <Paper
      sx={{ padding: 3, marginBottom: 4, width: "210mm", minHeight: "297mm" }}
    >
      <Typography variant="h4" gutterBottom>
        生産者カルテ
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="生産者番号"
            name="producerNumber"
            value={formData.producerNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="生産者氏名"
            name="producerName"
            value={formData.producerName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="生年月日"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="健康状況"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* 以下、残りのフィールドも同様に追加 */}
        {/* ... */}

        {/* PDF作成ボタン */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGeneratePDF}
          >
            PDF出力
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProducerForm;
