/* eslint-disable no-alert */
import { Template } from 'meteor/templating';
import { Aurora } from '../aurora/aurora';

import './play.html';
import './play.css';

const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

let shiftKey = false;

$(document).on('keydown keyup', event => {
  if (event.shiftKey) {
    shiftKey = true;
  } else {
    shiftKey = false;
  }
});

Template.play.onRendered(() => {
  let board = null;
  let aurora = null;
  // const game = new Chess();
  // const aurora = new Aurora(board, game, 'b', false);
  // $('#depth-input').attr('max', aurora.MAX_DEPTH);
  // $('#depth-input').val(aurora.DEFAULT_DEPTH);

  function onDragStart(source, piece) {
    aurora.highlightMoves(source, piece);
  }

  // eslint-disable-next-line consistent-return
  function onDrop(source, target, piece) {
    $('.highlight-moves-white').removeClass('highlight-moves-white');
    $('.highlight-moves-black').removeClass('highlight-moves-black');
    $('.highlight-moves-source-white').removeClass(
      'highlight-moves-source-white',
    );
    $('.highlight-moves-source-black').removeClass(
      'highlight-moves-source-black',
    );

    let promotion = 'q';

    if (
      shiftKey &&
      piece[1] === 'P' &&
      (parseInt(target[1], 10) === 1 || parseInt(target[1], 10) === 8)
    ) {
      console.log(piece[1], target[1]);
      promotion = '';
      while (
        promotion !== 'q' &&
        promotion !== 'n' &&
        promotion !== 'r' &&
        promotion !== 'b'
      ) {
        promotion = prompt(
          'Promotion: Queen (q), Knight (n), Rook (r), Bishop (b)',
        );
      }
      shiftKey = false;
    }

    const move = aurora.isMove(source, target, promotion);

    if (move) {
      aurora.playMove(move);
      if (move.split(' ')[3]) board.position(aurora.getFEN());
    } else return 'snapback';
  }

  // eslint-disable-next-line consistent-return
  function onSnapEnd() {
    if (aurora.updateBoardOnSnapEnd) board.position(aurora.getFEN());
    // const moves = aurora.getMoves();
    // const move = moves[Math.floor(Math.random() * moves.length)];
    // aurora.playMove(move);

    // $('#evaluation').text(aurora.evaluatePosition(game.fen()));
    // const depthInput = parseInt($('#depth-input').val(), 10);
    // aurora.makeMove(depthInput);
    // $('#evaluation').text(aurora.evaluatePosition(game.fen()));
    // if (game.isCheckmate()) {
    //   if (game.turn() === 'w') return console.log('Black won');
    //   else return console.log('White won');
    // }
    // if (
    //   game.isDraw() ||
    //   game.isInsufficientMaterial() ||
    //   game.isStalemate() ||
    //   game.isThreefoldRepetition()
    // ) {
    //   console.log('Draw');
    // }
    // board.position(aurora.getFEN());
  }

  const boardConfig = {
    pieceTheme: '/chesspieces/neo/{piece}.png',
    draggable: true,
    position: fen,
    moveSpeed: 0,
    onDragStart,
    onDrop,
    onSnapEnd,
  };

  // eslint-disable-next-line new-cap, no-undef
  board = Chessboard('board', boardConfig);

  const config = {
    fen,
    board,
  };

  aurora = new Aurora(config);
});
