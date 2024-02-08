import React, { useEffect, useState } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import './Mens.css'
import { Link } from "react-router-dom";

const Kids= () => {
  const [mensProducts, setMensProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Kids");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState(null);
  const [sortByPrice, setSortByPrice] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedAttributeValue, setSelectedAttributeValue] = useState(null);
  const [selectedAttributeKey, setSelectedAttributeKey] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/get-products"
        );
        const mensProducts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setMensProducts(mensProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  

  const filterResult = (categoryItem, attributeKey, attributeValue) => {
    setSelectedCategory("Kids"); // Always set to "Mens" regardless of the checkbox clicked
    setSelectedAttributeValue(attributeValue);
    setSelectedAttributeKey(attributeKey);

    // Reset price filter when category or attribute changes
    setSelectedPriceFilter(null);
    // Reset sorting when category or attribute changes
    setSortByPrice(null);

    if (attributeKey === "colors") {
      // Clear the brand filter when selecting colors
      setSelectedBrands([]);
      // Toggle the selected color
      setSelectedColors((prevColors) =>
        prevColors.includes(categoryItem)
          ? prevColors.filter((color) => color !== categoryItem)
          : [...prevColors, categoryItem]
      );
    } else if (attributeKey === "brand") {
      // Clear the color filter when selecting brands
      setSelectedColors([]);
      // Toggle the selected brand
      setSelectedBrands((prevBrands) =>
        prevBrands.includes(categoryItem)
          ? prevBrands.filter((brand) => brand !== categoryItem)
          : [...prevBrands, categoryItem]
      );
    }
  };

  const handleSortByPrice = (order) => {
    // Toggle between ascending and descending orders
    const newSortByPrice = sortByPrice === order ? null : order;
  
    // Reset selectedPriceFilter when the sorting order changes
    setSelectedPriceFilter(null);
  
    setSortByPrice(newSortByPrice);
  
    // Uncheck the other checkbox
    const otherCheckbox = order === "asc" ? "desc" : "asc";
    const otherCheckboxElement = document.querySelector(
      `input[type="checkbox"][value="${otherCheckbox}"]`
    );
    if (otherCheckboxElement) {
      otherCheckboxElement.checked = false;
    }
  };
  
  
  const getPriceFilterCondition = (product) => {
    if (!selectedPriceFilter) {
      return true; // No price filter selected, show all
    }

    const [minPrice, maxPrice] = selectedPriceFilter.split("-");
    const productPrice = parseFloat(product.price);

    return (
      !isNaN(productPrice) &&
      productPrice >= parseFloat(minPrice) &&
      productPrice <= parseFloat(maxPrice)
    );
  };

  const handlePriceFilterChange = (filter) => {
    if (selectedPriceFilter === filter) {
      // Clear the price filter if it's the same as the current filter
      setSelectedPriceFilter(null);
    } else {
      // Set the price filter
      setSelectedPriceFilter(filter);
    }
  };
  
 
  const filteredProducts = mensProducts
    .filter((product) => {
      return (
        product.category === selectedCategory &&
        (selectedColors.length === 0 ||
          selectedColors.includes(product.colors)) &&
        (selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand)) &&
        getPriceFilterCondition(product)
      );
    })
    .sort((a, b) => {
      if (sortByPrice === "asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortByPrice === "desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else {
        return 0;
      }
    });




  return (
    <div className="container-fluid fluid-product">
    
      <div className="row mt-5 mx-2" >
        <div className="col-md-2">
        
          <ul className="ul-filter-nav">
            <li>
           
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.length === 0}
                  onChange={() => filterResult("Kids")}
                />
                All
              </label>
            </li> <br />

            <li>
            <h3>Colors</h3>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Red")}
                  onChange={() => filterResult("Red", "colors", "Red")}
                />
                Red
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Blue")}
                  onChange={() => filterResult("Blue", "colors", "Blue")}
                />
                Blue
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Green")}
                  onChange={() => filterResult("Green", "colors", "Green")}
                />
                Green
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Yellow")}
                  onChange={() => filterResult("Yellow", "colors", "Yellow")}
                />
                Yellow
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Purple")}
                  onChange={() => filterResult("Purple", "colors", "Purple")}
                />
                Purple
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Orange")}
                  onChange={() => filterResult("Orange", "colors", "Orange")}
                />
                Orange
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Pink")}
                  onChange={() => filterResult("Pink", "colors", "Pink")}
                />
                Pink
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Brown")}
                  onChange={() => filterResult("Brown", "colors", "Brown")}
                />
                Brown
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Gray")}
                  onChange={() => filterResult("Gray", "colors", "Gray")}
                />
                Gray
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("Black")}
                  onChange={() => filterResult("Black", "colors", "Black")}
                />
                Black
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedColors.includes("White")}
                  onChange={() => filterResult("White", "colors", "White")}
                />
                White
              </label>
            </li>
            <br />
            <li>
            
            <h3>Brand</h3>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Levis")}
                  onChange={() => filterResult("Levis", "brand", "Levis")}
                />
                Levis
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Being Human")}
                  onChange={() =>
                    filterResult("Being Human", "brand", "Being Human")
                  }
                />
                Being Human
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Zara")}
                  onChange={() => filterResult("Zara", "brand", "Zara")}
                />
                Zara
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Forever 21")}
                  onChange={() =>
                    filterResult("Forever 21", "brand", "Forever 21")
                  }
                />
                Forever 21
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Gucci")}
                  onChange={() => filterResult("Gucci", "brand", "Gucci")}
                />
                Gucci
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("H&M")}
                  onChange={() => filterResult("H&M", "brand", "H&M")}
                />
                H&M
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Dior")}
                  onChange={() => filterResult("Dior", "brand", "Dior")}
                />
                Dior
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Calvin Klein")}
                  onChange={() =>
                    filterResult("Calvin Klein", "brand", "Calvin Klein")
                  }
                />
                Calvin Klein
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Ralph Lauren")}
                  onChange={() =>
                    filterResult("Ralph Lauren", "brand", "Ralph Lauren")
                  }
                />
                Ralph Lauren
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Versace")}
                  onChange={() => filterResult("Versace", "brand", "Versace")}
                />
                Versace
              </label>
            </li>
            <br />
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes("Chanel")}
                  onChange={() => filterResult("Chanel", "brand", "Chanel")}
                />
                Chanel
              </label>
            </li>
            <br />

            <h3>Price</h3>

     



          {/* ... */}
