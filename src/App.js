import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import { LC, SC, UC , NC } from './Data/PassChar';
import Footer from './Data/Footer';

function App() {

  const [isCopied, setIsCopied] = useState(false);

  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [number, setNumber] = useState(false);
  let [symbol, setSymbol] = useState(false);
  
  let [passLength, setPassLength] = useState(10)

  let [fpass , setPass] = useState('')



  let createPassword=()=>{
    let finalPass = '';
    let charSet = '';
    if(uppercase || lowercase || number || symbol){
      if(uppercase) charSet+=UC;
      if(lowercase) charSet+=LC;
      if(number) charSet+=NC;
      if(symbol) charSet+=SC;
      for(let i=0;i<passLength;i++){
        finalPass += charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
       setPass(finalPass)
       toast.success("Password generated succesfully")
      
    }
    else{
      toast.warn("Please select atleast one checkbox")
    }

  }


  let copy=()=>{
    if(fpass==''){
      toast.warn("Password field is empty")
    }
    else{
       navigator.clipboard.writeText(fpass).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000); 
      toast.success("!!!Password copied!!!")
    })
    .catch(err => console.error("Failed to copy text: ", err));
     }
    }
   


  return (
    <div className="App">

      <ToastContainer />
      <div className='wrapper'>
        <div className='div3'>
          <h2>PASSWORD GENERATOR</h2>
          </div>

          <div className='div1'>
            <input className='input' type="text" readOnly value={fpass}  />
            <button className='button-85' onClick={copy}>{isCopied ?   'Copied!' : "Copy"}</button>
          </div>

          <div className='div1'>
            <p>PASSWORD LENGTH</p>
            <input className='Length' type="number" value={passLength} max={20} min={10} onChange={(event)=>setPassLength(event.target.value)} />
          </div>


          <div className='div1'>
            <p className='para'>INCLUDE UPPERCASE</p>
            <input className='check' type="checkbox" checked={uppercase} onChange={()=>setUppercase(!uppercase)} />
          </div>
          
          <div className='div1'>
            <p  className='para'>INCLUDE SMALLCASE</p>
            <input className='check' type="checkbox"  checked={lowercase} onChange={()=>setLowercase(!lowercase)} />
          </div>

          <div className='div1'>
            <p  className='para'>INCLUDE NUMBERS</p>
            <input className='check' type="checkbox"  checked={number} onChange={()=>setNumber(!number)} />
          </div>

          <div className='div1'>
            <p  className='para'>INCLUDE SYMBOLS</p>
            <input className='check' type="checkbox"  checked={symbol} onChange={()=>setSymbol(!symbol)} />
          </div>

          <div>
            <button className='button-88' onClick={createPassword}>GENERATE PASSWORD</button>
          </div>

      </div>
      <Footer />
    </div>
  );
}

export default App;
