import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchPost } from "../services/api";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false); // 처음에는 로딩 중이 아니라 false
  const [page, setPage] = useState(1);

  // useInView: 스크롤을 감지하여 특정 요소가 화면에 보일 때
  // inView 값을 true로 변경함
  const { ref, inView } = useInView({
    // false로 설정했기 때문에 요소가 화면에 보일 때마다 inView가 true로 변함
    triggerOnce: false,
    threshold: 1.0,
  });

  const fetchData = async () => {
    setLoading(true); // 1. 데이터 요청 시작 전에 로딩 상태 true로 설정

    // 2. 데이터 요청 시작
    try {
      const result = await fetchPost(page);

      if (page > 1) {
        setPost((prev) => [...prev, ...result]);
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

  // 1. inView값이 true일 때 두 번째 useEffect가 실행됨
  //    이때 setPage 호출되고 페이지 번호 증가
  // 2. page값이 증가하면 첫 번째 useEffect가 실행되어,
  //    fetchData가 호출되고 새 데이터를 요청함
  useEffect(() => {
    fetchData();
  }, [page]); // 페이지가 변경될 때마다 fecthData 호출

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  return (
    <div>
      <h1>게시글</h1>
      <div>
        {post.map((item) => {
          return <PostCard key={item.id} post={item} />;
        })}
      </div>
      {loading && <LoadingSpinner />}

      {/*ref는 ref를 div 요소에 연결하는 역할을 함*/}
      {/* ref를 스크롤 감지할 대상 요소에 연결 */}
      {/* div 요소가 화면에 보일 때  inView가 true로 설정됨 */}
      <div ref={ref} style={{ height: "20px" }} />
    </div>
  );
};

export default HomePage;