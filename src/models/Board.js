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
    generateNewState(this.board)
    updateState(this.board)
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

function defineNeighbors(board,i,j){
  const {TOP,BOTTOM,LEFT,RIGHT} = getBorders(i,j)

  const {THEREISTOP,THEREISBUTTOM,THEREISLEFT,THEREISRIGHT} = thereIsBorder(board,TOP,BOTTOM,LEFT,RIGHT)

  if (THEREISTOP) {
    board[i][j].neighbors.push(board[TOP][j])
    
    if (THEREISLEFT) {
      board[i][j].neighbors.push(board[TOP][LEFT])
    }
    if (THEREISRIGHT) {
      board[i][j].neighbors.push(board[TOP][RIGHT])
    }
  }

  if (THEREISBUTTOM) {
    board[i][j].neighbors.push(board[BOTTOM][j])

    if (THEREISLEFT) {
      board[i][j].neighbors.push(board[BOTTOM][LEFT])
    }
    if (THEREISRIGHT) {
      board[i][j].neighbors.push(board[BOTTOM][RIGHT])
    }
  }

  if (THEREISLEFT) {
    board[i][j].neighbors.push(board[i][LEFT])
  }

  if (THEREISRIGHT) {
    board[i][j].neighbors.push(board[i][RIGHT])
  }
}

function updateState(board){
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].updateState()
    }
  }
}

function generateNewState(board){
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].generateNewState()
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

const model = '........\n..*.*.*.\n.*.*.*..\n........' 
const board = new Board(4, 8, model)
board.printCorrentGeneration()
let result = board.printCorrentGeneration()
console.log(result)


module.exports = Board