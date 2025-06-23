import Movie from '../domain/Movie';
import Cart from '../service/Cart';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test ('new movies being added to cart successfully', () => {
  const cart = new Cart();
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);

  cart.add(movie);
  expect(cart.items).toEqual([{id: 1010, name: "Sinners", price: 3900, year: 2025, country: "USA", slogan: 'All of us are sinners', genre: ['horor', 'musicle'], duration: 137}]);
});
