import { RGB, Vector, Matrix, createMatrix } from "./utils";

class Square {
  color: RGB
  position: Vector
  size: number
  constructor(color: RGB, position: Vector, size: number){
    this.color = color
    this.size = size;
    this.position = position;
  }
  move(x:number, y: number) {
    this.position[1] += x;
    this.position[0] += y;
  }
  render() {
    const matrix = createMatrix(() => undefined) as Matrix<undefined | RGB>
    for(let x = this.position[0]; x < this.size + this.position[0]; x++){
      for(let y = this.position[1] * 2; y < this.size * 2 + this.position[1] * 2; y++){
        if(matrix[x]){
          matrix[x][y] = this.color;
        }
      } 
    }
    return matrix;
  }
}


class AnimatedSquare extends Square {
  clock = 0;
  startPosition: Vector
  radius = Math.floor(Math.random() * 10 + 1)
  speed = Math.random() / 2 + 0.1

  constructor(color: RGB, position: Vector, size: number){
    super(color, position, size)
    this.startPosition = [...position];
    this.animate();
  }
  animate(){
    this.position[0] = this.startPosition[0] + Math.floor(Math.sin(this.clock * this.speed) * this.radius)
    this.position[1] = this.startPosition[1] + Math.floor(Math.cos(this.clock * this.speed) * this.radius)
    this.clock++
  }
}

export {Square, AnimatedSquare}