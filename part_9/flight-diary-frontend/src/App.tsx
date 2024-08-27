import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { Weather, Visibility, DiaryEntry, NewDiaryEntry } from './types'
import { getAllDiaryEntry, createDiaryEntry } from './diaryService'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({
    date: '',
    visibility: Visibility.Good,
    weather: Weather.Sunny,
    comment: '',
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllDiaryEntry().then((data) => {
      setEntries(data)
    })
  }, [])

  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const data = await createDiaryEntry(newDiaryEntry)

      setEntries(entries.concat(data))

      setNewDiaryEntry({
        date: '',
        visibility: Visibility.Good,
        weather: Weather.Sunny,
        comment: '',
      })

      setError(null)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Axios Error')

        setError(error.response?.data)

        console.log(error.status)
        console.log(error.response?.data)
      } else {
        setError('Unknown Error')

        console.log('Unknownun Error')
        console.log(error)
      }
    }
  }

  return (
    <>
      <header>
        <h1>Diary App</h1>
      </header>

      <main>
        <section>
          <h2>Add New Entry</h2>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={addDiaryEntry}>
            <div>
              <label htmlFor="date">Date: </label>
              <input
                type="text"
                id="date"
                required
                value={newDiaryEntry.date}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    date: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="visibility">Visibility: </label>
              <input
                type="text"
                id="visibility"
                required
                value={newDiaryEntry.visibility}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    visibility: event.target.value as Visibility,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="weather">Weather: </label>
              <input
                type="text"
                id="weather"
                required
                value={newDiaryEntry.weather}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    weather: event.target.value as Weather,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="comment">Comment: </label>
              <input
                type="text"
                id="comment"
                required
                value={newDiaryEntry.comment}
                onChange={(event) =>
                  setNewDiaryEntry({
                    ...newDiaryEntry,
                    comment: event.target.value,
                  })
                }
              />
            </div>

            <br />
            <button type="submit">Add</button>
          </form>
        </section>

        <section>
          <h2>Diary Entries</h2>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <b>{entry.date}</b> <br />
                <span>{`visibility: ${entry.visibility}`}</span> <br />
                <span>{`weather: ${entry.weather}`}</span> <br />
                <p>{entry.comment}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
