import React, { useState } from "react";

const options=[{
  name: 'Rank',
  value:'1',
},{
  name: 'Tilte',
  value:'2',
},{
  name: 'Author',
  value:'3',
},{
  name: 'ISBN',
  value:'4',
}]

export default function SortPanel(){
  const [data,setData]=useState('');
  const onChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    console.log(e);
    setData(e.target.value);
  }
  return (
    <div className="sort-panel">
      <span>Sort by:</span>
      <select onChange={onChange} value={data}>
        {options.map(item=><option value={item.value}>{item.name}</option>)}
      </select>
    </div>
  )
}