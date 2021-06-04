const Board = require('./models/Board')

const model = '........\n....*...\n...**...\n........'
const board = new Board(4, 8, model)
board.generateNextGeneration()
const result = board.printCorrentGeneration()
console.log(result)