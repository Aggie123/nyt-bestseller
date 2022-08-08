import { useEffect, useState } from "react";
import axios from "axios";

import {LOADINGSTATE,SortOptions,BookData, BookList} from '../type/index.d'

const baseUrl ='https://api.nytimes.com/svc/books/v3';
const apiKey='TCA6F3ERSCl405KagmGI7MIe8rn2bu2U'; // TODO store key safely
const lists='/lists.json?list=hardcover-fiction';

const SUCCESSSTATUS=200;
const url=`${baseUrl}${lists}&api-key=${apiKey}`;
export default function useGetBookList(sortValue:SortOptions=SortOptions.RANK):{loading:LOADINGSTATE,data:BookList|null}{
  const [data, setData]=useState<BookList|null>(null);
  const [loading, setLoading] = useState<LOADINGSTATE>(LOADINGSTATE.INIT)
  // TODO: loading error info

  useEffect(() => {
    axios.get(url)
    .then((response) =>{
      const {status, data} = response;
      if(status!==SUCCESSSTATUS){
        setLoading(LOADINGSTATE.FAIL);
        setData(null);
      }else{
        setLoading(LOADINGSTATE.SUCCESS);
        const sortedData=sortBookList(data, sortValue);
        setData(()=>sortedData);
      }
    })
    
  },[sortValue])
  return {loading, data};
}

function sortBookList(data:BookList|null, sortValue:SortOptions):(BookList|null){
  data?.results?.sort((a:BookData,b:BookData):number=>{
    switch(sortValue){
      case SortOptions.RANK:
        return a.rank-b.rank;
      case SortOptions.TITLE:
        return a?.book_details?.[0].title.localeCompare(b?.book_details?.[0].title);
      case SortOptions.AUTHOR:
        return a?.book_details?.[0].author.localeCompare(b?.book_details?.[0].author);
      case SortOptions.ISNN:
        return Number(a?.book_details?.[0].primary_isbn13)-Number(b?.book_details?.[0].primary_isbn13);
    }
  });
  return data;
}