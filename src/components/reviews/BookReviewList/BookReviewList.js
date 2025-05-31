import { useEffect, useState } from "react";
import AddComment from "../AddComment/AddComment";
import BookReview from "../BookReview/BookReview";
import axios from "axios";
import { useAuth } from "../../../firebase/authContext";
import { getMiddlewareService } from "../../../getServices/getMiddlewareService";

function BookReviewList({bookId}) {
    const [reviews, setReviews] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        console.log(bookId)
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
        // console.log(reviews);
        // console.log(bookId);
    }, [reviews])

    return(
        <div>
            {!loading && reviews.length > 0 ?
                reviews.map(review => (
                    <BookReview reviewData={review} />
                ))
                :
                <p>There are no reviews for this book yet</p>
            }
            <AddComment comments={reviews} setComments={setReviews} isReview={true}/>
        </div>
    )
}

export default BookReviewList;