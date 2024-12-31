import React from 'react';
import loading from './loader.gif';    // import the loading gif

const Spinner = () => {
  return (
    <div className='text-center'>
          <img src={loading} alt="Loading" />
    </div>
  );
}
export default Spinner;