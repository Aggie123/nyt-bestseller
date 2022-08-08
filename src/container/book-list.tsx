import { ChangeEventHandler, useState } from 'react';

import BookItem from '../component/book-item';
import useGetBookList from '../service/get-book-list';
import SortPanel from '../component/sort-panel';
import {BookDetail, LOADINGSTATE, SortOptions} from '../type/index.d';
import './book-list.css';


export default function BookList(){
  const [sortValue, setSortValue]=useState(SortOptions.RANK);
  const {data,loading}=useGetBookList(sortValue);

  const onChangeRank:ChangeEventHandler<HTMLSelectElement>=(e)=>{
    setSortValue(Number(e.target.value));
  }

  // 实现了图片滚动懒加载的方式加载更多
  // const onClickMore:MouseEventHandler<HTMLButtonElement>=(e)=>{
  //   console.log(e.target);
  // }

  return(
    <div className='list-container'>
      <h2 className="list-title">Paperback Notification BestSellers</h2>
      <div className="list-wrapper">
        <SortPanel onChange={onChangeRank} value={sortValue}/>
        <div className="book-list">
          { 
            loading!==LOADINGSTATE.SUCCESS
            ?
            <div className='flex-center loading'>{loading===LOADINGSTATE.INIT?'loading...':'Oops, something wrong, please try again...'}</div>
            :
            data?.results?.books?.map((item:BookDetail)=><BookItem data={item} key={`${item?.isbns?.[0]?.isbn10}`} />)
          }
        </div>
        {/* 实现了图片滚动懒加载的方式加载更多 */}
        {/* <div className="more">
          <button className="moreBtn" onClick={onClickMore}>SHOW MORE</button>
        </div> */}
      </div>
    </div>
  );
}