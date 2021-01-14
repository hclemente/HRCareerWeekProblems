const prompt = require('prompt');

const grid = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9'
};

const winArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
               [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

const logGrid = () => {
    console.log('\n' +
        ' ' + grid[1] + ' | ' + grid[2] + ' | ' + grid[3] + '\n' +
        ' ---------\n' +
        ' ' + grid[4] + ' | ' + grid[5] + ' | ' + grid[6] + '\n' +
        ' ---------\n' +
        ' ' + grid[7] + ' | ' + grid[8] + ' | ' + grid[9] + '\n');
}

const placeMove = (pos, letter) => {
  grid[pos] = letter.toUpperCase();
}

const isInt = (value) => {
    let x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

const isValid = (pos) => {
    return (isInt(pos) && grid[pos] !== 'X' && grid[pos] !== 'O')
}

const isWin = (player) => {

    for (let i = 0; i < winArray.length; i++) {
        let inARow = 0;
        for (let j = 0; j < winArray[i].length; j++) {
            if (grid[winArray[i][j]] === player) {
                inARow++;
            }
            if (inARow === 3) {
                return true;
            }
        }
    }
    return false;
}

const isTie = () => {
    for (let i = 1; i <= Object.keys(grid).length; i++) {
        if (grid[i] === '1' || grid[i] !== '2' || grid[i] !== '3' ||
            grid[i] !== '4' || grid[i] !== '5' || grid[i] !== '6' ||
            grid[i] !== '7' || grid[i] !== '8' || grid[i] !== '9') {
            return false;
        }
    }
    return true;
}

const play = (player) => {

    console.log('Player: ' + player);
    prompt.start();
    prompt.get(['pos'], (err, result) => {

        if (isValid(result.pos) === true) {
            placeMove(result.pos, player);
            logGrid();
            if (isWin(player) === true) {
                console.log(`${player} is the winner`);
                return;
            }
            if (isTie() === true) {
                console.log('Tie Game');
                return;
            }
            if (player === 'X') {
                play('O');
            } else {
                play('X');
            }
        } else {
            console.log('Error: Invalid Input!');
            play(player);
        }
    });
}

console.log('Begin Game! \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

play('X');