import { Input, Button, Row, Col } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import styles from "../../css/SearchBooks.module.css"
import { useState } from "react"
import BookCard from "../BookCard/BookCard";

function SearchBooks() {
    const [bookList, setBookList] = useState([])

    const onSearch = () => {
        // for testing
        setBookList([
            { 
                title: "Throne of Glass",
                coverImage: "https://m.media-amazon.com/images/I/81Or91a0G+L._UF894,1000_QL80_.jpg",
                author: "Sarah J. Mass",
                rating: 4.5
            },
            { 
                title: "Crown of Midnight",
                coverImage: "https://m.media-amazon.com/images/I/81iTPPOMFzL.jpg",
                author: "Sarah J. Mass",
                rating: 5
            }
        ]);
    }

    return <div className={styles.page}>
        <Input 
            className={styles.searchBar}
            placeholder="Find a book..."
        />
        <Button onClick={onSearch}>
            <SearchOutlined />
        </Button>

        <Row>
            {bookList.map(book => (
                <BookCard bookData={book} />
            ))}
        </Row>



    </div>
}

export default SearchBooks;