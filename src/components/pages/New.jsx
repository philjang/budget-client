import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import TransactionForm from "../TransactionForm"
import CategoryForm from "../CategoryForm"

export default function New ({ categories, setCategories }) {

    const [categoryForm, setCategoryForm] = useState({
        name: '',
        max: '',
        description: ''
    })

    const [transactionForm, setTransactionForm] = useState({
        amount: '',
        merchant: '',
        note: ''
    })

    const newCategory = e => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BUDGET_API_URL+'/categories',categoryForm)
            .then(() => {
                setCategoryForm({
                    name: '',
                    max: '',
                    description: ''
                })
                return axios.get(process.env.REACT_APP_BUDGET_API_URL+'/categories')
            })
            .then(res => {
                setCategories(res.data)
            })
            .catch(console.log)
    }

    const newTransaction = e => {
        e.preventDefault()
        // console.log(e.target.category.value)
        axios.post(process.env.REACT_APP_BUDGET_API_URL+`/categories/${e.target.category.value}/transactions`, transactionForm)
        .then(() => {
            setTransactionForm({
                amount: '',
                merchant: '',
                note: ''
            })
            return axios.get(process.env.REACT_APP_BUDGET_API_URL+'/categories')
        })
        .then(res => {
            setCategories(res.data)
        })
        .catch(console.log)
    }

    return (
        <>
            <h3>Add a New Transaction</h3>
            <TransactionForm categories={categories} transactionForm={transactionForm} setTransactionForm={setTransactionForm} submitTransaction={newTransaction}/>
            <h3>Add a New Category</h3>
            <CategoryForm categoryForm={categoryForm} setCategoryForm={setCategoryForm} submitCategory={newCategory}/>
            <Link to='/categories'>Back to Budget</Link>
        </>
    )
}