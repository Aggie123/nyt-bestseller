import { BookData } from "../type";
import './book-item.css';

export default function BookItem({data, index}:{data:BookData, index:number}):JSX.Element{
  return (
    <section className="book-container">
      <div className="book-rank text-bold">{index}</div>
      <image className="book-img">{}</image>
      <div className="book-content">
        <p className="book-title text-bold">{data.display_name}</p>
        <p className="book-author text-normal">{data.display_name}</p>
        <p className="book-description text-normal">{data.display_name}</p>
        <p className="book-isnb text-normal">{data.display_name}</p>
      </div>
    </section>
  )
}