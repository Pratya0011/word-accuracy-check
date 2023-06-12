import {React, useState, useEffect} from 'react'
import './App.css';

function App() {
  const [input, setInput] = useState('')
  const [count, setCount] = useState(0)
  const [word, setWord] = useState('')
  const [showTemplate, setShowTemplate] = useState(false)
  const [accuracy, setAccuracy] = useState(0)
  const [change, setChange] = useState(false)
  const [counter, setCounter] = useState(10)
  const [start, setStart] = useState(false)

  const words = 'abcdefghijklmnopqrstuvxyz'
  useEffect(()=>{
    const timer = setInterval(() => {
      setCounter(counter-1)
    }, 1000);
    if(counter===0){
      setChange(true)
      clearInterval(timer)
      setShowTemplate(true)
    }
    if(showTemplate === true){
      clearInterval(timer)
    }
  },[counter, showTemplate])

  const onChangeHandler=(e)=>{
    setInput(e.target.value)
    if(input===word){
      setShowTemplate(true)
    }else{
      setShowTemplate(false)
    }
  }

  const myFunction=()=>{
    setCount(count+1)
    if(count>=14){
    let percentage = Math.round((14/count)*100);
    setAccuracy(percentage)
    }else{
      setAccuracy(0)
    }
  }

  const startTest=()=>{
    setStart(true)
    let letter = ''
    for(let i=0;i<12;i++){
      if(letter.length===4 || letter.length===9){
        letter = letter+' '+words.charAt(Math.floor(Math.random()*words.length))
      }else{
        letter+=words.charAt(Math.floor(Math.random()*words.length))
      }
    }
    setWord(letter)
  }
  return (
    <div className="App">
      <div className='container'>
        {start === false &&
        <button onClick={startTest}>Start</button>
        }
        {start === true &&
        <div>
        <div className='counter'>
          <div>{counter}</div>
        </div>
      <div>
        <p>{word}</p>
        <input onKeyDown={myFunction} value={input} onChange={onChangeHandler} disabled={change}/>
      </div>
      {showTemplate===true && 
      <div>
      <div>Accuracy: {accuracy}%</div>
      <button onClick={()=>{window.location.reload()}}>Try Again</button>
      </div>
      }
    </div>
    }
      </div>
    </div>
  );
}

export default App;
