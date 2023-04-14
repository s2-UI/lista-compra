import { useState, useEffect } from 'react'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

import { FaPlus, FaTimes } from 'react-icons/fa'

function Item({ id, name, amounts }) {
  const [amount, setAmount] = useState(amounts)

  const handleAdd = () => {
    setAmount(amount + 1)
  }

  const handleRemove = () => {
    if (amount === 0) return

    setAmount(amount - 1)
  }

  useEffect(() => {
    async function updateAmount() {
      const itemRef = doc(db, 'productos', id)
      await updateDoc(itemRef, { amount })
    }
    updateAmount()
  }, [amount])

  return (
    <section className={`flex items-center gap-4 w-full py-2 px-4 border-b border-slate-50 ${amount == 0 ? 'bg-slate-200' : 'bg-green-200'}`}>
      <div className={`basis-3/5 whitespace-nowrap ${amount == 0 ? '' : ''}`}>{name}</div>
      <div className={`basis-1/5 text-center ${amount == 0 ? 'opacity-20' : 'font-semibold'}`}>{amount}</div>
      <section className='basis-1/5 flex justify-end gap-4'>
        <button
          className='px-4 border flex justify-center items-center bg-green-400 text-green-600 py-2 rounded-lg shadow-md'
          onClick={handleAdd}
        >
          <FaPlus />
        </button>
        <button
          className='px-4 border flex justify-center items-center bg-red-400 text-red-600 py-2 rounded-lg shadow-md'
          onClick={handleRemove}
        >
          <FaTimes />
        </button>
      </section>
    </section>
  )
}

export default Item