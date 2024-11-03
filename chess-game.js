const game = new Chess();
const board = ChessBoard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleMove,
    onDragStart: onDragStart,
    onSnapEnd: onSnapEnd
});

function handleMove(source, target) {
    const move = game.move({ from: source, to: target });

    if (move === null) return 'snapback'; // Invalid move

    board.position(game.fen());

    if (game.game_over()) {
        alert('Game Over');
    } else {
        makeBotMove();
    }
}

function makeBotMove() {
    // Consider using a chess engine for stronger moves
    const moves = game.moves();

    if (moves.length === 0) {
        alert('Game Over: Stalemate');
        return;
    }

    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    game.move(randomMove);
    board.position(game.fen());
}

function onDragStart(source, piece, position, orientation) {
    // Disable illegal moves
    if (game.in_check() && piece === 'k') {
        return false;
    }
}

function onSnapEnd() {
    board.position(game.fen());
}
