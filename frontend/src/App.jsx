
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [compareProducts, setCompareProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOption, setSortOption] = useState('default')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/products')
        if (!response.ok) throw new Error('Failed to load products')
        setProducts(await response.json())
      } catch {
        setError('Unable to load products. Make sure the backend is running.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const search = searchTerm.trim().toLowerCase()

  const filteredProducts = products.filter((product) => {
    const name = (product.name || '').toLowerCase()
    const category = (product.category || '').toLowerCase()
    const description = (product.description || '').toLowerCase()

    const matchesSearch =
      !search ||
      (['phone', 'phones'].includes(search)
        ? category === 'smartphones'
        : `${name} ${category} ${description}`.includes(search))

    const matchesCategory =
      selectedCategory === 'All' ||
      category === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price
    if (sortOption === 'price-high') return b.price - a.price
    if (sortOption === 'rating-high') return b.rating - a.rating
    return 0
  })

  function handleCompare(product) {
    if (compareProducts.some((item) => item.id === product.id)) return

    if (compareProducts.length >= 2) {
      alert('You can compare only two products at a time.')
      return
    }

    setCompareProducts((current) => [...current, product])
  }

  function handleRemove(id) {
    setCompareProducts((current) =>
      current.filter((item) => item.id !== id)
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">ShopSmart</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#compare">Compare</a>
        </nav>
      </header>

      <main id="home" className="hero">
        <p className="tagline">SMART SHOPPING STARTS HERE</p>
        <h2>Compare Products.<br />Choose Smarter.</h2>
        <p className="description">
          Find the right product by comparing prices, ratings, and features in one place.
        </p>

        <div className="search-box">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for phones, headphones..."
            aria-label="Search products"
          />
          <button type="button" onClick={() => setSearchTerm(searchTerm.trim())}>
            Search
          </button>
          <button type="button" onClick={() => setSearchTerm('')}>
            Clear
          </button>
        </div>

        <p className="note">Your smarter way to shop begins here.</p>
      </main>

      <section id="products" className="products-section">
        <div className="section-heading">
          <p className="tagline">EXPLORE OUR COLLECTION</p>
          <h2>Popular Products</h2>
          <p>Discover products and compare their features.</p>
        </div>

        <div className="category-filters">
          {['All', 'Smartphones', 'Headphones'].map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? 'category-button active'
                  : 'category-button'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'All' ? 'All Products' : category}
            </button>
          ))}
        </div>

        <div className="sorting-controls">
          <label htmlFor="sort-products">Sort products:</label>
          <select
            id="sort-products"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="default">Default order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating-high">Rating: High to Low</option>
          </select>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="no-results">{error}</p>}

        {!loading && !error && (
          <>
            <div className="product-grid">
              {sortedProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-icon">
                    {product.category.toLowerCase() === 'smartphones'
                      ? '📱'
                      : '🎧'}
                  </div>

                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>

                  <div className="product-details">
                    <span className="product-price">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="product-rating">
                      ★ {product.rating}
                    </span>
                  </div>

                  <button
                    className="compare-button"
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Details
                  </button>

                  <button
                    className="compare-button"
                    type="button"
                    onClick={() => handleCompare(product)}
                  >
                    {compareProducts.some((item) => item.id === product.id)
                      ? 'Added to Compare'
                      : 'Compare Product'}
                  </button>
                </article>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <p className="no-results">
                No products found. Try another search or category.
              </p>
            )}
          </>
        )}

        {selectedProduct && (
          <div
            className="product-modal-overlay"
            onClick={() => setSelectedProduct(null)}
          >
            <section
              className="product-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="modal-close"
                type="button"
                aria-label="Close product details"
                onClick={() => setSelectedProduct(null)}
              >
                ×
              </button>

              <div className="product-icon">
                {selectedProduct.category.toLowerCase() === 'smartphones'
                  ? '📱'
                  : '🎧'}
              </div>

              <p className="product-category">{selectedProduct.category}</p>
              <h2 id="product-modal-title">{selectedProduct.name}</h2>

              <p className="modal-price">
                ₹{selectedProduct.price.toLocaleString('en-IN')}
              </p>

              <p className="product-rating">★ {selectedProduct.rating} / 5</p>

              <h3>Product Features</h3>
              <p>{selectedProduct.description}</p>

              <button
                className="compare-button"
                type="button"
                onClick={() => {
                  handleCompare(selectedProduct)
                  setSelectedProduct(null)
                }}
              >
                Compare This Product
              </button>
            </section>
          </div>
        )}

        <div id="compare" className="comparison-section">
          <h2>Compare Products</h2>

          {compareProducts.length === 0 ? (
            <p>Select products above to compare them.</p>
          ) : (
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    {compareProducts.map((product) => (
                      <th key={product.id}>{product.name}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {[
                    ['Category', (p) => p.category],
                    ['Price', (p) => `₹${p.price.toLocaleString('en-IN')}`],
                    ['Rating', (p) => `★ ${p.rating}`],
                    ['Features', (p) => p.description],
                  ].map(([label, getValue]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      {compareProducts.map((product) => (
                        <td key={product.id}>{getValue(product)}</td>
                      ))}
                    </tr>
                  ))}

                  <tr>
                    <td>Action</td>
                    {compareProducts.map((product) => (
                      <td key={product.id}>
                        <button
                          className="remove-button"
                          type="button"
                          onClick={() => handleRemove(product.id)}
                        >
                          Remove
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {compareProducts.length === 2 && (
            <div className="savings-insight">
              {compareProducts[0].price === compareProducts[1].price ? (
                <>
                  <h3>Same Price!</h3>
                  <p>
                    Both products cost ₹
                    {compareProducts[0].price.toLocaleString('en-IN')}.
                    Compare their ratings and features to decide.
                  </p>
                </>
              ) : (
                <>
                  <h3>Smart Savings Insight</h3>
                  <p>
                    Choose{' '}
                    {compareProducts[0].price < compareProducts[1].price
                      ? compareProducts[0].name
                      : compareProducts[1].name}{' '}
                    to pay less.
                  </p>
                  <p className="savings-amount">
                    You save ₹
                    {Math.abs(
                      compareProducts[0].price - compareProducts[1].price
                    ).toLocaleString('en-IN')}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default App
