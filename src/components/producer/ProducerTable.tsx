import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { Producer } from "./ProducerMaster";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ProducerTableProps {
  producers: Producer[];
  setProducers: React.Dispatch<React.SetStateAction<Producer[]>>;
}

const ProducerTable: React.FC<ProducerTableProps> = ({
  producers,
  setProducers,
}) => {
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    if (window.confirm("本当に削除しますか？")) {
      axios
        .delete(`http://localhost:3001/api/producers/${id}`)
        .then(() => {
          setProducers(producers.filter((producer) => producer.id !== id));
        })
        .catch((error) => console.error("Error deleting producer", error));
    }
  };

  return (
    <Table sx={{ minWidth: 650 }}>
      <TableHead sx={{ bgcolor: "primary.light" }}>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>名前</TableCell>
          <TableCell>メール</TableCell>
          <TableCell>製品タイプ</TableCell>
          <TableCell>地域</TableCell>
          <TableCell>売上</TableCell>
          <TableCell>操作</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {producers.map((producer) => (
          <TableRow key={producer.id}>
            <TableCell>{producer.id}</TableCell>
            <TableCell>{producer.name}</TableCell>
            <TableCell>{producer.email}</TableCell>
            <TableCell>{producer.productType}</TableCell>
            <TableCell>{producer.region}</TableCell>
            <TableCell>{producer.sales}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/producer-master/edit/${producer.id}`)}
                sx={{ mr: 1 }}
              >
                編集
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(producer.id)}
              >
                削除
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProducerTable;
