/*function getTotalBooksCount(books) {
  let totalBooks = books.reduce((book, index) => book + index.id, 0)
  return totalBooks;
}*/
function getTotalBooksCount(books) {
  return books.length;
}
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = [];
  const returned = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows && books[i].borrows[0].returned) {
      returned.push(books[i]);
    } else {
      borrowed.push(books[i]);
    }
  }
  return borrowed.length;
}

function getMostCommonGenres(books) {
  let commonBooks = [];
  console.log(typeof books);
  books.forEach((book) => {
    let genre = book.genre;
    const findBookGenre = commonBooks.find((item) => item.name === genre);
    if (!findBookGenre) {
      const name = genre;
      let count = 1;
      const thisGenre = { name, count };
      commonBooks.push(thisGenre);
    } else {
      findBookGenre.count++;
    }
  });
  commonBooks.sort((itemA, itemB) => itemB.count - itemA.count);
  return commonBooks.slice(0, 5);
}

function getMostPopularBooks(books) {
  let result = [];
  books.forEach((book) => {
    let name = book.title;
    if (book.borrows) {
      const count = book.borrows.length;
      result.push({ name, count });
    }
  });
  result.sort((itemA, itemB) => itemB.count - itemA.count);
  return result.slice(0, 5);
}
function getBooksBorrowsCount(books){
  let result=books.reduce((accumulator,{authorId,borrows})=>{
    let counts;
    if(borrows){
      counts=borrows.length;
      accumulator.push({name:authorId,count:counts})
    }
    return accumulator
  },[])
  return result;
}

function getMostPopularAuthors(books, authors) {
  let borrowedInfo=getBooksBorrowsCount(books).sort((itemA,itemB)=>itemB.count-itemA.count)
  let result= borrowedInfo.reduce((accumulator, item)=>{
    let name = authors.find(element=>element.id==item.name)
  if(name){
    let author=name.name
    let first=author.first;
    let last=author.last;
    item.name=`${first} ${last}`
    accumulator.push(item)
    return accumulator}},[]
  )
  return result.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
