import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import ReviewProvider, { useReview } from '_providers/Review';
import { response_reviews } from '../../setup/faker-mocks';

describe('Review Provider tests', () => {
  test('fetch reviews', async () => {
    const wrapper = ({ children }) => <ReviewProvider>{children}</ReviewProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useReview(), { wrapper });
    act(() => {
      result.current.fetchReviews();
    });
    await waitForNextUpdate(); // TINKER WITH THIS
    expect(result.current.reviews.reviews.length).toEqual(response_reviews.length);
  });
});
