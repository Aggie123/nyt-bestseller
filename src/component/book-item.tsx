import { BookDetail } from "../type";
import './book-item.css';

export default function BookItem({data}:{data:BookDetail}):JSX.Element{
  return (
    <section className="book-container">
      <div className="book-rank text-bold">{data?.rank}.</div>
      <a href={data?.amazon_product_url}>
        <img className="book-img" src={data?.book_image} alt={data?.title} width={data?.book_image_width/3} height={data?.book_image_height/3}/>
      </a>
      <div className="book-content">
        <p className="book-title text-bold">{data?.title}</p>
        <p className="book-author text-normal">by {data?.author}</p>
        <p className="book-description text-normal margin-top-2">{data?.description}</p>
        <p className="book-isnb text-normal margin-top-2">ISBN: {data?.isbns?.[0]?.isbn10}</p>
      </div>
    </section>
  )
}