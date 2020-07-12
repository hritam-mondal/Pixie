import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSucess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  )

  const preload = (categoryId) => {
      getCategory(categoryId).then((data) => {
          if(data.error){
              setError(data.error);
          }else{
              setName(data.name);
          }
      })
  }

  useEffect(() => {
      preload(match.params.categoryId);
  }, [])

  const handleChange = (event) => (
      setError(""),
      setName(event.target.value)
  )

  const onSubmit = (event) => {
      event.preventDefault();
      setError("");
      setSucess(false);

      updateCategory(user._id, match.params.categoryId, token, {name}).then((data) => {
        if(data.error){
            setError(true);
        }else{
            setError("");
            setSucess(true);
            setName("");
        }
      })
  }

  const successMessage = () =>{
    if(success) {
        return <h4 className="text-success">Category updated Successfully</h4>;
    }
  }

  const warningMessage = () =>{
    if(error) {
        return <h4 className="text-warning">Failed to update Category</h4>;
    }
}

    const myCategoryForm = () => {
        return(
            <form>
            <div className="form-group">
                <p className="lead">
                    Enter the Category
                </p>
                <input 
                type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For ex. Summer" 
                />
                <button 
                onClick={onSubmit}
                className="btn btn-outline-info">
                    Update Category
                </button>
            </div>
        </form>
           )
    }
    return (
        <Base
        className="container bg-info p-4">
           <div className="row rounded">
               <div className="col-md-8 offset-md-2 box">
                   {successMessage()}
                   {warningMessage()}
                   {myCategoryForm()}
                   {goBack()}
               </div>
           </div>
        </Base>
    );
};

export default UpdateCategory;