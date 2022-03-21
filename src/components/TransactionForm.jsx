export default function TransactionForm ({ hide, categories, transactionForm, setTransactionForm, submitTransaction }) {
    const categoryList = categories.map((category,idx) => {
        return <option key={idx} value={category._id}>{category.name}</option>
    })
    return (
        <form onSubmit={submitTransaction}>

        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" min='0' step='0.01'
            value={transactionForm.amount} 
            onChange={e => setTransactionForm({...transactionForm, amount: e.target.value})} 
        required />

        <label htmlFor="merchant">Merchant:</label>
        <input type="text" id="merchant" 
            value={transactionForm.merchant} 
            onChange={e => setTransactionForm({...transactionForm, merchant: e.target.value})} 
        required />

        <label htmlFor="note">Note:</label>
        <input type="text" id="note" 
            value={transactionForm.note} 
            onChange={e => setTransactionForm({...transactionForm, note: e.target.value})} 
        />

        {hide ? null: 
        <div>
            <label htmlFor="category">Choose a Category:</label>
            <select name="category" id="category">
                {categoryList}
            </select>
        </div>
        }

        <button type="submit">Submit</button>

    </form>
    )
}