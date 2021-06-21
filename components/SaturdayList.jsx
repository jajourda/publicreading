import React from 'react';
import PropTypes from 'prop-types';

const SaturdayList = props => {
    return (
        <div>
           <ul>
               {
                   readings.map((item,i)=>{
                       return(
                           <li>
                               {item.start.toString()}
                           </li>
                       )
                   })
               }
               </ul> 
        </div>
    );
};

SaturdayList.propTypes = {
    readings: PropTypes.array.isRequired
};

export default SaturdayList;