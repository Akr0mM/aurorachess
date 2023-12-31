/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
import { assert } from 'chai';
import { Aurora } from '../imports/ui/aurora/aurora';

const fen = {
  start: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  random:
    'kQqNrBPR/rRbnQbQp/RbQQkPNQ/pBnRPqPp/QbpkKNKK/NqKBpBrp/pkRqnkKp/KrBpKRqr w - - 0 1',
  pos2: 'r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - ',
};

let aurora;

describe('Aurora Bitboards Initialization ', function () {
  it('give all the bitboards from starting position', function () {
    aurora = new Aurora({ fen: fen.start });
    assert.strictEqual(aurora.wp.toString(16), 'ff00'); // bitboard des pions blanc a la position de depart
    assert.strictEqual(aurora.wr.toString(16), '81'); // bitboard des tours blanche a la position de depart
    assert.strictEqual(aurora.wn.toString(16), '42'); // bitboard des cavaliers blanc a la position de depart
    assert.strictEqual(aurora.wb.toString(16), '24'); // bitboard des fous blanc a la position de depart
    assert.strictEqual(aurora.wq.toString(16), '10'); // bitboard des dames blanche a la position de depart
    assert.strictEqual(aurora.wk.toString(16), '8'); // bitboard des rois blanc a la position de depart
    assert.strictEqual(aurora.bp.toString(16), 'ff000000000000'); // bitboard des pions noir a la position de depart
    assert.strictEqual(aurora.br.toString(16), '8100000000000000'); // bitboard des tours noire a la position de depart
    assert.strictEqual(aurora.bn.toString(16), '4200000000000000'); // bitboard des cavaliers noir a la position de depart
    assert.strictEqual(aurora.bb.toString(16), '2400000000000000'); // bitboard des fous noir a la position de depart
    assert.strictEqual(aurora.bq.toString(16), '1000000000000000'); // bitboard des dames noire a la position de depart
    assert.strictEqual(aurora.bk.toString(16), '800000000000000'); // bitboard des rois noir a la position de depart
  });
  it('give all the bitboards from random position', function () {
    aurora = new Aurora({ fen: fen.random });
    assert.strictEqual(aurora.wp.toString(16), '200040a00000000'); // bitboard des pions blanc a la position random
    assert.strictEqual(aurora.wr.toString(16), '140801000002004'); // bitboard des tours blanche a la position random
    assert.strictEqual(aurora.wn.toString(16), '1000020004800000'); // bitboard des cavaliers blanc a la position random
    assert.strictEqual(aurora.wb.toString(16), '400004000140020'); // bitboard des fous blanc a la position random
    assert.strictEqual(aurora.wq.toString(16), '400a310080000000'); // bitboard des dames blanche a la position random
    assert.strictEqual(aurora.wk.toString(16), 'b200288'); // bitboard des rois blanc a la position random
    assert.strictEqual(aurora.bp.toString(16), '1008120098110'); // bitboard des pions noir a la position random
    assert.strictEqual(aurora.br.toString(16), '880000000020041'); // bitboard des tours noire a la position random
    assert.strictEqual(aurora.bn.toString(16), '10002000000800'); // bitboard des cavaliers noir a la position random
    assert.strictEqual(aurora.bb.toString(16), '24400040000000'); // bitboard des fous noir a la position random
    assert.strictEqual(aurora.bq.toString(16), '2000000400401002'); // bitboard des dames noire a la position random
    assert.strictEqual(aurora.bk.toString(16), '8000080010004400'); // bitboard des rois noir a la position random
  });
});

describe('Aurora Get Moves From Starting Position', function () {
  beforeEach(() => {
    aurora = new Aurora({ fen: fen.start });
  });

  it('should give 20 moves (depth 1)', function () {
    assert.strictEqual(aurora.perft(1), 20);
  });

  it('should give 400 moves (depth 2)', function () {
    assert.strictEqual(aurora.perft(2), 400);
  });

  it('should give 8902 moves (depth 3)', function () {
    assert.strictEqual(aurora.perft(3), 8902);
  });

  // it('should give 197,281 moves (depth 4)', function () {
  //   assert.strictEqual(aurora.perft(4), 197281);
  // });
});

// describe('Aurora Get Moves From Position 2', function () {
//   beforeEach(() => {
//     aurora = new Aurora({ fen: fen.pos2 });
//   });

//   it('should give 48 moves (depth 1)', function () {
//     assert.strictEqual(aurora.perft(1), 48);
//   });

//   it('should give 2039 moves (depth 2)', function () {
//     assert.strictEqual(aurora.perft(2), 2039);
//   });

//   it('should give 97862 moves (depth 3)', function () {
//     assert.strictEqual(aurora.perft(3), 97862);
//   });
// });
