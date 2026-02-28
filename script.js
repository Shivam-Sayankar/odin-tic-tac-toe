console.log("Hare Krishna!")

const Gameboard = (() => {

    let lastMoveBy = ''

    let board = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
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
            board[i] = ' '
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
    function makeAMove(position) {
        // checking if the position is valid first
        if (position >= 0 && position < 9) {

            // checking if the position is occupied already
            if (gameboard.getBoardInfoAt(position) === ' ') {
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

    return { marker, makeAMove }
}

const Game = (() => {

    let gameWon = false;
    let winCount = 0;

    const gameBoard = Gameboard
    gameBoard.displayPositions()
    // gameBoard.displayBoard()

    function checkGameWon(gameBoard) {

        let winner = ''
        const [_0, _1, _2, _3, _4, _5, _6, _7, _8] = gameBoard.getBoard()

        // 1st row
        if ((_0 != ' ' && _0 === _1) && (_1 === _2)) {
            winner = _0
            gameWon = true
        }

        // 2nd row
        else if ((_3 !== ' ' && _3 === _4) && (_4 === _5)) {
            winner = _3
            gameWon = true
        }

        // 3rd row
        else if ((_6 !== ' ' && _6 === _7) && (_7 === _8)) {
            winner = _6
            gameWon = true
        }

        // 1st column
        else if ((_0 !== ' ' && _0 === _3) && (_3 === _6)) {
            winner = _0
            gameWon = true
        }

        // 2nd column
        else if ((_1 !== ' ' && _1 === _4) && (_4 === _7)) {
            winner = _1
            gameWon = true
        }

        // 3rd column
        else if ((_2 !== ' ' && _2 === _5) && (_5 === _8)) {
            winner = _2
            gameWon = true
        }

        // top left to bottom right diagonal
        else if ((_0 !== ' ' && _0 === _4) && (_4 === _8)) {
            winner = _0
            gameWon = true
        }

        // 2nd diagonal - top right to bottom left
        else if ((_2 !== ' ' && _2 === _4) && (_4 === _6)) {
            winner = _2
            gameWon = true
        }

        else {
            gameWon = false
        }

        console.log(gameWon, winner)
        return { winner, gameWon }
    }

    function play() {
        const playerOne = createPlayer('X', gameBoard)
        const playerTwo = createPlayer('O', gameBoard)

        let flag = Math.round(Math.random()) === 1 ? true : false
        let totalMoves = 0

        while (!gameWon || totalMoves < 9) {
            const currentPlayer = flag ? playerOne : playerTwo
            currentPlayer.makeAMove(parseInt(
                prompt(`'${currentPlayer.marker}' Choose a position between 0 and 9`)
            ))
            const status = checkGameWon(gameBoard)
            gameWon = status.gameWon
            if (gameWon) {
                console.log(status.winner, 'Won!')
                break;
            }
            flag = !flag
            totalMoves++
        }

        if (!gameWon && totalMoves === 9) {
            console.log(`It's a tie!`)
        }
    }

    return { play }

})()


const ticTacToe = Game
ticTacToe.play()