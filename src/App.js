import logo from './logo.svg';
import './App.css';
import Products from "./components/Products";
import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {

  useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(
                "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json "
            );
            
            localStorage.setItem(
              "productsPage",
                JSON.stringify(response.data)
            );
        } catch (err) {
            console.log(err);
        }
    };
    getData();
}, []);

  return (
    <div className="App">

      <Products/>
    </div>
  );
}

export default App;
