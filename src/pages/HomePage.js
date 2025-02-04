import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false); // 처음에는 로딩 중이 아니라 false
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const {ref, inView} = useInView({
    
  });

  const fetchData = async () => {
    setLoading(true); // 1. 데이터 요청 시작 전에 로딩 상태 true로 설정

    // 2. 데이터 요청 시작
    try {
      const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`;
      const response = await fetch(API_URL);
      const result = await response.json(); // 응답을 json형태로 변환해서 result에 저장
  
      if (page > 1) {
        setPost((prev=>[...prev, ...result]));
      } else {
        setPost(result);
      }
    } catch (error) {
      // 오류 처리 부분
      console.error("데이터 로딩 오류:", error);
    } finally {
      setLoading(false); // 로딩 끝
    }
  };
};