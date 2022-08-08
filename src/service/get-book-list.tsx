import { useEffect, useState } from "react";
import axios from "axios";

import {LOADINGSTATE,SortOptions, BookList, BookDetail} from '../type/index.d'

const baseUrl ='https://api.nytimes.com/svc/books/v3';
const apiKey='TCA6F3ERSCl405KagmGI7MIe8rn2bu2U'; // TODO store key safely
// const lists='/lists.json?list=hardcover-fiction';
const listsByDate='/lists/current/hardcover-fiction.json'

const SUCCESSSTATUS=200;
// const url=`${baseUrl}${lists}&api-key=${apiKey}`; // 这个返回没有书的图片，放弃
const url=`${baseUrl}${listsByDate}?&api-key=${apiKey}`;
export default function useGetBookList(sortValue:SortOptions=SortOptions.RANK, offset:number=0):{loading:LOADINGSTATE,data:BookList|null}{
  const [data, setData]=useState<BookList|null>(null);
  const [loading, setLoading] = useState<LOADINGSTATE>(LOADINGSTATE.INIT);

  useEffect(() => {
    axios.get(`${url}&offset=${offset}`)
    .then((response) =>{
      const {status, data} = response;
      console.log('ddd',data)
      if(status!==SUCCESSSTATUS){
        setLoading(LOADINGSTATE.FAIL);
        setData(null);
      }else{
        setLoading(LOADINGSTATE.SUCCESS);
        const sortedData=sortBookList(data, sortValue);
        setData(()=>sortedData);
      }
    })
    
  },[sortValue,offset]) // offset的功能支持，但具体没有实现
  return {loading, data};
}

// 排序功能
function sortBookList(data:BookList|null, sortValue:SortOptions):(BookList|null){
  data?.results?.books?.sort((a:BookDetail,b:BookDetail):number => {
    switch(sortValue){
      case SortOptions.RANK:
        return a.rank-b.rank;
      case SortOptions.TITLE:
        return a?.title.localeCompare(b?.title);
      case SortOptions.AUTHOR:
        return a?.author.localeCompare(b?.author);
      case SortOptions.ISNN:
        return Number(a?.isbns?.[0]?.isbn10)-Number(b?.isbns?.[0]?.isbn10);
      default:
        return a.rank-b.rank;
    }
  });
  return data;
}