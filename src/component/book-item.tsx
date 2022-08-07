import { BookData } from "../type";
import './book-item.css';

export default function BookItem({data}:{data:BookData}):JSX.Element{
  return (
    <section className="book-container">
      <div className="book-rank text-bold">{data.rank}</div>
      <img className="book-img" src={data.amazon_product_url} alt={data.book_details?.[0]?.title}/>
      <div className="book-content">
        <p className="book-title text-bold">{data.book_details?.[0]?.title}</p>
        <p className="book-author text-normal">{data.book_details?.[0]?.author}</p>
        <p className="book-description text-normal">{data.book_details?.[0]?.description}</p>
        <p className="book-isnb text-normal">{data.book_details?.[0]?.primary_isbn13}</p>
      </div>
    </section>
  )
}