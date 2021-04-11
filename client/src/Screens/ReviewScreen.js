import React, { useState } from "react";
//mock data
import data from "../Components/Reviews/data.json";
//components
//import Header from "./Header";
import ReviewList from "../Components//Reviews/ReviewList";
import ReviewForm from "../Components/Reviews/ReviewForm";
import Rating from "@material-ui/lab/Rating";

function ReviewScreen() {
    //I need to be able to acess the books at this point

  const [reviewList, setReviewList] = useState(data);

  const addReview = (
    titleInput,
    commenterInput,
    ratingInput,
    contentInput,
    anonymousInput
  ) => {
    let copy = [...reviewList];
    copy = [
      ...copy,
      {
        id: reviewList.length + 1,
        title: titleInput,
        commenter: commenterInput,
        rating: ratingInput,
        content: contentInput,
        anonymous: anonymousInput
      }
    ];
    //at this point I have to be able to push back the new data into the array
    //or moreso from the backend
    setReviewList(copy);
    console.log(JSON.stringify(copy));
  };
  return (
    <div className="ReviewScreen">
      <h1>Add a Review</h1>
      <ReviewForm addReview={addReview} />    
      <h1>Reviews List</h1>
    <ReviewList reviewList={reviewList} />
    </div>
  );
}

export default ReviewScreen;
