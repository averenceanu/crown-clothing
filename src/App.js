import './categories.styles.scss'

function App() {
  
  const categories = [
    { 
      id: 1,
      title: 'Hats', 
     },
     { 
      id: 1,
      title: 'Jackets', 
     },
     { 
      id: 1,
      title: 'Sneakers', 
     },
     { 
      id: 1,
      title: 'Womens', 
     },
     { 
      id: 1,
      title: 'Mens', 
     },
  ]

  return (
    <div className="categories-container">
      {categories.map(({title}) => {  
        return (
          <div className="category-container">
            <div className="background-image"/>
            <div className="categor y-body-container"> 
              <h2> {title}</h2>
              <p>Shop Now</p>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
