const game = new Chess();
const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleMove
});

function handleMove(source, target) {
    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback'; // Invalid move
    setTimeout(makeBotMove, 250); // Bot move delay
}

function makeBotMove() {
    const moves = game.legal_moves();
    if (moves.length > 0) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        board.position(game.fen());
    }
}
