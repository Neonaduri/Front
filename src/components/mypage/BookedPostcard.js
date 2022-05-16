import React from "react";
import styled from "styled-components";

const BookedPostcard = ({ post, idx }) => {
  return (
    <PostCard key={idx}>
      <div>
        <img src={post.postImg}></img>
      </div>
      <div>
        <span>{post.title}</span>
        <span>
          {post.startDate}~{post.endDate}
        </span>
        <span>{post.location}</span>
      </div>
    </PostCard>
  );
};

const PostCard = styled.div`
  margin-bottom: 5px;
  display: flex;
  img {
    width: 210px;
    height: 120px;
    border-radius: 10px;
    filter: brightness(40%);
  }
  div {
    &:last-child {
      position: absolute;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        color: white;
      }
    }
  }
`;

export default BookedPostcard;
