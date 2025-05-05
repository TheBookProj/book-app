import { Input, Row } from "antd";
import styles from "../../css/SearchBooks.module.css"
import { useState, useEffect } from "react"
import BookCard from "../BookCard/BookCard";
import { getBooksService } from "../../getServices/getBooksService";
import axios from "axios";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

function SearchBooks() {
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const location = useLocation();
    const bookQuery = params.get("q");

    const { Search } = Input;

    useEffect(() => {
        if (bookQuery) {
            setLoading(true);
            axios.get(`${getBooksService()}/books/search?q=${bookQuery}`).then((response) => {
                if(response.status == 200) {
                    setBookList(response.data)
                    setLoading(false);
                }
            });
        }
      }, [bookQuery]); 

    const onSearch = (query) => {
        params.delete("q")
        params.append("q", query)
        navigate({
            pathname: location.pathname,
            search: `?${params.toString()}`
          });
    }

    return <div className={styles.page}>
        <Search 
            className={styles.searchBar}
            placeholder="Find a book..."
            onSearch={onSearch}
            defaultValue={bookQuery}
        />

        {!loading ? <Row>
            {bookList.map(book => (
                <BookCard bookData={book} />
            ))}
        </Row> : <p>Loading ...</p>}
    </div>
}

export default SearchBooks;
