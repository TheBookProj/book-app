import { Form, Button, Input, Avatar, Rate, message } from "antd";
import { useEffect, useState } from "react";
import moment from 'moment';
import { Comment } from '@ant-design/compatible';
import axios from "axios";
import { useAuth } from "../../../firebase/authContext";
import Cookies from 'js-cookie';
import { getMiddlewareService } from "../../../getServices/getMiddlewareService";

function AddComment({bookId, isReview, comments, setComments}) {
    const [submitting, setSubmitting] = useState(false);
    const [allowed, isAllowed] = useState(false);
    const btnText = isReview ? "Add Review" : "Add Comment";
    const [form] = Form.useForm();
    const { user } = useAuth();

    const saveComment = (commentBody, commentRating) => {
      const newComment = {
        user_id: Cookies.get('id'),
        book_id: bookId,
        rating: commentRating,
        comment: commentBody,
        private: false
      }      

      user.getIdToken().then((tokenId) => {
          axios.put(`${getMiddlewareService()}/book-user/review/add`, newComment, { headers: { Authorization: `Bearer ${tokenId}` } }, ).then((response) => {
              if(response.status == 200) {
                  form.setFieldValue("comment-body", "");
              }
          })
          .catch((error) => {
            console.log(error)
            message.error("There was an error - please try again.");
          })
          .finally(() => {
            setSubmitting(false);
          })
        });
    }

    const handleSubmit = () => {
      const commentBody = form.getFieldValue("comment-body").trim();
      const commentRating = form.getFieldValue("comment-rating");
      setSubmitting(true);
      setComments([
          ...comments,
          {
            username: Cookies.get('username'),
            rating: commentRating,
            comment: commentBody,
            created_at: moment().toISOString(),
          },
      ]);
      saveComment(commentBody, commentRating);
    };

    useEffect(() => {
      if(submitting) {
        form.setFieldValue("comment-body", "");
      }
    }, [submitting])

    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <Form form={form} onFinish={onSubmit}>
             <Form.Item name="comment-rating">
                <Rate onChange={() => isAllowed(true)} allowHalf defaultValue={0}></Rate>
            </Form.Item>
            <Form.Item name="comment-body">
                <Input.TextArea rows={4} value={value}/>
            </Form.Item>
            <Form.Item>
                <Button disabled={!allowed} htmlType="submit" loading={submitting} type="primary">
                    {btnText}
                </Button>
            </Form.Item>
        </Form>
    );

    return (
    <>
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        }
      />
    </>
  );

}

export default AddComment;