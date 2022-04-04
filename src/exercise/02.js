// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
function Greeting({initialName = ''}) {
  // extra credit 1
  function getInitialValue () {
   return  window.localStorage.getItem('name') ?? initialName;
  }
  const [name, setName] = React.useState(getInitialValue);

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

// extra credit 3
const useLocalStorageState = (key, defaultValue = '') => {
  function getInitialValue () {
    const currentValue = window.localStorage.getItem(key);
    return JSON.parse(currentValue ?? defaultValue);
  }
  const [value, setValue] = React.useState(getInitialValue);
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [value])
  return [value, setValue]
}

function GreetingCustomHook({initialName = ''}) {
  const [name, setName] = useLocalStorageState("name", initialName);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <>
    <Greeting />
    <GreetingCustomHook />
    </>
}

export default App
