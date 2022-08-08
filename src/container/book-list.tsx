import { ChangeEventHandler,  useState } from 'react';

import BookItem from '../component/book-item';
import useGetBookList from '../service/get-book-list';
import {LOADINGSTATE, SortOptions} from '../type/index.d';
import './book-list.css';
import SortPanel from '../component/sort-panel';


export default function BookList(){
  const [sortValue, setSortValue]=useState(SortOptions.RANK);
  const {data,loading}=useGetBookList(sortValue);

  const onChangeRank:ChangeEventHandler<HTMLSelectElement>=(e)=>{
    // console.log(e.target.value);
    setSortValue(Number(e.target.value));
  }


  if(loading!==LOADINGSTATE.SUCCESS){
    return (
    <div>{loading===LOADINGSTATE.INIT?'loading...':'Oops, something wrong, please try again...'}</div>
    );
  }

  return(
    <div className='list-container'>
      <p>Paperback Notification BestSellers</p>
      <div className="list-wrapper">
        <SortPanel onChange={onChangeRank} value={sortValue}/>
        <div className="book-list">
          {
            data?.results?.map((item)=><BookItem data={item} key={`${item.book_details?.[0]?.primary_isbn13}`} />)
          }
        </div>
      </div>
    </div>
  );
}