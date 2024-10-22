import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

interface PerformanceData {
  name: string;
  key: string;
  totalSales: number;
}

const PerformanceView: React.FC = () => {
  const [performanceByProductType, setPerformanceByProductType] = useState<
    PerformanceData[]
  >([]);
  const [performanceByRegion, setPerformanceByRegion] = useState<
    PerformanceData[]
  >([]);
  const [performanceYearOverYear, setPerformanceYearOverYear] = useState<
    PerformanceData[]
  >([]);
  const [sortBy, setSortBy] = useState<keyof PerformanceData>("key");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/performance/product-type")
      .then((response) => setPerformanceByProductType(response.data))
      .catch((error) => console.error("品目ごとの売上データ取得エラー", error));
    axios
      .get("http://localhost:3001/api/performance/region")
      .then((response) => setPerformanceByRegion(response.data))
      .catch((error) => console.error("地域ごとの売上データ取得エラー", error));
    axios
      .get("http://localhost:3001/api/performance/year-over-year")
      .then((response) => setPerformanceYearOverYear(response.data))
      .catch((error) => console.error("昨年比の売上データ取得エラー", error));
  }, []);

  const handleSort = (property: keyof PerformanceData) => {
    const isAsc = sortBy === property && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  const sortData = (data: PerformanceData[]) => {
    return data.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    });
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          実績ビュー
        </Typography>

        {/* 品目ごとの売上 */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#1976d2", fontWeight: "bold" }}
            >
              品目ごとの売上
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <Table
                stickyHeader
                aria-label="performance by product type table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "key"}
                        direction={sortBy === "key" ? sortOrder : "asc"}
                        onClick={() => handleSort("key")}
                      >
                        品目
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>名前</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "totalSales"}
                        direction={sortBy === "totalSales" ? sortOrder : "asc"}
                        onClick={() => handleSort("totalSales")}
                      >
                        合計売上
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortData(performanceByProductType).map(
                    (performance, index) => (
                      <TableRow
                        key={performance.key}
                        sx={{
                          bgcolor: index % 2 === 0 ? "#f5f5f5" : "white",
                          "&:hover": { bgcolor: "#e0f2f1" },
                        }}
                      >
                        <TableCell>{performance.key}</TableCell>
                        <TableCell>{performance.name}</TableCell>
                        <TableCell>{performance.totalSales}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>

        {/* 地域ごとの売上 */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#1976d2", fontWeight: "bold" }}
            >
              地域ごとの売上
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <Table stickyHeader aria-label="performance by region table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "key"}
                        direction={sortBy === "key" ? sortOrder : "asc"}
                        onClick={() => handleSort("key")}
                      >
                        地域
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>名前</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "totalSales"}
                        direction={sortBy === "totalSales" ? sortOrder : "asc"}
                        onClick={() => handleSort("totalSales")}
                      >
                        合計売上
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortData(performanceByRegion).map((performance, index) => (
                    <TableRow
                      key={performance.key}
                      sx={{
                        bgcolor: index % 2 === 0 ? "#f5f5f5" : "white",
                        "&:hover": { bgcolor: "#e0f2f1" },
                      }}
                    >
                      <TableCell>{performance.key}</TableCell>
                      <TableCell>{performance.name}</TableCell>
                      <TableCell>{performance.totalSales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>

        {/* 昨年比 */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#1976d2", fontWeight: "bold" }}
            >
              昨年比
            </Typography>
            <Box sx={{ overflowX: "auto" }}>
              <Table stickyHeader aria-label="year-over-year performance table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "key"}
                        direction={sortBy === "key" ? sortOrder : "asc"}
                        onClick={() => handleSort("key")}
                      >
                        年
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>名前</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === "totalSales"}
                        direction={sortBy === "totalSales" ? sortOrder : "asc"}
                        onClick={() => handleSort("totalSales")}
                      >
                        合計売上
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortData(performanceYearOverYear).map(
                    (performance, index) => (
                      <TableRow
                        key={performance.key}
                        sx={{
                          bgcolor: index % 2 === 0 ? "#f5f5f5" : "white",
                          "&:hover": { bgcolor: "#e0f2f1" },
                        }}
                      >
                        <TableCell>{performance.key}</TableCell>
                        <TableCell>{performance.name}</TableCell>
                        <TableCell>{performance.totalSales}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PerformanceView;
