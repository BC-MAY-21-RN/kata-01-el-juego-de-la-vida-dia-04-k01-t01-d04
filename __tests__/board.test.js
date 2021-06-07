/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Board = require('../src/models/Board')

describe('Board tests', () => {
  test('should print the same board like a parameter model', () => {
    const model = '........\n....*...\n...**...\n........'
    const board = new Board(4, 8, model)
    const result = board.printCorrentGeneration()
    expect(result).toEqual('........\n....*...\n...**...\n........\n')
  })

  test('should generate next generation', () => {
    const model = '........\n....*...\n...**...\n........'
    const board = new Board(4, 8, model)
    board.generateNextGeneration()
    const result = board.printCorrentGeneration()
    expect(result).toEqual('........\n...**...\n...**...\n........\n')
  })

  test('should generate next generation', () => {
    const model = '........\n********\n........\n........'
    const board = new Board(4, 8, model)
    board.generateNextGeneration()
    const result = board.printCorrentGeneration()
    expect(result).toEqual('.******.\n.******.\n.******.\n........\n')
  })

  test('should generate 3 generations', () => {
    const model = '........\n..*.*.*.\n.*.*.*..\n........' 
    const board = new Board(4, 8, model)
    let result = board.printCorrentGeneration()
    expect(result).toEqual('........\n..*.*.*.\n.*.*.*..\n........\n')

    board.generateNextGeneration()
    result = board.printCorrentGeneration()
    expect(result).toEqual('........\n..****..\n..****..\n........\n')

    board.generateNextGeneration()
    result = board.printCorrentGeneration()
    expect(result).toEqual('...**...\n..*..*..\n..*..*..\n...**...\n')
  })
})