import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { useLocation } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Button,
  Box,
} from '@chakra-ui/react';

const ReviewForm = ({product, loggedInCustomer, onSubmit, customer_id }) => {
  // const location = useLocation();
  // const productId = location.state ? location.state.productId : null;
const navigate = useNavigate()
const enqueueSnackbar = useSnackbar()
  return (
    <Box p={4} boxShadow="md" rounded="md" bg="white" mx="auto" maxWidth="500px">
      <Formik
        initialValues={{ 
                review: '', 
                rating: 1, 
                customer_id: customer_id, 
                product_id: product.id
            }}
            
        onSubmit={(values, { resetForm }) => {
          const reviewData = {
            review: values.review,
            rating: values.rating,
            customer_id: values.customer_id,
            product_id: values.product_id,
          };
          
          fetch('/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
            credentials: 'include', // This line is crucial for sending and receiving cookies
          })
            .then((response) => {
              if (response.stus===201) {
                alert("Successful")
                enqueueSnackbar('Review Posted successfully', {variant: "success"});
                return response.json();
              } else {
                enqueueSnackbar('Failed to post review', {variant: "error"});
              }
            })
            .then((data) => {
              onSubmit(data);
              resetForm();
              navigate("/")
              
            })
            .catch((error) => {
              console.error('Error posting review:', error);
            });
        }}
      >
        <Form>
          <FormControl mb={4}>
            <FormLabel htmlFor="review">Review:</FormLabel>
            <Field
              as={Textarea}
              id="review"
              name="review"
              placeholder="Write your review here"
              size="sm"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="rating">Rating:</FormLabel>
            <Field as={Select} name="rating" id="rating" size="sm">
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </Field>
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Submit Review
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default ReviewForm;
