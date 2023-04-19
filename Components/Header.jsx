import styles from '@/styles/header.module.scss'

function Header({
  name,
  amount,
  selectedCategory,
  setName,
  setAmount,
  setSelectedCategory,
  handleAddToDb,
  handleNameFilter,
}) {
  return (
    <header className={styles.root}>
      <div className='flex gap-4 w-full'>
        <input
          className={styles.input}
          type='text'
          placeholder='Nombre'
          value={name}
          onChange={e => {
            setName(e.target.value)
            handleNameFilter(e)
          }}
        />
        <input
          className={`${styles.input} basis-2/5`}
          type='number'
          placeholder='Cantidad'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>


      <div className='flex gap-4 w-full'>
        <select
          className={`${styles.select} basis-3/5`}
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value=''>Seleccionar categoría</option>
          <option value='aseo'>Aseo</option>
          <option value='bebida'>Bebida</option>
          <option value='carne'>Carne</option>
          <option value='congelados'>Congelados</option>
          <option value='embutidos'>Embutidos</option>
          <option value='empaquetados'>Empaquetados</option>
          <option value='pasta'>Pasta</option>
          <option value='verduras'>Verduras</option>
        </select>
        <button
          className={`${styles.button} basis-2/5`}
          onClick={handleAddToDb}
          disabled={name === '' || amount === '' || selectedCategory === ''}
        >
          Añadir
        </button>
      </div>
    </header>
  )
}

export default Header
