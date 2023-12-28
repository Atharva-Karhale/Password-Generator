import { useState,useCallback,useEffect, useRef } from 'react'
import './App.css'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [isCopyButtonClicked, setIsCopyButtonClicked] = useState(false)

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let generatedPassword = ""
    let input = "QQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
    
    if (numberAllowed) input += "1234567890"
    if (charAllowed) input += "!@#$%^&*()_+{}:?><~[]';/.,-=`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*input.length + 1)

      generatedPassword += input.charAt(char)

    }


    setPassword(generatedPassword)

  }, [length, numberAllowed, charAllowed, password])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
    setIsCopyButtonClicked(true);
  }, [password])

  useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center text-xl my-3'>Passward Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mt-4 mb-8'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard} 
          className={`outline-none  text-white px-3 py-0.5 shrink-0 ${isCopyButtonClicked ?  'bg-slate-400' : 'bg-blue-700'}`}>{isCopyButtonClicked ? 'Copied!' : 'Copy'}</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='px-2'> Length: {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className='size-3'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }
              }
            />
            <label className='px-1 text-xs text-gray-400'>Numbers Allowed</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              className='size-3'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }
              }
            />
            <label className='px-1 text-xs text-gray-400'>Characters Allowed</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
