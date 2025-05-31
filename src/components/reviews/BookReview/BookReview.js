import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Rate } from 'antd';
import { Comment } from '@ant-design/compatible';
import styles from '../../../css/BookReview.module.css'
import { useState, createElement, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useAuth } from '../../../firebase/authContext';
import { getMiddlewareService } from '../../../getServices/getMiddlewareService';

function BookReview({ reviewData }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [author, setAuthor] = useState("");
  const { user } = useAuth();

  const comments = [] // TO-DO

  useEffect(() => {
    if(reviewData.hasOwnProperty("username")) {
      setAuthor(reviewData.username);
    } else if(user) {
        user.getIdToken().then((tokenId) => {
          axios.get(`${getMiddlewareService()}/users/get/${reviewData.user_id}`, { headers: { Authorization: `Bearer ${tokenId}` } }).then((response) => {
              if(response.status == 200) {
                  setAuthor(response.data.user.username);
              }
          })
          .catch((error) => {
              console.log(error);
          })
      });
    }
  }, [user]);

  const like = () => {
      setLikes(1);
      setDislikes(0);
      setAction('liked');
  };
  const dislike = () => {
      setLikes(0);
      setDislikes(1);
      setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
    <span key="comment-basic-delete">Delete</span>
  ];

    const Review = () => (
  <Comment
    actions={actions}
    author={<a>{author}</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={reviewData?.author} />}
    content={
        <div className={styles.commentContainer}>
          <Rate className={styles.rating} allowHalf disabled defaultValue={reviewData?.rating}/>
          <br/>
          <p className={styles.comment}>
              {reviewData?.comment}
          </p>
            
        </div>
    }
    datetime={
        <Tooltip title={moment(reviewData?.created_at)?.toString()}>
          <span>{moment(reviewData?.created_at)?.fromNow()}</span>
        </Tooltip>
      }
  >
    {comments}
  </Comment>
);

    return <div>
        <Review>
            <Review>
                <Review />
                <Review />
            </Review>
        </Review>
    </div>
}

export default BookReview;