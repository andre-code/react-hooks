// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(e) => setName((e.target.value))} />
    </div>
  )
}


function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={event => onAnimalChange(event.target.value)}
      />
    </div>
  )
}


function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

// extra credit 2
function DisplayColocatingState({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}


function App() {
  // const [name, setName] = React.useState('');
  const [animal, setAnimal] = React.useState('');
  return (
    <form>
      <Name/>
      <FavoriteAnimal animal={animal} onAnimalChange={setAnimal} />
      {/*<Display name={name} animal={animal} />*/}
      <DisplayColocatingState animal={animal} />
    </form>
  )
}

export default App
