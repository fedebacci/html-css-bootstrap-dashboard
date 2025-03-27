window.addEventListener('load', checkBookToAdd())


function checkBookToAdd() {
    if (window.location.href.includes('bookName')) {

        var bookNameToAdd = window.location.href.split('&').find((element) => element.includes('bookName')).split('=')[1]
        console.log('bookNameToAdd', bookNameToAdd)
        
        if (window.location.href.includes('borrowDate')) {
            var borrowDateToAdd = window.location.href.split('&').find((element) => element.includes('borrowDate')).split('=')[1].split("-").reverse().join("/")
            console.log('borrowDateToAdd', borrowDateToAdd)
        } else {
            var borrowDateToAdd = null
        }

        if (window.location.href.includes('bookState')) {
            var bookStateToAdd = window.location.href.split('&').find((element) => element.includes('bookState')).split('=')[1]
            console.log('bookStateToAdd', bookStateToAdd)
        } else {
            var bookStateToAdd = null
        }
        addBook(bookNameToAdd, borrowDateToAdd, bookStateToAdd)
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
    if (borrowDate != undefined && borrowDate != '') {
        borrowDateCell.innerText = borrowDate
    } else {
        borrowDateCell.innerText = '-'
    }

    let bookStateCell = document.createElement('td')
    let bookStateBadge = document.createElement('span')
    bookStateBadge.classList.add('badge')
    switch (bookState) {
        case "available":
            bookStateBadge.classList.add('bg-secondary')
            bookStateBadge.innerText = 'Non disponibile';
            break;
        case "borrowed":
            bookStateBadge.classList.add('bg-warning')
            bookStateBadge.innerText = 'In prestito';
            break;
        case "notAvailable":
            bookStateBadge.classList.add('bg-danger')
            bookStateBadge.innerText = 'Non disponibile';
            break;
        default:
            bookStateBadge.classList.add('bg-secondary')
            bookStateBadge.innerText = 'Disponibile';
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

    let booksTable = document.getElementById('books-catalog-table')
    booksTable.children[1].insertBefore(newBookRow, booksTable.children[1].firstChild)
}