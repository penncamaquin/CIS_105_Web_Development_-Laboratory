let turn = 0;
let gameOver = false;

function mark(btn){
    if (gameOver) return;
    if (btn.innerText === "X" || btn.innerText === "O") return;

    if (turn % 2 === 0){
        btn.innerText = "X";
    } else {
        btn.innerText = "O";
    }
    turn++;

    checkWinner();
}

function checkWinner(){
    let buttons = document.querySelectorAll(".click");
    let b = [];

    for (let i = 0; i < buttons.length; i++){
        b.push(buttons[i].innerText);
    }

    // all possible winning combinations
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < wins.length; i++){
        let a = wins[i][0];
        let c = wins[i][1];
        let d = wins[i][2];

        if (b[a] !== "" && b[a] === b[c] && b[c] === b[d]){
            alert(b[a] + " wins!");
            gameOver = true;
            return;
        }
    }

    // check for draw
    if (turn === 9){
        alert("It's a draw!");
        gameOver = true;
    }
}

function reset(){
    let buttons = document.querySelectorAll(".click");

    for (let i = 0; i < buttons.length; i++){
        buttons[i].innerText = "";
    }

    turn = 0;
    gameOver = false;
}
