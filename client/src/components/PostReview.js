import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Button,
  Box,
  Input,
} from '@chakra-ui/react';

const ReviewForm = ({ productId, customerId, onSubmit }) => {
  const initialValues = {
    review: '',
    rating: 1,
    customerId: '',
    productId: ''
  };

  const validationSchema = Yup.object({
    review: Yup.string().required('Review is required'),
    rating: Yup.number()
      .required('Rating is required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit({
      review: values.review,
      rating: values.rating,
      customer_id: customerId,
      product_id: productId,
    });
    resetForm();
  };

  return (
    <Box p={4} boxShadow="md" rounded="md" bg="white" mx="auto" maxWidth="500px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <ErrorMessage name="review" component="div" color="red" fontSize="sm" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="customerId">Customer Id:</FormLabel>
            <Field
              as={Input}
              id="customerId"
              name="customerId"
              placeholder="Write your customerId here"
              size="sm"
            />
            <ErrorMessage name="customerId" component="div" color="red" fontSize="sm" />

            </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="productId">Product Id:</FormLabel>
            <Field
              as={Input}
              id="productId"
              name="productId"
              placeholder="Write your productId here"
              size="sm"
            />
            <ErrorMessage name="productId" component="div" color="red" fontSize="sm" />
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
            <ErrorMessage name="rating" component="div" color="red" fontSize="sm" />
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
