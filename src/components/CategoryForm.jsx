export default function CategoryForm ({categoryForm, setCategoryForm, submitCategory}) {
    return (
        <form onSubmit={submitCategory}>

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" 
                value={categoryForm.name} 
                onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} 
            required />

            <label htmlFor="max">Limit:</label>
            <input type="number" id="max" min='0'
                value={categoryForm.max} 
                onChange={e => setCategoryForm({...categoryForm, max: e.target.value})} 
            required />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" 
                value={categoryForm.description} 
                onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} 
            />

            <button type="submit">Submit</button>

        </form>
    )
}