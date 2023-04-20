import React, { useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiFillInfoCircle,
} from "react-icons/ai";

import "./card.css";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img className="userImg" src={post?.userImg} alt="" />
        <span>{post?.fullname}</span>
      </div>
      <img src={post?.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <AiFillHeart className="cardIcon" color="red" />
        ) : (
          <AiOutlineHeart
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <AiOutlineComment
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <AiOutlineShareAlt
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <AiFillInfoCircle className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
