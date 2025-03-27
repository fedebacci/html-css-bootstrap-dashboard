window.addEventListener('load', checkBookToAdd())





function checkBookToAdd() {
    console.log(window.location.href)
    if (window.location.href.includes('bookName')) {


        let bookNameToAdd = window.location.href.split('&').find((element) => element.includes('bookName')).split('=')[1]
        console.log(bookNameToAdd)

        addBook(bookNameToAdd)
    }
}



function addBook(bookName, borrowDate, bookState) {
    console.log('AGGIUNGO LIBRO:', bookName, borrowDate, bookState)
    
    let newBookRow = document.createElement('tr')

    let bookNameCell = document.createElement('td')
    bookNameCell.innerText = bookName.replaceAll('+', ' ')
    
    let borrowDateCell = document.createElement('td')
    borrowDateCell.classList.add('d-none')
    borrowDateCell.classList.add('d-md-table-cell')
    if (borrowDate != undefined) {
        borrowDateCell.innerText = borrowDate
    } else {
        borrowDateCell.innerText = '-'
    }

    let bookStateCell = document.createElement('td')
    let bookStateBadge = document.createElement('span')
    bookStateBadge.classList.add('badge')
    switch (bookState) {
        case 'borrowed':
            bookStateBadge.classList.add('bg-warning')
            bookStateBadge.innerText = 'In prestito'
        case 'notAvailable':
            bookStateBadge.classList.add('bg-danger')
            bookStateBadge.innerText = 'Non disponibile'
        default:
            bookStateBadge.classList.add('bg-secondary')
            bookStateBadge.innerText = 'Disponibile'
    }
    bookStateCell.appendChild(bookStateBadge)

    let bookActionsCell = document.createElement('td')
    bookActionsCell.classList.add('text-center')
    bookActionsCell.innerHTML = `
        <button class="btn btn-sm btn-outline-secondary">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn btn-sm btn-outline-secondary">
            <i class="fa-solid fa-trash"></i>
        </button>
    `
        

    newBookRow.appendChild(bookNameCell)
    newBookRow.appendChild(borrowDateCell)
    newBookRow.appendChild(bookStateCell)
    newBookRow.appendChild(bookActionsCell)

    console.log('newBookRow', newBookRow)
    console.log('newBookRow.innerHTML', newBookRow.innerHTML)



    let booksTable = document.getElementById('books-catalog-table')
    console.log('booksTable.children[1]', booksTable.children[1])

    booksTable.children[1].insertBefore(newBookRow, booksTable.children[1].firstChild)
}