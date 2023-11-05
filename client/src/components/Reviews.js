import { Box, Text, Heading } from '@chakra-ui/react';
import ReviewForm from './ReviewForm';

const Reviews = ({ reviews }) => {
  return (
    <Box p={4} fontSize={'lg'}>
      <Heading as="h1" size="xl">
        Product Reviews
      </Heading>
      <ReviewForm  />
      {reviews.map((review) => (
        <Box
          key={review.id}
          border="1px"
          borderColor="gray.300"
          p={4}
          borderRadius="md"
          mt={4}
        >
          <Text>
            Id: {review.id}
          </Text>
          <Text>
            Customer Id: {review.customer_id}
          </Text>
          <Text>
            Product Id: {review.product_id}
          </Text>
          <Text>
            Rating: {review.rating}
          </Text>
          <Text >
            Review: {review.review}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default Reviews;
