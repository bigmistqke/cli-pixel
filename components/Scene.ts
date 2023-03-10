import chalk, { dim } from "chalk";
import { Matrix, RGB, createMatrix, iterateScreen, Vector } from "./utils";
const readline = require('readline');

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

class Scene {
  objects : any[] = [];
  previousFrame: Matrix<RGB>;
  background: RGB
  fps: number
  dim = [process.stdout.columns, process.stdout.rows];


  constructor(background?: RGB, fps = 0){
    this.background = background ?? [0,0,0];
    this.fps = fps;

    process.on('SIGWINCH', () => {
      this.dim = [process.stdout.columns, process.stdout.rows]
    });
  }

  

  flattenLayers(layers: Matrix<RGB | undefined>[]){
    const frame = createMatrix((x, y) => undefined) as Matrix<RGB | undefined>
    iterateScreen((x,y) => {
      for(const layer of layers){
        if(frame[x][y]) break;
        if(layer[x]![y]){
          frame[x][y] = layer[x]![y] as RGB
        }
      }
      if(!frame[x][y]){
        frame[x][y] = this.background
      }
    })
    return frame as Matrix<RGB>;
  }
  diff(frame: Matrix<RGB>){
    iterateScreen((x,y) => {
      const color = frame[x]?.[y]
      const previousColor = this.previousFrame[x]?.[y];
      if(!color) return;
      if(previousColor[0] !== color[0]){
        this.paintPixel([y, x], color);
      }
    })
  }
  animate(){
    this.objects.forEach(object => object.animate?.())
  }
  render(){
    this.animate();
    const layers = this.objects.map(object => object.render());
    // create new frame
    const frame = this.flattenLayers(layers);

    // diff frames
    if(this.previousFrame){
      this.paintMatrix(frame)
      // this.diff(frame);
    }else {
      this.paintMatrix(frame)
    }

    this.previousFrame = frame;

    if(this.fps){
      setTimeout(() => this.render(), 1000 / Math.max(0.1, this.fps))
    } 
  }
  add = (object: any) => {
    this.objects.push(object)
  }
  refreshView = () => {
    readline.cursorTo(process.stdout, 0, 0)
    readline.cursorTo(process.stdout, ...this.dim)
  }
  paintPixel = (position: Vector, color: RGB) => {
    readline.cursorTo(process.stdout, position[0], position[1])
    process.stdout.write(chalk.bgRgb(...color)('  '))
    this.refreshView()
  }
  
  paintMatrix = (matrix: RGB[][], offset?: Vector) => {
    let result = "";
    for(let x = 0; x < this.dim[1] - 1; x++){
      for(let y = 0; y < this.dim[0]; y++){
        result += chalk.bgRgb(...(matrix[x]?.[y] || this.background))(' ')
      } 
    }
    readline.cursorTo(process.stdout, 0, 0)
    process.stdout.write(result)
    this.refreshView()
  }
}

export default Scene