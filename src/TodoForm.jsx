import { useState } from 'react'

export default function TodoForm({ onSubmit, t }) {
  const [item, setItem] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    
    if (item.trim() === "") return
    
    onSubmit(item)
    setItem("")
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">{t('newTask')}</label>
        <input
          value={item}
          onChange={e => setItem(e.target.value)}
          type="text"
          id="item"
          placeholder={t('whatNeedsDone')}
        />
      </div>
      <button className="btn">{t('add')}</button>
    </form>
  )
}