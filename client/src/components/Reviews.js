import { Box, Text, Heading } from '@chakra-ui/react';
import ReviewForm from './PostReview';

const Reviews = ({ reviews, productId, onSubmit }) => {
  return (
    <Box p={4} fontSize={'lg'}>
      <Heading as="h1" size="xl">
        Product Reviews
      </Heading>
      <Text>
          <ReviewForm productId={productId} onSubmit={onSubmit} />
     </Text>
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
