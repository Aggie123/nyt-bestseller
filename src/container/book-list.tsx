import { ChangeEventHandler,  MouseEventHandler,  useState } from 'react';

import BookItem from '../component/book-item';
import useGetBookList from '../service/get-book-list';
import {BookDetail, LOADINGSTATE, SortOptions} from '../type/index.d';
import './book-list.css';
import SortPanel from '../component/sort-panel';


export default function BookList(){
  const [sortValue, setSortValue]=useState(SortOptions.RANK);
  const {data,loading}=useGetBookList(sortValue);

  const onChangeRank:ChangeEventHandler<HTMLSelectElement>=(e)=>{
    // console.log(e.target.value);
    setSortValue(Number(e.target.value));
  }

  const onClickMore:MouseEventHandler<HTMLButtonElement>=(e)=>{
    console.log(e.target);
  }


  if(loading!==LOADINGSTATE.SUCCESS){
    return (
    <div>{loading===LOADINGSTATE.INIT?'loading...':'Oops, something wrong, please try again...'}</div>
    );
  }
  console.log(data)
  return(
    <div className='list-container'>
      <h2 className="list-title">Paperback Notification BestSellers</h2>
      <div className="list-wrapper">
        <SortPanel onChange={onChangeRank} value={sortValue}/>
        <div className="book-list">
          {
            data?.results?.books?.map((item:BookDetail)=><BookItem data={item} key={`${item?.isbns?.[0]?.isbn10}`} />)
          }
        </div>
        <div className="more">
          <button className="moreBtn" onClick={onClickMore}>SHOW MORE</button>
        </div>
      </div>
    </div>
  );
}