<li>
  <label>
    <input
      type="checkbox"
      onChange={() => handlePriceFilterChange("500-699")}
    />
    500-699
  </label>
</li><br />

{/* ... */}
<li>
  <label>
    <input
      type="checkbox"
      onChange={() => handlePriceFilterChange("700-899")}
    />
    700-899
  </label>
</li><br />

{/* ... */}
<li>
  <label>
    <input
      type="checkbox"
      onChange={() => handlePriceFilterChange("900-1099")}
    />
    900-1099
  </label>
</li><br />

{/* ... */}
<li>
  <label>
    <input
      type="checkbox"
      onChange={() => handlePriceFilterChange("1100-1999")}
    />
    1100-1999
  </label>
</li><br />

{/* ... */}
<li>
  <label>
    <input
      type="checkbox"
      onChange={() => handlePriceFilterChange("2000-2999")}
    />
    2000-2999
  </label>
</li><br />

{/* ... */}
<li>
  <label>
    <input
      type="checkbox"
      onChange={() => handlePriceFilterChange("3000-3999")}
    />
    3000-3999
  </label>
</li><br />

{/* ... */}
<li>
  <label>
    <input
      type="checkbox"
      onChange={() => handlePriceFilterChange("4000-4999")}
    />
    4000-4999
  </label>
</li><br />
{/* ... */}
           
          </ul>
        </div>

        <div className="col-md-10">
        <div style={{ float: "right" }}>
    <label htmlFor="sortByPrice">Sort by Price:</label>
    <select
      id="sortByPrice"
      style={{ padding: '10px' }}
      value={sortByPrice}
      onChange={(e) => handleSortByPrice(e.target.value)}
    >
      <option value="">Select</option>
      <option value="asc">Price Low to High</option>
      <option value="desc">Price High to Low</option>
    </select>
  </div>
          <br />
          <br />
          <br />
          <Row>
        
            {filteredProducts.map((product) => (
              <Col key={product._id} xs={12} md={2} className="item_col  mb-5">
                <Link to={`/kids/${product._id}`}>
                <div className="product-item">
                  {product.images[0] && (
                    <img
                      src={`data:image/jpeg;base64,${product.images[0]}`}
                      alt={`Product ${product._id}`}
                      className="product-image-mens1"
                    />
                  )}
                  <h3 className="title" style={{fontSize:'22px'}}>{product.title}</h3>
                  {/* <p className="description" style={{fontSize:'12px',maxWidth:'180px'}}>{product.description}</p> */}
                  <p className="price"b style={{fontSize:'12px'}}>INR {product.price}</p>
                </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
     
      
    </div>
  );
};

export default Kids;
