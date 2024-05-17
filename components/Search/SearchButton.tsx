import {FC} from 'react';

interface props{
  label:string,
  onClick:(e:unknown)=>void;
}

const SearchButton:FC<props> = ({ label, onClick }) => {
  return (
    <button className='search-button' value={label} onClick={onClick}>{label}</button>
  );
}
  
export default SearchButton;
