import {useState} from 'react';
import Registrationtype from './Registrationtype';
import Basicregistration from './Basicregistration';

const  Registration = () => {
  const [typeFlag, setTypeFlag] = useState(0);
  
  const sendDataToParent = (index,data,otp) => { // the callback. Use a better name
   setTypeFlag(index);
   
  };
  return (
    <div className="App">
      {typeFlag === 0 && <Basicregistration sendDataToParent={sendDataToParent} />}
      {typeFlag  === 1 && <Registrationtype />}
    </div>
  );
}

export default Registration;
