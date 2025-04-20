import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLengtht] = useState(8)  //useStatehook
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  //refhook
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() =>{
     let pass = ""
     let str = "abcdefghijklmnopqrstuvwxtz"
     if (numberAllowed) str += "0123456789"
     if(charAllowed) str += "!@$%^&*{}[]~`"

     for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)}
      setPassword(pass)},
      [length, numberAllowed, charAllowed, setPassword])

    const copyPasswordToClipboard = useCallback(() =>{
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0, 99);
      window.navigator.clipboard.writeText(Password)},[Password])

    //useEffecthook
  useEffect(()=>{
    passwordGenrator()}, 
    [length, numberAllowed,charAllowed,passwordGenrator])

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 bg-gray-700
   text-orange-400'>

   <h1 className='text-white text-center my-3'>Password password
    Genrator</h1>
      <div className='flex-shadow rounded-lg
       overflow-hidden mb-4'>

        <input
         type="text" 
         value={Password}
         className='outline-non w-full py-1 px-3 bg-white'
         placeholder='Password '
         readOnly
         ref={passwordRef}/>
         
         <button onClick={copyPasswordToClipboard}
         className='outline-none bg-blue-700 text-white
         px-3 py-0.5 shrink-0'>Copy</button>
        </div>

      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>

     <input 
      type="range" 
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e) =>{setLengtht(e.target.value)}}/>
     <label>Length:{length}</label>
     </div>

   <div className = "flex items-center gap-x-1">
   <input 
      type="checkBox" 
      defaultChecked={numberAllowed}
      id='numberInput'
      onChange={(e) =>{setNumberAllowed((prev) => !prev)}}/>
      <label htmlFor="numberInput">Numbers</label>
    </div>

   <div className = "flex items-center gap-x-1">
   <input 
      type="checkBox" 
      defaultChecked={charAllowed}
      id='characterInput'
      onChange={(e) =>
        {setCharAllowed((prev) => !prev)}}/>
      <label htmlFor="characterInput">Character</label>
   
   </div>
   </div>  
  </div>
    </>
  )
}

export default App
 