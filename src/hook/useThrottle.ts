import { useRef } from "react";

type Callback = (...args: any[]) => any;
export default function useThrottle(fn:Callback, delay:number):Callback{
  let timer=useRef<NodeJS.Timeout|null>(null);
  return function(...args){
    if(!timer.current){
      timer.current=setTimeout(()=>{
        fn.apply(null,args);
        timer.current=null;
      },delay)
    }
  }
}