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
    <header className='sticky top-0 z-10 flex w-full flex-col items-center gap-4 bg-slate-500 p-4'>
      <input
        className='flex w-full items-center justify-center rounded-lg bg-slate-50 px-4 py-2 shadow-md'
        type='text'
        placeholder='Nombre'
        value={name}
        onChange={e => {
          setName(e.target.value)
          handleNameFilter(e)
        }}
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
          <option value='aseo'>Aseo</option>
          <option value='bebida'>Bebida</option>
          <option value='carne'>Carne</option>
          <option value='congelados'>Congelados</option>
          <option value='embutidos'>Embutidos</option>
          <option value='empaquetados'>Empaquetados</option>
          <option value='pasta'>Pasta</option>
          <option value='verduras'>Verduras</option>
        </select>
      </div>
      <button
        className='flex w-full items-center justify-center rounded-lg bg-blue-400 px-4 py-2 font-bold uppercase shadow-md disabled:text-slate-50 disabled:opacity-20'
        onClick={handleAddToDb}
        disabled={name === '' || amount === '' || selectedCategory === ''}
      >
        Añadir
      </button>
    </header>
  )
}

export default Header
