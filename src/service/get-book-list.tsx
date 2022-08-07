import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

import {LOADINGSTATE,BookList} from '../type'

const baseUrl ='https://api.nytimes.com/svc/books/v3';
const apiKey='TCA6F3ERSCl405KagmGI7MIe8rn2bu2U'; // TODO store key safely
const allList='/lists/names.json';
const lists='/lists.json?list=hardcover-fiction';
// const subUrl='lists/current/paperback-nonfiction.json'

const SUCCESSSTATUS=200;
export default function useGetBookList():{loading:LOADINGSTATE,data:BookList|null}{
  const [data, setData]=useState(null);
  const [loading, setLoading] = useState(LOADINGSTATE.INIT)
  // TODO: loading error info

  useEffect(() => {
    // axios.get(`${baseUrl}${allList}?&api-key=${apiKey}`)
    axios.get(`${baseUrl}${lists}&api-key=${apiKey}`)
    .then((response) =>{
      const {status, data} = response;
      if(status!==SUCCESSSTATUS){
        setLoading(LOADINGSTATE.FAIL);
        setData(null);
      }else{
        setLoading(LOADINGSTATE.SUCCESS);
        setData(data);
      }
      console.log('res',response,loading)
    })
    
  },[])
  return {loading, data};
}