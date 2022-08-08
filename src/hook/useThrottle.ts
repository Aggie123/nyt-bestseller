import { useRef } from "react";

type Callback = (...args: any[]) => void;
export default function useThrottle(fn:Callback, delay:number):Callback{
  let timer=useRef<NodeJS.Timeout|null>(null);
  return function(...args){
    if(!timer.current){
      timer.current=setTimeout(()=>{
        fn.call(null,args);
        timer.current=null;
      },delay)
    }
  }
}