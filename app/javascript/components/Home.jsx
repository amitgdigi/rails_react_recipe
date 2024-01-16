import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  const handleLogOut = () => {
    const url = "user/sign_out";
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'DELETE',
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        // Handle successful logout
        window.location.href = '/user/sign_in'; // Manually navigate to the sign-in page
      } else {
        throw new Error('Network response was not ok.');
      }
    })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Food Recipes</h1>
          <p className="lead">
            A curated list of recipes for the best homemade meal and delicacies.
          </p>
          <hr className="my-4" />
          <Link
            to="/recipes"
            className="btn btn-lg custom-button"
            role="button"
          >
            View Recipes
          </Link>

          <Link
            to="/face-auth"
            className="btn btn-lg custom-button"
            role="button"
          >
            Test Face authorization
          </Link>


          <button
            onClick={handleLogOut}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home