import { Card, Rate, Popover } from "antd";
import styles from './../../css/BookCard.module.css'
import { useNavigate } from 'react-router-dom';

function BookCard({bookData}) {
    const navigate = useNavigate();
    const { Meta } = Card;

    const bookContent = (
        <div>
            {bookData.rating >= 0 ? <Rate className={styles.bookRating} allowHalf disabled defaultValue={bookData.rating}/> : <p>Rating Unavailable</p>}
        </div>
    )

    const handleCardClick = () => {
        const path = `/book-details?key=${bookData.key}&title=${bookData.title}&authors=${bookData.authors.join(",")}`
        navigate(path);
    }

    return <div className={styles.container}>
        <Popover content={bookContent} title={bookData.authors.length > 1 ? bookData.authors[0] + " and more" : bookData.authors[0]}>
            <Card
                onClick={handleCardClick}
                hoverable
                className={styles.bookCard}
                cover={<img alt={`Cover of ${bookData.title}`} src={bookData.cover}/>}
            >
                <Meta title={bookData.title}/>
            </Card>
        </Popover>
    </div>
}

export default BookCard