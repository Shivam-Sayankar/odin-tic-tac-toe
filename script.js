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
                // gameboard.displayBoard()
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

    function displayWinner(winner) {
        gameStatusDisplay.innerHTML = `<strong>${winner} Won!</strong>`
    }

    function updateGameStatus(text) {
        gameStatusDisplay.textContent = text
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
        displayWinner,
        updateGameStatus,
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

    let moveCount = 0
    let drawCount = 0

    function resetGameSession() {
        moveCount = 0
        Gameboard.clearGameboard()
        gridDisplay.querySelectorAll('.board-box').forEach(cell => {
            cell.innerHTML = ''
        })
    }

    function checkWinner() {
        let winner = ''
        let gameWon = false

        const [_0, _1, _2, _3, _4, _5, _6, _7, _8] = Gameboard.getBoard()

        // 1st row
        if ((_0 != '' && _0 === _1) && (_1 === _2)) {
            winner = _0
            gameWon = true
        }

        // 2nd row
        else if ((_3 !== '' && _3 === _4) && (_4 === _5)) {
            winner = _3
            gameWon = true
        }

        // 3rd row
        else if ((_6 !== '' && _6 === _7) && (_7 === _8)) {
            winner = _6
            gameWon = true
        }

        // 1st column
        else if ((_0 !== '' && _0 === _3) && (_3 === _6)) {
            winner = _0
            gameWon = true
        }

        // 2nd column
        else if ((_1 !== '' && _1 === _4) && (_4 === _7)) {
            winner = _1
            gameWon = true
        }

        // 3rd column
        else if ((_2 !== '' && _2 === _5) && (_5 === _8)) {
            winner = _2
            gameWon = true
        }

        // top left to bottom right diagonal
        else if ((_0 !== '' && _0 === _4) && (_4 === _8)) {
            winner = _0
            gameWon = true
        }

        // 2nd diagonal - top right to bottom left
        else if ((_2 !== '' && _2 === _4) && (_4 === _6)) {
            winner = _2
            gameWon = true
        }

        else {
            gameWon = false
        }

        console.log(gameWon, winner)
        return { winner, gameWon }
    }

    function setCurrentPlayer(flag) {
        currentPlayer = flag ? playerOne : playerTwo
        displayCtrl.displayTurn(currentPlayer)
    }

    function handlePlayerInteraction(e) {
        // Mark a move on board
        const cellID = e.target.id
        const cellPosition = cellID[1]
        if (
            displayCtrl.markOnBoard(currentPlayer, cellID) &&
            moveCount < 9
        ) {

            currentPlayer.makeAMove(cellPosition)
            console.log(gameBoardArray)

            const { winner, gameWon } = checkWinner()

            if (gameWon) {
                console.log('Game won by:', winner)
                gridDisplay.removeEventListener('click', handlePlayerInteraction)
                displayCtrl.displayWinner(winner)

                mainButton.textContent = 'Restart'
            }

            else { // if (!gameWon) {
                flag = !flag
                setCurrentPlayer(flag)

                moveCount++
                console.log('moveCount:', moveCount)

                if (moveCount === 9) {
                    console.log('Its a draw')
                    gridDisplay.removeEventListener('click', handlePlayerInteraction)
                    displayCtrl.updateGameStatus(`It's a Draw!`)
                    // resetGameSession()
                    mainButton.textContent = 'Restart'
                }
            }


        }
    }

    mainButton.addEventListener('click', () => {

        resetGameSession()
        mainButton.textContent = 'Start'

        // const currentPlayer = flag ? playerOne : playerTwo
        setCurrentPlayer(flag)

        console.log('Start game')
        gridDisplay.addEventListener('click', handlePlayerInteraction)
    })


})(Gameboard, displayController)