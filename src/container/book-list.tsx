import { ChangeEventHandler, useEffect, useState } from 'react';

import BookItem from '../component/book-item';
import useGetBookList from '../service/get-book-list';
import {BookData, LOADINGSTATE} from '../type';
import './book-list.css';
import SortPanel, {SortOptions} from '../component/sort-panel';

export default function BookList(){
  const {data,loading}=useGetBookList();
  const [list, setList]=useState(data);
  const [sortValue, setSortValue]=useState(SortOptions.RANK);
  const onChangeRank:ChangeEventHandler<HTMLSelectElement>=(e)=>{
    console.log(e.target.value);
    setSortValue(Number(e.target.value));
  }

  useEffect(()=>{
    list?.results.sort((a:BookData,b:BookData):number=>{
      switch(sortValue){
        case SortOptions.RANK:
          console.log(a.rank,b.rank,a.rank-b.rank)
          return a.rank-b.rank;
        case SortOptions.TITLE:
          return a?.book_details?.[0].title.localeCompare(b?.book_details?.[0].title);
        case SortOptions.AUTHOR:
          return a?.book_details?.[0].author.localeCompare(b?.book_details?.[0].author);
        case SortOptions.ISNN:
          return a?.book_details?.[0].primary_isbn13.localeCompare(b?.book_details?.[0].primary_isbn13);
          // return a?.book_details?.[0].primary_isbn13-b?.book_details?.[0].primary_isbn13);
      }
    })
    setList(list);
  },[sortValue])


  if(loading!==LOADINGSTATE.SUCCESS){
    return (
    <div>{loading===LOADINGSTATE.INIT?'loading...':'Oops, something wrong, please try again...'}</div>
    );
  }
  console.log(data,list)
  return(
    <div className='list-container'>
      <p>Paperback Notification BestSellers</p>
      <div className="list-wrapper">
        <SortPanel onChange={onChangeRank} value={sortValue}/>
        <div className="book-list">
          {
            list?.results?.map((item)=><BookItem data={item} key={`${item.book_details?.[0]?.primary_isbn13}`} />)
          }
        </div>
      </div>
    </div>
  );
}