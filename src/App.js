import './App.css';

import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Home from './components/pages/Home';
import Categories from './components/pages/Categories';
import New from './components/pages/New';
import Transaction from './components/pages/Transaction';



function App() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_BUDGET_API_URL+'/categories')
      .then(res => {
        setCategories(res.data)
      })
  },[])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact path='/'
            element={<Home />}
          />
          <Route
            path='/categories'
            element={<Categories categories={categories} setCategories={setCategories} />}
          />
          <Route
            path='/new'
            element={<New categories={categories} setCategories={setCategories} />}
          />
          <Route
            path='/transactions/:categoryId/:transactionId'
            element={<Transaction categories={categories} setCategories={setCategories} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
