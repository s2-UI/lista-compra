import Item from '@/Components/Item'
import { useState, useEffect } from 'react'

import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '@/Components/Header'

export default function Home() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

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

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const handleNameFilter = e => {
    const value = e.target.value.toLowerCase()
    const filtered = products.filter(item => item.name.toLowerCase().includes(value))
    setFilteredProducts(filtered)
  }

  const uniqueCategories = [...new Set(products.map(product => product.category))]
  uniqueCategories.sort()

  return (
    <main className='container mx-auto'>
      <Header
        name={name}
        amount={amount}
        selectedCategory={selectedCategory}
        setName={setName}
        setAmount={setAmount}
        setSelectedCategory={setSelectedCategory}
        handleAddToDb={handleAddToDb}
        handleNameFilter={handleNameFilter}
      />

      {uniqueCategories.map(category => (
        <>
          <h2 className='px-4 pb-2 pt-4 font-semibold capitalize'>{category}</h2>
          {filteredProducts
            .filter(product => product.category === category)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ id, name, amount }) => (
              <Item
                key={id}
                id={id}
                name={name}
                amounts={amount}
              />
            ))}
        </>
      ))}
    </main>
  )
}
