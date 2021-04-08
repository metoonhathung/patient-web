import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import PatientService from "../services/PatientService";

export default function PaginationBar({ condition, setPatients, deleted }) {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const totalPages = Math.ceil(count / perPage);
  const interval = 2;
  const pageNumbers = [];
  for (let i = currentPage - interval; i <= currentPage + interval; i++) {
    if (i < 1) {
      let compensate = currentPage + interval + (1 - i);
      if (compensate <= totalPages) pageNumbers.push(compensate);
    }
    if (i >= 1 && i <= totalPages) pageNumbers.push(i);
    if (i > totalPages) {
      let compensate = currentPage - interval - (i - totalPages);
      if (compensate >= 1) pageNumbers.push(compensate);
    }
    pageNumbers.sort((a, b) => a - b);
  }

  let loadCount = () => {
    PatientService.count(condition)
      .then((res) => setCount(res.data))
      .catch((err) => alert(err));
  };

  let loadGet = () => {
    let range = `LIMIT ${perPage} OFFSET ${(currentPage - 1) * perPage}`;
    PatientService.get(condition, range)
      .then((res) => setPatients(res.data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    setCurrentPage(1);
    loadCount();
  }, [condition]);

  useEffect(() => {
    loadGet();
  }, [condition, currentPage]);

  useEffect(() => {
    loadCount();
    loadGet();
  }, [deleted]);

  return (
    <Pagination className="justify-content-end">
      <Pagination.First onClick={() => setCurrentPage(1)} />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
      <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
    </Pagination>
  );
}
