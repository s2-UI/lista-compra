import Item from '@/Components/Item'
import { useState, useEffect } from 'react'

import { collection, getDocs, addDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function Home() {
  const [products, setProduct] = useState([])

  const fetchPost = async () => {
    await getDocs(collection(db, 'productos')).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setProduct(newData)
    })
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const handleAddToDb = async () => {
    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        name: name,
        amount: amount,
      })
      console.log('Document written with ID: ', docRef.id)
      setName('')
      setAmount('')
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'productos'), () => {
      fetchPost()
    })
    return () => unsubscribe()
  }, [])

  return (
    <main className='container mx-auto'>
      <h1 className='flex items-center justify-center border-b border-green-500 bg-green-100 p-4 text-2xl font-bold uppercase'>
        Mercadona
      </h1>

      {products?.map(product => (
        <Item
          key={product.id}
          id={product.id}
          name={product.name}
          amounts={product.amount}
        />
      ))}

      <footer className='sticky bottom-0 z-10 flex w-full items-center gap-4 bg-slate-500 px-4 py-2'>
        <div className='basis-3/5'>
          <input
            className='flex w-full items-center justify-center rounded-lg bg-slate-50 px-4 py-2 shadow-md'
            type='text'
            placeholder='Nombre'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='basis-1/5'>
          <input
            className='flex w-full items-center justify-center rounded-lg bg-slate-50 px-4 py-2 shadow-md'
            type='number'
            placeholder='Cantidad'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className='basis-2/5'>
          <button
            className='flex w-full items-center justify-center rounded-lg bg-blue-400 px-4 py-2 font-bold uppercase shadow-md'
            onClick={handleAddToDb}
          >
            Añadir
          </button>
        </div>
      </footer>
    </main>
  )
}
