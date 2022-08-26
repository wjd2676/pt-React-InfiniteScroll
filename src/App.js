import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
  const [commentData, setCommentData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCommentData = async (pageNumber) => {
    console.log(pageNumber);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${pageNumber}&_limit=10`
    );
    const data = await res.json();
    setCommentData((p) => [...p, ...data]);
    setLoading(true);
  };

  useEffect(() => {
    fetchCommentData(pageNumber);
  }, [pageNumber]);

  const pageEnd = useRef();

  let num = 1;

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore();
            if (num >= 50) observer.unobserve(pageEnd.current);
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current);
    }
  }, [loading, num]);

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <InfiniteScrollContainer>
      {commentData.map((comment, index) => (
        <CommentContainer key={index}>
          <CommentBox>
            <div>CommentId</div>
            <span>{comment.id}</span>
          </CommentBox>
          <CommentBox>
            <div>Email</div>
            <span>{comment.email}</span>
          </CommentBox>
          <CommentDetail>
            <div>Comment</div>
            <span>{comment.body}</span>
          </CommentDetail>
        </CommentContainer>
      ))}
      <PageEnd ref={pageEnd}> Loading....</PageEnd>
    </InfiniteScrollContainer>
  );
}

const PageEnd = styled.div`
  height: 300px;
  margin-bottom: 200px;
`;

const InfiniteScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  border: 1px solid black;
`;

const CommentContainer = styled.div`
  width: 40%;
  margin: 20px;
  border: 1px solid blue;
`;

const CommentBox = styled.div`
  border: 1px solid red;
  div {
    font-size: 30px;
  }

  span {
    font-size: 20px;
  }
`;

const CommentDetail = styled.div`
  border: 1px solid purple;
  div {
    font-size: 30px;
  }

  span {
    font-size: 20px;
  }
`;

export default App;
