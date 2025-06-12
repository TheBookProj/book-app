import { useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import BookReview from "../BookReview/BookReview";
import axios from "axios";
import { useAuth } from "../../../firebase/authContext";
import { getMiddlewareService } from "../../../getServices/getMiddlewareService";
import Cookies from "js-cookie";

function BookReviewList({bookId}) {
    const [reviews, setReviews] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [reviewAllowed, isReviewAllowed] = useState(false);
    const userId = Cookies.get('id');
    const username = Cookies.get('username');

    useEffect(() => {
        setLoading(true);
        if(user && bookId) {
            user.getIdToken().then((tokenId) => {
                axios.get(`${getMiddlewareService()}/book-user/review/get?book_id=${bookId}`, { headers: { Authorization: `Bearer ${tokenId}` } }).then((response) => {
                    if(response.status == 200) {
                        setReviews(response.data.reviews);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            });
        }
    }, [bookId, user])

    useEffect(() => {
        if(reviews.length > 0) {
            console.log(reviews)
            isReviewAllowed(reviews.filter((review) => review.user_id == userId || review.username == username) <= 0);
        } else {
            isReviewAllowed(true);
        }
    }, [reviews])

    return(
        <div>
            {!loading && reviews.length > 0 ?
                reviews.map(review => (
                    <BookReview reviewData={review} />
                ))
                :
                <p>There are no reviews for this book yet.</p>
            }
            {(reviewAllowed && <AddComment bookId={bookId} comments={reviews} setComments={setReviews} isReview={true}/>)}
        </div>
    )
}

export default BookReviewList;