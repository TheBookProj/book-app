import { Card, Rate } from "antd";
import styles from './../../css/BookCard.module.css'

function BookCard({bookData}) {

    const { Meta } = Card;

    return <div className={styles.container}>
        <Card
            hoverable
            className={styles.bookCard}
            cover={<img alt={`Cover of ${bookData.title}`} src={bookData.coverImage} />}
        >
            <Meta title={bookData.title} description={bookData.author} />
            <br/>
            <Rate className={styles.bookRating} allowHalf disabled defaultValue={bookData.rating}/>
        </Card>
    </div>
}

export default BookCard