/**
 * @description: Image support lazy loading
 */
import React, { useEffect, useRef, useState } from "react";
import './book-item.css';

type Props = {
  url:string,
  height: number,
  width: number,
  title:string,
}

const LazyImg=(props: Props):JSX.Element=>{
  const [inView, setInView]=useState(false);
  const viewRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const currRef=viewRef.current as HTMLDivElement;
    const observer = new IntersectionObserver((entries, obs) =>{
      for(const entry of entries){
        if(entry.isIntersecting|| entry.intersectionRatio > 0){
          setInView(true);
          obs.unobserve(currRef);
        }
      }
    },{
      rootMargin: '100px',
      threshold: 0.15,
    });

    currRef&&observer.observe(currRef);

    return ()=>{
      currRef&&observer?.unobserve(currRef);
    }
  },[])

  return (
    <div ref={viewRef}>
      {inView 
      ? <img className="book-img" src={props?.url} alt={props?.title} width={props?.width} height={props?.height}/>
      :<img className="book-img-default" alt={props?.title} width={props?.width/3} />}
    </div>
  )
}

export default LazyImg;