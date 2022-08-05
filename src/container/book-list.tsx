import BookItem from '../component/book-item';
import useGetBookList from '../service/get-book-list';
import {LOADINGSTATE} from '../type';
import './book-list.css';
import SortPanel from '../component/sort-panel';

export default function BookList(){
  const {data,loading}=useGetBookList();
  if(loading!==LOADINGSTATE.SUCCESS){
    return (
    <div>{loading===LOADINGSTATE.INIT?'loading...':'Oops, something wrong, please try again...'}</div>
    );
  }
  return(
    <div className='list-container'>
      <p>Paperback Notification BestSellers</p>
      <div className="list-wrapper">
        <SortPanel />
        <div className="book-list">
          {
            data?.results?.map((item,index)=><BookItem data={item} key={`${item.display_name}-${index}`} index={index}/>)
          }
        </div>
      </div>
    </div>
  );
}