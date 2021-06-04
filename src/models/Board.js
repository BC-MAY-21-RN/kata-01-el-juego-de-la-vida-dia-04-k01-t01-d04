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
        const TOP = i - 1
        const BOTTOM = i + 1
        const LEFT = j - 1
        const RIGHT = j + 1

        const THEREISTOP = TOP >= 0
        const THEREISBUTTOM = BOTTOM < this.board.length
        const THEREISLEFT = LEFT >= 0
        const THEREISRIGHT = RIGHT < this.board[i].length

        if (THEREISTOP) {
          this.board[i][j].neighbors.push(this.board[TOP][j])
          if (THEREISLEFT) {
            this.board[i][j].neighbors.push(this.board[TOP][LEFT])
          }
          if (THEREISRIGHT) {
            this.board[i][j].neighbors.push(this.board[TOP][RIGHT])
          }
        }

        if (THEREISBUTTOM) {
          this.board[i][j].neighbors.push(this.board[BOTTOM][j])
          if (THEREISLEFT) {
            this.board[i][j].neighbors.push(this.board[BOTTOM][LEFT])
          }
          if (THEREISRIGHT) {
            this.board[i][j].neighbors.push(this.board[BOTTOM][RIGHT])
          }
        }

        if (THEREISLEFT) {
          this.board[i][j].neighbors.push(this.board[i][LEFT])
        }

        if (THEREISRIGHT) {
          this.board[i][j].neighbors.push(this.board[i][RIGHT])
        }
      }
    }
  }

  generateNextGeneration () {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j].generateNewState()
      }
    }

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j].updateState()
      }
    }
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

module.exports = Board