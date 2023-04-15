import { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { FaPlus, FaTimes } from 'react-icons/fa'
import styles from '@/styles/item.module.scss'

function Item({ id, name, amounts }) {
  const [amount, setAmount] = useState(parseInt(amounts))

  const handleAdd = () => {
    setAmount(amount + 1)
  }

  const handleRemove = () => {
    setAmount(amount === 0 ? 0 : amount - 1)
  }

  useEffect(() => {
    const updateAmount = async () => {
      await updateDoc(doc(db, 'productos', id), { amount })
    }
    updateAmount()
  }, [amount])

  return (
    <section className={`${styles.root} ${amount !== 0 ? styles.selected : ''}`}>
      <div className={styles.name}>{name}</div>
      <div className={`${styles.amount} ${amount !== 0 ? styles.selected : ''}`}>{amount}</div>
      <section className={styles.buttons}>
        <button
          className={styles.button}
          onClick={handleAdd}
        >
          <FaPlus />
        </button>
        <button
          className={`${styles.button} ${styles.button_red}`}
          onClick={handleRemove}
        >
          <FaTimes />
        </button>
      </section>
    </section>
  )
}

export default Item
