import React from "react";
import { Button, Pagination } from "react-bootstrap";
import "./CardPagination.scss";

const CardPagination = () => {
  return (
    <div className="pagination-wapper flex-md-row flex-column-reverse align-items-center">
      <div className="pagination-btns">
        <Button className="me-3">Prev</Button>
        <Button className="ms-3">Next</Button>
      </div>
      <div className="pagination-numbers">
        <Pagination>
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{497}</Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
};

export default CardPagination;
