import { Box, Text, Heading } from '@chakra-ui/react';
// import ReviewForm from './ReviewForm';
import { Link } from 'react-router-dom';

const Reviews = ({ reviews }) => {
  return (
    <Box p={4} fontSize="lg">
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        Product Reviews
      </Heading>
      {/* <ReviewForm /> */}
      {reviews.map((review) => (
        <Box
          key={review.id}
          border="1px"
          borderColor="gray.300"
          p={4}
          borderRadius="md"
          mt={4}
          boxShadow="md"
        >
          <Text fontSize="xl" fontWeight="bold">
            Review ID: {review.id}
          </Text>
          <Text>
            Customer ID: {review.customer_id}
          </Text>
          <Text>
            Product ID: {review.product_id}
          </Text>
          <Text>
            Rating: {review.rating}
          </Text>
          <Text>
            Review: {review.review}
          </Text>
          <Link to={`/reviews/${review.id}`}>
            <button className="view-review-button">
              View Review
            </button>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Reviews;
