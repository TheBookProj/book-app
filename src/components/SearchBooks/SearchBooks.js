import { Input, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons'
import styles from "../../css/SearchBooks.module.css"

function SearchBooks() {
    return <div className={styles.page}>
        <Input 
            className={styles.searchBar}
            placeholder="Find a book..."
        />
        <Button>
            <SearchOutlined />
        </Button>
    </div>
}

export default SearchBooks;