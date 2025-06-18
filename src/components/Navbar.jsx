import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-600 text-white py-2'>
        <ul className="flex gap-13 mx-10">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar