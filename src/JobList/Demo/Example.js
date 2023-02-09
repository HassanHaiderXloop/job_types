import React, { useState } from 'react';

function Example() {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle Delete Button</button>
      <br />
      <br />
      <button disabled={isDisabled}>Delete</button>
    </div>
  );
}

export default Example;