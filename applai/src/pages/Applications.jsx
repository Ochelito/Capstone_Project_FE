import React from "react";
import AddApplicationButton from "./components/Buttons/AddApplicationButton";

function Applications() {
  return (
    <section>
        <h1>Add New Application</h1>
        <AddApplicationButton />
        <button>Save Application</button>
    </section>
    
    <section>
        <div>
            <h1>Applications</h1>
            <p>Track and manage your job applications</p>
        </div>
        <div>Search Applications</div>
        <div>Filter Applications</div>
        <div>Application List</div>  
    </section>
  );
}