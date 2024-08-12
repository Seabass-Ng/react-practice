import { ChangeEvent, useState } from 'react';
import './Bin2Dec.css';

const bin2Dec = (binary: string) => {
  let curVal = 0;
  for (let i = 0; i < binary.length; ++i) {
    if (['0', '1'].includes(binary.charAt(i))) {
      curVal = (curVal << 1) + parseInt(binary.charAt(i), 10);
    } else {
      throw 'invalid value';
    }
  }
  return curVal.toString();
};

const Bin2Dec = () => {
  const [binary, setBinary] = useState('');

  let dec = '';
  try {
    dec = bin2Dec(binary);
  } catch {
    dec = 'Invalid value. Binary only';
  }

  return (
    <div className="bin2Dec">
      <h3>
        Bin2Dec
      </h3>
      <div>
        <input
          type="text"
          inputmode="numeric"
          maxlength="8"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setBinary(e.target.value)}
          value={binary}
        />
      </div>
      <div>
        {dec}
      </div>
    </div>
  )
};

export default Bin2Dec;
