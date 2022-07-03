export default (data: Object, payload: Object) => {
  if (!payload) return data;
  const audioBooks = [...payload].filter(book => !!book.tracks);
  return data.map(book => {
    const found = audioBooks.find((a) => book.isbn === a.isbn);
    return found || book;
  });
};
