import { postRatingandReviewP2P } from "@/service/storageService";
import { getUserId } from "@/util/common";
import { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Loader from "../Loader";

const RateReviewModal = ({propertyId}) => {

  const [showModal, setShowModal] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [loader , setLoader] = useState(false)

  const handleSubmitReview = async(e) => {
    e.preventDefault();
    setLoader(true)
    if (!newComment.trim() || newRating === 0) {
      setError("Please provide your name, a comment, and a rating.");
      return;
    }

    const data ={
     "applicationUserId": getUserId(), 
      "propertyId": propertyId?.propertyId,  
     "rating": newRating, 
      "comment": newComment
    }

    const res = await postRatingandReviewP2P(data)
    if(res.success){
        setNewRating(0);
        setNewComment("");
        setError("");
        setShowModal(false);
        setLoader(false)
    }else{
      setLoader(false)
    }

   
  };

  return (
    <div className="w-[50%]">
      {/* Reviews List */}
      <Button
        onClick={() => setShowModal(true)}
        disabled={propertyId?.isRated}
        className="mt-1 w-[100%] bg-blue-600 text-white px-2 md:px-4 py-1.5 text-[10px] md:text-[14px] rounded-lg hover:bg-blue-700 transition-colors"
      >
      {propertyId?.isRated?"Rated": "Rate us"}
      </Button>

      {/* Review Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setError("");
          setNewRating(0);
          setNewComment("");
        }}
        centered
      >
        <Modal.Body>
          <Form onSubmit={handleSubmitReview} className="space-y-4">
            {/* User Name */}
            {/* <Form.Group>
              <Form.Label className="text-gray-700">Your Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="Enter your name"
                className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </Form.Group> */}

            {/* Rating Stars */}
            <Form.Group>
              <Form.Label className="text-gray-700 font-semibold">Rate This Property</Form.Label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className={`cursor-pointer text-lg ${
                        ratingValue <= (hoverRating || newRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => setNewRating(ratingValue)}
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${ratingValue} star${ratingValue > 1 ? "s" : ""}`}
                    />
                  );
                })}
              </div>
            </Form.Group>

            {/* Comment */}
            <Form.Group>
              <Form.Label className="text-gray-700 font-semibold">Write Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your review here"
                className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </Form.Group>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-t-0">
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitReview}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
           {loader ?(<>Submitting <Spinner size="sm"/></>) :("Submit Review")}
          </Button>
        </Modal.Footer>
      </Modal>
    
    </div>
  );
};

export default RateReviewModal;