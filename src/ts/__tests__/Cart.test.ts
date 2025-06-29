import Book from '../domain/Book';
import Movie from '../domain/Movie';
import MusicAlbum from '../domain/MusicAlbum';
import Cart from '../service/Cart';

test('new card should be empty', () => {
  const cart = new Cart();
  expect(cart.items.length).toBe(0);
});

test ('items being added to cart successfully', () => {
  const cart = new Cart();
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(book, 4);

  expect(cart.items).toEqual([{
    item: {id: 1001, name: 'War and Piece', author: 'Leo Tolstoy', price: 2000, pages: 1225, increasable: true},
    count: 4
  }]);
});

test ('unincreasable items being added to cart once', () => {
  const cart = new Cart();
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);

  cart.add(movie, 3);

  expect(cart.items).toEqual([{
    item: {id: 1010, name: "Sinners", price: 3900, year: 2025, country: "USA", slogan: 'All of us are sinners', genre: ['horor', 'musicle'], duration: 137, increasable: false},
    count: 1
  }]);
});

test ('total sum without discount is counted correctly', () => {
  const cart = new Cart();
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(movie);
  cart.add(book, 3);

  const totalSumWithoutDiscount = cart.getTotalSumWithoutDiscount();
  expect(totalSumWithoutDiscount).toBe(9900);

});

test ('total sum is counted correctly', () => {
  const cart = new Cart;
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(movie);
  cart.add(book, 3);

  const totalSum = cart.getTotalSum(20);
  expect(totalSum).toBe(7920);

});

test('item is deleted from cart successfully', () => {
  const cart = new Cart;
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(movie);
  cart.add(book);

  cart.deleteItem(1010);
  expect(cart.items.length).toBe(1);
});

test ('impossible to increase unincreasable items in cart', () => {
  const cart = new Cart;
  const movie = new Movie(1010, 'Sinners', 3900, 2025, 'USA', 'All of us are sinners', ['horor', 'musicle'], 137);

  cart.add(movie);
  cart.increaseCount(1010);
  expect(cart.items[0].count).toBe(1);
});

test ('increasable items in cart are increased successfully', () => {
  const cart = new Cart;
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(book);
  cart.increaseCount(1001);
  expect(cart.items[0].count).toBe(2);
});

test ('items in cart are decreased successfully', () => {
  const cart = new Cart;
  const book = new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225);

  cart.add(book, 2);
  cart.decreaseCount(1001);
  expect(cart.items[0].count).toBe(1);
});

test ('items in cart are being auto-deleted after decreasing singular items', () => {
  const cart = new Cart;
  const musicAlbum = new MusicAlbum(1234, 'BOLSHIE KURTKI', 'Saluki', 6900);

  cart.add(musicAlbum);
  cart.decreaseCount(1234);
  expect(cart.items.length).toBe(0);
});

test ('impossible to increase non-existing item', () => {
  const cart = new Cart;
  expect(() => cart.increaseCount(1234)).toThrow('Товар с ID 1234 не найден в корзине');
});


