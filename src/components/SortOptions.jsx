import React, { useState } from 'react';
import expensesReducer from '../utils/expensesReducer';

const SortOptions = ({ dispatch }) => {
   const[sortBy, setSortBy] = useState("amount");
   const[order, setOrder] = useState("asc");

   const sort = () => {
     dispatch({
       type: 'sort',
       sortBy: sortBy,
       order: order
     });
   }
   return (
     <div className="sort">
         <span>
         Sort By:
           <select value={sortBy} onChange={ (e) => setSortBy(e.target.value)}>
             <option value="amount">Amount</option>
             <option value="name">Name</option>
             <option value="category">Category</option>
             <option value="date">Date</option>
           </select>
         </span>

         <span>
         Order:
           <select value={order} onChange={ (e) => setOrder(e.target.value)}>
             <option selected value="asc">Asc</option>
             <option value="desc">Desc</option>
           </select>
         </span>

         <span>
           <button onClick={ () => sort() } >Sort</button>
         </span>
     </div>
   );
};

export default SortOptions;
