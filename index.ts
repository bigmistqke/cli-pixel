import { ArrowHelper } from "./components/ArrowHelper";
import Scene from "./components/Scene";
import {Square, AnimatedSquare} from "./components/Square"
import { Vector, RGB, dim } from "./components/utils";

// remove cursor
process.stdout.write("\x1B[?25l")

const createRandomSquare = () => {
  const position = [Math.floor(Math.random() * dim[1] - 2), Math.floor(Math.random() * dim[0] - 2)] as Vector;
  const color = [
    Math.floor(Math.random() * 100 + 50), 
    Math.floor(Math.random() * 100 + 50), 
    Math.floor(Math.random() * 100 + 50), 
  ] as RGB;
  return new AnimatedSquare(color, position, Math.floor(Math.random() * 10 + 2));
}

const init = () => {
  const scene = new Scene([0,0,0], 5);
  
  for(let i = 0; i < 20; i++){
    scene.add(createRandomSquare());
  }
  
  const square = new Square([200,0,0], [2,2], 3);
  const arrow = new ArrowHelper();
  arrow.onUp(() => square.move(0, -1))
  arrow.onRight(() => square.move(1, 0))
  arrow.onDown(() => square.move(0, 1))
  arrow.onLeft(() => square.move(-1, 0))
  
  scene.add(square);
  
  for(let i = 0; i < 20; i++){
    scene.add(createRandomSquare());
  }
  
  scene.render()
}

init();




