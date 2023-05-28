import { useState } from 'react'
import searchIcon from './search.svg'
import searchStyles from './searchBar.module.scss'
/* eslint-disable */
export function SearchBar() {
  const [input, setInput] = useState('')

  return (
      <div className={searchStyles.searchNav}>
        <form action="">
          <input
            type="text"
            onChange={(event) => setInput(event.target.value)} />
          <button type="search"><img src={searchIcon} alt="" /></button>
        </form>
      </div>
  )
}