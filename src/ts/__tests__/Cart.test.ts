import Book from '../domain/Book';
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

test ('total sum without discount is counted correctly', () => {
  const cart = new Cart();
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(movie);
  cart.add(book);

  const totalSumWithoutDiscount = cart.getTotalSumWithoutDiscount();
  expect(totalSumWithoutDiscount).toBe(5900);

});

test ('total sum is counted correctly', () => {
  const cart = new Cart;
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(movie);
  cart.add(book);

  const totalSum = cart.getTotalSum(20);
  expect(totalSum).toBe(4720);

});

test('item is deleted from cart successfully', () => {
  const cart = new Cart;
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(movie);
  cart.add(book);

  cart.deleteItem(1010);
  expect(cart.items.length).toBe(1);
})
