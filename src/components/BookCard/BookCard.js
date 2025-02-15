import { Card, Rate, Popover } from "antd";
import styles from './../../css/BookCard.module.css'

function BookCard({bookData}) {

    const { Meta } = Card;

    const bookContent = (
        <div>
            {bookData.rating >= 0 ? <Rate className={styles.bookRating} allowHalf disabled defaultValue={bookData.rating}/> : <p>Rating Unavailable</p>}
        </div>
    )

    return <div className={styles.container}>
        <Popover content={bookContent} title={bookData.authors.length > 1 ? bookData.authors[0] : bookData.authors[0] + " and more"}>
            <Card
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