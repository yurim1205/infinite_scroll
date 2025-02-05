import React from "react";

export const fetchPost = async (page) => {
  try {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;
    const response = await fetch(API_URL);

    const result = await response.json(); // 응답을 json형태로 변환해서 result에 저장
    return result;
  } catch (error) {
    console.log("오류 발생", error);
    throw error;
  }
};