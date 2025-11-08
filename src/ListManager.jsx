import { useState } from 'react'

export default function ListManager({ 
  lists, 
  currentListId, 
  onListChange, 
  onAddList, 
  onDeleteList, 
  onRenameList 
}) {
  const [newListName, setNewListName] = useState("")
  const [editingListId, setEditingListId] = useState(null)
  const [editListName, setEditListName] = useState("")

  function handleAddList(e) {
    e.preventDefault()
    if (newListName.trim()) {
      onAddList(newListName)
      setNewListName("")
    }
  }

  function startEditing(list) {
    setEditingListId(list.id)
    setEditListName(list.name)
  }

  function handleRename(listId) {
    if (editListName.trim()) {
      onRenameList(listId, editListName)
    }
    setEditingListId(null)
    setEditListName("")
  }

  function cancelEditing() {
    setEditingListId(null)
    setEditListName("")
  }

  return (
    <div className="list-manager">
      <div className="lists-section">
        <h3>As Minhas Listas</h3>
        
        <form onSubmit={handleAddList} className="add-list-form">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Nova lista..."
            className="list-input"
          />
          <button type="submit" className="btn btn-small">+</button>
        </form>

        <div className="lists-container">
          {lists.map(list => (
            <div 
              key={list.id} 
              className={`list-item ${list.id === currentListId ? 'active' : ''}`}
            >
              <div className="list-content">
                {editingListId === list.id ? (
                  <input
                    type="text"
                    value={editListName}
                    onChange={(e) => setEditListName(e.target.value)}
                    onBlur={() => handleRename(list.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleRename(list.id)
                      if (e.key === 'Escape') cancelEditing()
                    }}
                    className="list-edit-input"
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={() => onListChange(list.id)}
                    className="list-select-btn"
                  >
                    <span className="list-name">{list.name}</span>
                    <span className="list-count">
                      ({list.todos.filter(t => !t.completed).length})
                    </span>
                  </button>
                )}
              </div>

              <div className="list-actions">
                {editingListId !== list.id && (
                  <>
                    <button 
                      onClick={() => startEditing(list)}
                      className="btn-icon"
                      title="Renomear"
                    >
                      ✏️
                    </button>
                    {lists.length > 1 && (
                      <button 
                        onClick={() => onDeleteList(list.id)}
                        className="btn-icon btn-danger"
                        title="Eliminar lista"
                      >
                        🗑️
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}