const Board = require('./models/Board')
//const model = '........\n..*.*.*.\n.*.*.*..\n........' 
//const board = new Board(4, 8, model)
const  fs = require('fs'); 

const text = fs.readSync('../model.txt')
const lines = text.split('\n');
const boardSize = lines[0]
const height = boardSize.split(' ')[0]
const widht = boardSize.split(' ')[1]

let model = '';
for (let i=1; i<= lines.length; i++){
    model += lines[i] + '\n'
}

console.log(model)

const board = new Board(height, width, model)
const result = board.printCorrentGeneration()
console.log(result)



