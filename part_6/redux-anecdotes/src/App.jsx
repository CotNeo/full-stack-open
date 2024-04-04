/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './App.css'

import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id} className="anecdote">
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => dispatch(voteAnecdote(anecdote.id))}
          />
        ))}

      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
