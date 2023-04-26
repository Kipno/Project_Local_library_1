function findAccountById(accounts, id) {
  let matchedAccount = accounts.find((accName) => accName.id === id);
  return matchedAccount;
}

function sortAccountsByLastName(accounts) {
  let arr=accounts.map(({name})=>{
    return {name:name};
  });
  arr.sort((itemA,itemB)=>{
    const nameA = itemA.name.last;
    const nameB = itemB.name.last;
    if(nameA<nameB){
      return -1;
    }
    if(nameA>nameB){
      return 1;
    }
    return 0
  });
  return arr;
}

function getTotalNumberOfBorrows(account, books) {
  let num=0;
  books.forEach((book)=>{
    let borrows=book.borrows;
    borrows.forEach((borrow)=>{
      if(borrow.id === account.id){
        num++;
      }
    })
  })
  return num;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];
  books.forEach((book)=>{
    let borrows = book.borrows;
    borrows.forEach((borrow)=>{
      if(borrow.id===account.id && borrow.returned == false){
        let author = authors.find((author)=>author.id == book.authorId)
        delete book.borrows;
        const newitem={...book,author:author,borrows:[{id:account.id,returened:false}]};
        booksPossessed.push(newitem);
      }
    });
  })
  return booksPossessed;

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
