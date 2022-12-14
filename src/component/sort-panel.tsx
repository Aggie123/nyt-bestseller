/**
 * @description: Sort Panel
 */
import React, { ChangeEventHandler } from "react";
import {SortOptions} from '../type/index.d';
import './sort-panel.css';

const options=[{
  name: 'Rank',
  value:SortOptions.RANK,
},{
  name: 'Tilte',
  value:SortOptions.TITLE,
},{
  name: 'Author',
  value:SortOptions.AUTHOR,
},{
  name: 'ISBN',
  value:SortOptions.ISNN,
}]

export default function SortPanel({onChange, value}:{onChange:ChangeEventHandler<HTMLSelectElement>, value:number}){
  return (
    <div className="sort-panel">
      <span>Sort by:</span>
      <select onChange={onChange} value={value} className="sort-panel-select">
        {options.map(item=><option value={item.value} key={item.value}>{item.name}</option>)}
      </select>
    </div>
  )
}