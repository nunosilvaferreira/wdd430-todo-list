import { useState } from 'react'

export default function TodoForm({ onSubmit }) {
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
        <label htmlFor="item">Nova Tarefa</label>
        <input
          value={item}
          onChange={e => setItem(e.target.value)}
          type="text"
          id="item"
          placeholder="O que precisas fazer?"
        />
      </div>
      <button className="btn">Adicionar</button>
    </form>
  )
}