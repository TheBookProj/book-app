import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Rate } from 'antd';
import { Comment } from '@ant-design/compatible';
import styles from '../../css/BookReview.module.css'
import { useState, createElement } from 'react';

function BookReview({ reviewData }) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const comments = [] // TO-DO

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
  ];

    const Review = () => (
  <Comment
    actions={actions}
    author={<a>Han Solo</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    content={
        <div className={styles.commentContainer}>
          <Rate className={styles.rating} allowHalf disabled defaultValue={3}/>
          <br/>
          <p className={styles.comment}>
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
          </p>
            
        </div>
    }
    datetime={
        <Tooltip title="2016-11-22 11:22:33">
          <span>8 hours ago</span>
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