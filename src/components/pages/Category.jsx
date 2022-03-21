import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import CategoryForm from '../CategoryForm'

export default function Category ({ setCategories, category, transactions}) {

    const [edit, setEdit] = useState(false)
    const [categoryInput, setCategoryInput] = useState({})

    useEffect(() => {
        setCategoryInput({
            name: category.name,
            max: category.max,
            description: category.description
        })
    },[edit])

    const handleEdit = () => {
        setEdit(!edit)
    }

    const editCategory = e => {
        e.preventDefault()
        axios.put(process.env.REACT_APP_BUDGET_API_URL+`/categories/${category._id}`, categoryInput)
            .then(() => {
                setEdit(!edit)
                return axios.get(process.env.REACT_APP_BUDGET_API_URL+'/categories')
            })
            .then(res => {
                setCategories(res.data)
            })
            .catch(console.log)
    }

    const deleteCategory = () => {
        axios.delete(process.env.REACT_APP_BUDGET_API_URL+`/categories/${category._id}`)
            .then(() => {
                console.log('category deleted')
                return axios.get(process.env.REACT_APP_BUDGET_API_URL+'/categories')
            })
            .then(res => {
                setCategories(res.data)
            })
            .catch(console.log)
    }

    const transactionList = transactions.map((transaction, idx) => {
        return (
            <li key={`transaction-${idx}`}>
                    <p>Merchant: {transaction.merchant}</p>
                    <p>Amount: {transaction.amount}</p>
                    <p>Note: {transaction.note}</p>
                    <p>Date: {transaction.date}</p>
                    <Link to={`/transactions/${category._id}/${transaction._id}`}>Edit Transaction</Link>
            </li>
        )
    })
    return (
        <>
            <button onClick={handleEdit}>{edit? 'Exit' : 'Edit'}</button>
            {edit ? 
                <div>
                    <CategoryForm categoryForm={categoryInput} setCategoryForm={setCategoryInput} submitCategory={editCategory}/>
                    <button onClick={deleteCategory}>Delete Category</button>
                </div> :
                <div>
                    <h4>{category.description}</h4>
                    <h5>Limit: {category.max}</h5>
                    <h4>Transactions:</h4>
                    <ul>
                        {transactionList}
                    </ul>
                </div>}
        </>
    )
}