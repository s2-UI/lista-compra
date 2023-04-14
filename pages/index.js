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
      <h1 className='flex items-center justify-center p-4 font-bold uppercase text-2xl border-b border-green-500 bg-green-100'>
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

      <footer className='fixed bottom-0 w-full bg-slate-500 px-4 py-2 flex items-center z-10 gap-4'>
        <div className='basis-3/5'>
          <input
            className='bg-slate-50 flex items-center justify-center px-4 py-2 w-full rounded-lg shadow-md'
            type='text'
            placeholder='Nombre'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='basis-1/5'>
          <input
            className='bg-slate-50 flex items-center justify-center px-4 py-2 w-full rounded-lg shadow-md'
            type='number'
            placeholder='Cantidad'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className='basis-2/5'>
          <button
            className='bg-blue-400 flex items-center justify-center font-bold px-4 py-2 uppercase w-full rounded-lg shadow-md'
            onClick={handleAddToDb}
          >
            Añadir
          </button>
        </div>
      </footer>
    </main>
  )
}
