import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import "./ProductSlider.css";
import './styles.css'; 

const ProductsList = ({ hideCategory }) => {
  const [productlist, setProductlist] = useState([]);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10); // Change the number of items per page as needed

const [searchQuery, setSearchQuery] = useState('');
const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setProductlist(
      Array.from(JSON.parse(localStorage.getItem("productsPage")))
    );
  }, [selected]);

  const deleteHandler = (e) => {
    console.log(e.target.id);
    let obj = JSON.parse(localStorage.getItem("productsPage"));
    let productsData = Array.from(obj);

    let productsAfterDelete = productsData.filter(
      (item) => item.id !== e.target.id
    );
    obj =  productsAfterDelete;
    
   
    localStorage.setItem("productsPage", JSON.stringify(obj));

    setProductlist(
      Array.from(JSON.parse(localStorage.getItem("productsPage")))
    );
  };

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.id]);
    } else {
      selected.splice(selected.indexOf(e.target.id), 1);
      setSelected(selected);
    }
  };

  const selectedDeleteHandler = () => {
    let checkboxAfterDelete = productlist.filter(
      (item) => !selected.includes(item.id)
    );

    let obj = JSON.parse(localStorage.getItem("productsPage"));
    obj =  checkboxAfterDelete;
    
   

    localStorage.setItem("productsPage", JSON.stringify(obj));

    setProductlist(
      Array.from(JSON.parse(localStorage.getItem("productsPage")))
    );

    let selectedall = document.querySelectorAll("input[type=checkbox]:checked");
    for (let i = 0; i < selectedall.length; i++) {
      selectedall[i].checked = false;
    }
  };

  const addNewProduct = () => {
    hideCategory(false);
    setModal(true);
  };

  const addProductHandler = () => {
    let obj = JSON.parse(localStorage.getItem("productsPage"));
    console.log("before adding product:", obj);

    console.log({ id, name, role, email });

    if (
      id === "" ||
      name === "" ||
      role === "" ||
      email === ""
    ) {
      alert("Please enter all details for the employee.");
      return;
    }

    obj.push({
      id: id,
      name: name,
      role: role,
      email: email,
    });

    console.log("after adding product:", obj);

    localStorage.setItem("productsPage", JSON.stringify(obj));
    setProductlist(
      Array.from(JSON.parse(localStorage.getItem("productsPage")))
    );
    setModal(false);
  };

  const selectDeleteHandler = (e) => {
    e.preventDefault();
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = productlist.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toLowerCase().includes(query.toLowerCase()) ||
      item.email.toLowerCase().includes(query.toLowerCase()) ||
      item.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productlist.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
for (let i = 1; i <= Math.ceil(productlist.length / itemsPerPage); i++) {
  pageNumbers.push(i);
}
const renderPageNumbers = pageNumbers.map((number) => (
  <button
    key={number}
    onClick={() => setCurrentPage(number)}
    className={currentPage === number ? 'active' : ''} 
    
  >
    {number}
  </button>
));
  return (
    <>
      
      {!modal && (
        <div>
          <div
            className={[styles.addproductmodal, styles.tablebody].join(" ")}
            style={{ height: "430px" }}
          >
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {   
                   filteredItems.length > 0 ?
                   (filteredItems.map((item, i) => (
                    <tr key={i}>
                    <td id={i}>
                      <label className={styles.roundedCheckbox}>
                        <input type="checkbox" onChange={checkboxHandler} />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <i
                        className="far fa-trash-alt tm-product-delete-icon"
                        id={item.id}
                        onClick={deleteHandler}
                      ></i>
                    </td>
                  </tr>
                  ))
                   ):
                 (
                currentItems.map((item, i) => (
                  <tr key={i}>
                    <td id={i}>
                      <label className={styles.roundedCheckbox}>
                        <input type="checkbox" onChange={checkboxHandler} />
                        <span className={styles.checkmark}></span>
                      </label>
                    </td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <i
                        className="far fa-trash-alt tm-product-delete-icon"
                        id={item.id}
                        onClick={deleteHandler}
                      ></i>
                       <i
                        className="far fa-edit tm-product-edit-icon"
                        id={item.id}
                        
                      ></i>
                    </td>
                  
                  </tr>
                ))
                 )
                 }
                         
              </tbody>
            </table>
          </div>
          <button className="btn" onClick={addNewProduct}>
            Add New Employee
          </button>
          <button className="btn" onClick={selectedDeleteHandler} type="reset">
            Delete Selected Employee
          </button>
          
        </div>
      )}
      
      {modal && (
        <div className={styles.addproductmodal}>
          <h2>Add Employee</h2>

          <form onSubmit={selectDeleteHandler}>
              
            <label htmlFor="Id">Id</label>
            <input
              type="text"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />  
            
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <label htmlFor="Email">Email</label>
            <textarea
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></textarea>
            

            <label htmlFor="Role">Role</label>
            <input
              type="text"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            />

            <button className="btn" onClick={addProductHandler}>
              Add Employee
            </button>
          </form>
        </div>
      )}
      <div className="feature">
      <div className="pagination">
         PAGE NO - 
          {renderPageNumbers}
        </div>
        <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        />
        </div>
    </>
  );
};

export default ProductsList;
