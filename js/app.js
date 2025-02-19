/*-------------------------------- Constants --------------------------------*/


const winningCombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[2,4,6],
	[0,4,8]
]
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const gameBoard = document.querySelector(".board");
const resetBtnEl = document.querySelector("#reset")
/*-------------------------------- Functions --------------------------------*/

const init = ()=>{
	console.log("initialized;")
	board = ['','','','','','','','',''];
	turn = "X";
	tie = false;
	winner = false;
	render();
}
const render = () =>{
	updateBoard();
	updateMessage();
}
const updateBoard = () =>{
	board.forEach((cell, idx) =>{
		squareEls[idx].textContent = cell;
		console.log(squareEls.textContent);
	});
}
const updateMessage = () =>{
	if(winner === false && tie === false){
		messageEl.textContent = `it's ${turn}'s turn`;
	}else if(winner === false && tie === true){
		messageEl.textContent = 'We have a tie!';
	}else{
		messageEl.textContent = `Player ${turn} wins the round!`
	}
}
const handleClick = (event) => {
	const squareIndex = event.target.id;

	if (board[squareIndex] !== "" || winner) {
		return;
	} else {
		placePiece(squareIndex);
		checkForWinner();
		checkForTie();
		switchPlayerTurn();
		render();
	}
};


const placePiece = (idx)=>{
	board[idx] = turn;
	console.log(board);

}

const checkForWinner = () => {
	winningCombos.forEach((combo) => {
		let [a, b, c] = combo;
		if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
			winner = true;
			return; 
		}
	});
};

const checkForTie = () => {
	if (winner) {
		return;
	}

	if (!board.includes('')) {
		tie = true;
	}
};
const switchPlayerTurn = () =>{
	if (winner === true){
		return;
	}else{
		if(turn === "X"){
			turn = "O";
			console.log(`turn: ${turn}`)
		}else{
			turn = "X";
			console.log(`turn: ${turn}`)
		}
	}

}

const resetGame = () =>{
	init();

}
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((sqr) =>{
	sqr.addEventListener("click", handleClick);
});
gameBoard.addEventListener("click", (event)=>{
	if(event.target.id !== "sqr"){
		return;
	}else{
		handleClick(event);
	}
})
resetBtnEl.addEventListener("click", resetGame);

init();