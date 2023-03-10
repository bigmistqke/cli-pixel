
export type Vector = [number, number];
export type RGB = [number, number, number];
export type Matrix<T> = T[][]

export let dim = [process.stdout.columns, process.stdout.rows];
process.on('SIGWINCH', () => {
  dim = [process.stdout.columns, process.stdout.rows]
});

export const iterateScreen = (callback: (x, y) => void) => {
  for(let x = 0; x < dim[1] - 1; x++){
    for(let y = 0; y < dim[0]; y++){
      callback(x,y);
    } 
  }
}

export const createMatrix = <T extends RGB | undefined>(callback: (x: number, y: number) => T) => 
  new Array(dim[1]).fill('').map(
    (_, y) => new Array(dim[0]).fill('').map(
      (_, x) => callback(x,y)
    )
  ) as Matrix<T>