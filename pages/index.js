import Item from '@/Components/Item'
import { useState, useEffect } from 'react'

import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Home() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'productos'), snapshot => {
      const newData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      const sortedData = newData.sort((a, b) => (a.category > b.category ? 1 : -1))
      setProducts(sortedData)
    })
    return () => unsubscribe()
  }, [])

  const handleAddToDb = async () => {
    if (name === '' || amount === '' || selectedCategory === '') return

    try {
      await addDoc(collection(db, 'productos'), { name, amount, category: selectedCategory })
      setName('')
      setAmount('')
      setSelectedCategory('')
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const uniqueCategories = {}

  return (
    <main className='container mx-auto'>
      <h1 className='flex items-center justify-center border-b border-green-500 bg-green-100 p-4 text-2xl font-bold uppercase'>
        Mercadona
      </h1>

      {products.map(({ id, name, amount, category }) => {
        if (!(category in uniqueCategories)) {
          uniqueCategories[category] = true
          return (
            <>
              <h2 className='px-4 pb-2 pt-4 font-semibold capitalize'>{category}</h2>
              <Item
                key={id}
                id={id}
                name={name}
                amounts={amount}
              />
            </>
          )
        } else {
          return (
            <Item
              key={id}
              id={id}
              name={name}
              amounts={amount}
            />
          )
        }
      })}

      <footer className='sticky bottom-0 z-10 flex w-full flex-col items-center gap-4 bg-slate-500 px-4 py-2'>
        <input
          className='flex w-full items-center justify-center rounded-lg bg-slate-50 px-4 py-2 shadow-md'
          type='text'
          placeholder='Nombre'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className='flex gap-4'>
          <input
            className='flex w-full items-center justify-center rounded-lg bg-slate-50 px-4 py-2 shadow-md'
            type='number'
            placeholder='Cantidad'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <select
            className='flex basis-1/5 items-center justify-center rounded-lg bg-slate-50 px-4 py-2 shadow-md'
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value=''>Seleccionar categoría</option>
            <option value='empaquetados'>Empaquetados</option>
            <option value='bebida'>Bebida</option>
            <option value='verduras'>Verduras</option>
            <option value='embutidos'>Embutidos</option>
            <option value='pasta'>Pasta</option>
            <option value='aseo'>Aseo</option>
          </select>
        </div>
        <button
          className='flex w-full items-center justify-center rounded-lg bg-blue-400 px-4 py-2 font-bold uppercase shadow-md disabled:text-slate-50 disabled:opacity-20'
          onClick={handleAddToDb}
          disabled={name === '' || amount === ''}
        >
          Añadir
        </button>
      </footer>
    </main>
  )
}
