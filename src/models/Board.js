/* eslint-disable no-unused-vars */
const Cell = require('./Cell')
const { LIVE } = require('../states')

class Board {
  constructor (rows, columns, model) {
    this.rows = rows
    this.columns = columns
    this.model = model
    this.board = []
    this.generateBoard()
  }

  generateBoard () {
    const explicitModel = this.model.split('\n').map(row => row.split(''))
    this.board = explicitModel.map(row => row.map(el => el === LIVE ? new Cell(LIVE) : new Cell()))
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        defineNeighbors(this.board,i,j);
      }
    }
  }

  generateNextGeneration () {
    iterations(this.board, updateNewState)
    iterations(this.board, updateState)
  }

  printCorrentGeneration () {
    let printing = ''
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        printing += this.board[i][j].state
      }
      printing += '\n'
    }
    return printing
  }
}

function addNeighbor(cell, neighbor){
  cell.neighbors.push(neighbor)
}


function defineNeighbors(board,i,j){
  const {TOP,BOTTOM,LEFT,RIGHT} = getBorders(i,j)

  const {THEREISTOP,THEREISBUTTOM,THEREISLEFT,THEREISRIGHT} = thereIsBorder(board,TOP,BOTTOM,LEFT,RIGHT)

  if (THEREISTOP) {
    addNeighbor(board[i][j],board[TOP][j])
    THEREISLEFT && addNeighbor(board[i][j],board[TOP][LEFT])
    THEREISRIGHT && addNeighbor(board[i][j],board[TOP][RIGHT])
  }

  if (THEREISBUTTOM) {
    addNeighbor(board[i][j],board[BOTTOM][j])

    THEREISLEFT && addNeighbor(board[i][j],board[BOTTOM][LEFT])
    THEREISRIGHT && addNeighbor(board[i][j],board[BOTTOM][RIGHT])
  }

  if (THEREISLEFT) {
    addNeighbor(board[i][j],board[i][LEFT])
  }

  if (THEREISRIGHT) {
    addNeighbor(board[i][j],board[i][RIGHT])
  }
}

function updateState(cell){
  cell.updateState()
}

function updateNewState(cell){
  cell.generateNewState()
}

function iterations(board, cb) {
  const rows = board.length;
  const colums = board[0].length;
  for (let i = 0; i < rows; i++)   {
    for (let j = 0; j < colums; j++) {
      cb(board[i][j])
    }
  }
}

function getBorders(i,j){
  const TOP = i - 1
  const BOTTOM = i + 1
  const LEFT = j - 1
  const RIGHT = j + 1
  return{
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
  }
}

function thereIsBorder (board,TOP,BOTTOM,LEFT,RIGHT){
  const THEREISTOP = TOP >= 0
  const THEREISBUTTOM = BOTTOM < board.length
  const THEREISLEFT = LEFT >= 0
  const THEREISRIGHT = RIGHT < board[0].length
  return {
    THEREISTOP,
    THEREISBUTTOM,
    THEREISLEFT,
    THEREISRIGHT
  }
}


module.exports = Board