import React from "react";
import { useParams } from "react-router";

const Detail = () => {
  const params = useParams();
  const productId = params.id;

  console.log(productId);

  return <>플랜 상세페이지입니다!</>;
};

export default Detail;
