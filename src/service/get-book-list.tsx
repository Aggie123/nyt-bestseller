import { useEffect, useState } from "react";
import axios from "axios";

import {LOADINGSTATE,SortOptions, BookList, BookDetail} from '../type/index.d'

const SUCCESSSTATUS=200;

const BASE_URL='https://api.nytimes.com/svc/books/v3';
const API_KEY ='TCA6F3ERSCl405KagmGI7MIe8rn2bu2U'; // 这个暂时用明文，建议放在后端安全存储获取使用
// const LISTS='/lists.json?list=hardcover-fiction';
const LIST_BY_DATE='/lists/current/hardcover-fiction.json'
// const url=`${BASE_URL =}${LISTS}&api-key=${API_KEY}`; // 这个返回没有书的图片，放弃
const url=`${BASE_URL}${LIST_BY_DATE}?&api-key=${API_KEY}`;

export default function useGetBookList(sortValue:SortOptions=SortOptions.RANK, offset:number=0):{loading:LOADINGSTATE,data:BookList|null}{
  const [data, setData]=useState<BookList|null>(null);
  const [loading, setLoading] = useState<LOADINGSTATE>(LOADINGSTATE.INIT);

  useEffect(() => {
    axios.get(`${url}&offset=${offset}`)
    .then((response) =>{
      const {status, data} = response||{};
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