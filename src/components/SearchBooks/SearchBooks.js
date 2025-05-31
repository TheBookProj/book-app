import { Input, Row, message } from "antd";
import styles from "../../css/SearchBooks.module.css"
import { useState, useEffect } from "react"
import BookCard from "../BookCard/BookCard";
import { getMiddlewareService } from "../../getServices/getMiddlewareService";
import axios from "axios";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../firebase/authContext";

function SearchBooks() {
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const location = useLocation();

    const { Search } = Input;
    const { user } = useAuth();

    useEffect(() => {
        if (params.get("q") && user) {
            setLoading(true);
            user.getIdToken().then((tokenId) => {
                axios.get(`${getMiddlewareService()}/books/search?q=${params.get("q")}`, { headers: { Authorization: `Bearer ${tokenId}` } }).then((response) => {
                    if(response.status == 200) {
                        setBookList(response.data)
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error)
                    message.error("There was an error - please try again.")
                })
            });
        }
      }, [user, params.get("q")]); 

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
            defaultValue={params.get("q")}
        />

        {!loading ? <Row>
            {bookList.map(book => (
                <BookCard bookData={book} />
            ))}
        </Row> : <p>Loading ...</p>}
    </div>
}

export default SearchBooks;
