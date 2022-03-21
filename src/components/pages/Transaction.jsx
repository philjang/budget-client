import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import TransactionForm from '../TransactionForm'

export default function Transaction ({ categories, setCategories }) {
    let navigate = useNavigate()
    const { categoryId, transactionId } = useParams()

    const foundCategory = categories.find((category => category._id === categoryId))
    const foundTransaction = foundCategory.transactions.find((transaction => transaction._id === transactionId))
    // console.log(foundCategory, foundTransaction)

    const [transactionForm, setTransactionForm] = useState({
        amount: '',
        merchant: '',
        note: '',
    })
    const [hide, setHide] = useState(true)

    useEffect(()=>{
        setTransactionForm({
            amount: foundTransaction.amount,
            merchant: foundTransaction.merchant,
            note: foundTransaction.note
        })
    },[])
        
    const editTransaction = (e) => {
        e.preventDefault()
        axios.put(process.env.REACT_APP_BUDGET_API_URL+`/transactions/${transactionId}`, transactionForm)
        .then((response) => {
            // console.log(response.data)
            return axios.get(process.env.REACT_APP_BUDGET_API_URL+'/categories')
        })
        .then(res => {
            setCategories(res.data)
            navigate('/categories')
        })
        .catch(console.log)
    }

    const deleteTransaction = () => {
        axios.delete(process.env.REACT_APP_BUDGET_API_URL+`/transactions/${transactionId}`)
            .then(() => {
                console.log('transaction deleted')
                return axios.get(process.env.REACT_APP_BUDGET_API_URL+'/categories')
            })
            .then(res => {
                setCategories(res.data)
                navigate('/categories')
            })
            .catch(console.log)
    }
    return (
        <>
            <h1>Editing Transaction</h1>
            <TransactionForm categories={categories} transactionForm={transactionForm} setTransactionForm={setTransactionForm} submitTransaction={editTransaction} hide={hide} />
            <button onClick={deleteTransaction}>Delete Transaction</button>
        </>
    )
}