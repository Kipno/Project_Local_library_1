function findAuthorById(authors, id) {
  let authorAndId = authors.find((writer) => writer.id === id)
  return authorAndId;
}

function findBookById(books, id) {
  let bookAndId = books.find((book) => book.id === id)
  return bookAndId;
}

function partitionBooksByBorrowedStatus(books) {
  let returnedBooks = books.filter((book) => book.borrows && book.borrows[0].returned);
  let borrowedBooks = books.filter((book) => !book.borrows || !book.borrows[0].returned);
  return [borrowedBooks, returnedBooks];
}
// should return account objects
// objects should be from the id's that are in the borrows array
// accounts on the object should now include an addiontonal properity "returned:t/f"
function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const borrowsInfo=borrows.reduce((accumulator,borrow)=>{
    let idInfo = borrow.id;
    const accountInfo = accounts.find((account) => account.id == idInfo);
    const { id, ...others } = accountInfo;
    const accountUpdate = { id, returned: borrow.returned, ...others };
    accumulator.push(accountUpdate);
    return accumulator;
  },[])

  return borrowsInfo.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
