import BoardModel from './modules/board/board-model.js';
import BoardView from './modules/board/board-view.js';
import BoardController from './modules/board/board-controller.js';

(() => {
  const container = document.querySelector('.app');
  const txtRows = document.getElementById('txt-rows');
  const txtColumns = document.getElementById('txt-columns');
  const txtTileSize = document.getElementById('txt-tile-size');
  const btnAdd = document.getElementById('btn-add');
  const addBoard = () => {
    const rows = parseInt(txtRows.value || 4, 10);
    const columns = parseInt(txtColumns.value || 4, 10);
    const tileSize = parseInt(txtTileSize.value || 100, 10);
    const model = new BoardModel(rows, columns, tileSize);
    const view = new BoardView(model);
    
    new BoardController(model, view);
    container.appendChild(view.element);
  }

  btnAdd.addEventListener('click', addBoard);
})();
