import { useState } from 'react'
import { Link } from 'react-router-dom'

import Category from './Category'
// import axios from 'axios'

export default function Categories ({ categories, setCategories }) {

    const [show, setShow] = useState({})

    const handleShow = (idx) => {
        setShow({...show, [idx] : !show[idx]})
    }

    const categoryList = categories.map((category, idx) => {
        return (
            <div key={`category-${idx}`}>
                <button onClick={() => handleShow(idx)}>{category.name}</button>
                {show[idx] ? <Category  key={category.name} setCategories={setCategories} category={category} transactions={category.transactions} /> : null }
            </div>
        )
    })
    return (
        <>
            <h1>Budget</h1>
            {categoryList}
            <Link to='/new'>Add New Category or Transaction</Link>
        </>

    )
}