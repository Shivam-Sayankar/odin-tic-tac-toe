console.log("Hare Krishna!")

const Gameboard = (() => {

    let lastMoveBy = ''

    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]

    function displayBoard() {
        console.log(`
            \t ${board[0]} | ${board[1]} | ${board[2]}
            \t---:---:---
            \t ${board[3]} | ${board[4]} | ${board[5]}
            \t---:---:---
            \t ${board[6]} | ${board[7]} | ${board[8]}
            `)
    }

    function displayPositions() {
        console.log(`
            \t 0 | 1 | 2
            \t---:---:---
            \t 3 | 4 | 5
            \t---:---:---
            \t 6 | 7 | 8
            `)
    }

    function clearGameboard() {
        for (let i = 0; i < 9; i++) {
            board[i] = ''
        }
    }

    function setLastMoveBy(marker) {
        lastMoveBy = marker
    }

    function getLastMoveBy() {
        return lastMoveBy
    }

    function getBoard() {
        return board
    }

    function getBoardInfoAt(position) {
        return board[position]
    }

    function markOnBoard(marker, position) {
        board[position] = marker
    }

    return {
        // board,
        getBoard,
        getBoardInfoAt,
        markOnBoard,
        displayBoard,
        displayPositions,
        setLastMoveBy,
        getLastMoveBy,
        clearGameboard
    }

})()


// Player factory function
function createPlayer(marker, gameboard) {

    let winCount = 0

    function makeAMove(position) {

        console.log(position)
        position = parseInt(position)

        // checking if the position is valid first
        if (position !== null && position >= 0 && position < 9) {

            // checking if the position is occupied already
            if (gameboard.getBoardInfoAt(position) === '') {
                // gameboard.getBoard()[position] = marker
                gameboard.markOnBoard(marker, position)
                gameboard.displayBoard()
            } else {
                console.log('Position already occupied')
            }

        }
        else {
            console.log('Invalid Position')
        }


    }

    return {
        marker,
        winCount,
        makeAMove,
    }
}

const displayController = (() => {

    const gameStatusDisplay = document.querySelector('.game-status')

    function displayTurn(currentPlayer) {
        gameStatusDisplay.innerHTML = `<strong>${currentPlayer.marker}</strong> 's turn`
    }

    function markOnBoard(currentPlayer, id) {
        const cellID = parseInt(id[1])
        // console.log(cellID)

        if (cellID !== null) {
            const gridCell = document.querySelector(`#_${cellID}`)
            if (!gridCell.textContent) {
                gridCell.textContent = currentPlayer.marker
                return true
            }
        }

    }


    return {
        displayTurn,
        markOnBoard
    }
})()

const Game = ((Gameboard, displayCtrl) => {

    const gameBoardArray = Gameboard.getBoard()
    const mainButton = document.querySelector('#start-restart-btn')
    const gridDisplay = document.querySelector('.gameboard')

    const playerOne = createPlayer('X', Gameboard)
    const playerTwo = createPlayer('O', Gameboard)

    let currentPlayer;
    let flag = Math.round(Math.random()) // 1 or 0

    function setCurrentPlayer(flag) {
        currentPlayer = flag ? playerOne : playerTwo
        displayCtrl.displayTurn(currentPlayer)
    }

    mainButton.addEventListener('click', () => {

        // const currentPlayer = flag ? playerOne : playerTwo
        setCurrentPlayer(flag)

        console.log('Start game')
        gridDisplay.addEventListener('click', (e) => {

            // Mark a move on board
            const cellID = e.target.id
            const cellPosition = cellID[1]
            if (displayCtrl.markOnBoard(currentPlayer, cellID)) {
                currentPlayer.makeAMove(cellPosition)
                console.log(gameBoardArray)
                flag = !flag
                setCurrentPlayer(flag)
            }

        })
    })


})(Gameboard, displayController)