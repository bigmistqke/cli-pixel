
export type ArrowDirections = "up" | "right" | "down" |"left";
type Callback = ((type: ArrowDirections) => void);

type ArrowEvents = {
  press: ((type: ArrowDirections) => void)[],
  up: (() => void)[],
  right: (() => void)[],
  down: (() => void)[],
  left: (() => void)[]
}

export class ArrowHelper{
  callbacks : ArrowEvents = {
    press: [],
    up: [],
    right: [],
    down: [],
    left: []
  }
  emit(key: Omit<keyof ArrowEvents, "press">)
  emit(key: "press", direction: ArrowDirections)
  emit(key: keyof ArrowEvents, direction?: ArrowDirections){
    if(key !== "press"){
      this.callbacks[key].forEach(callback => callback())
    }else{
      this.callbacks[key].forEach(callback => callback(direction!))
    }
  }
  constructor(){
    process.stdin.on('data', (buffer) => {
      const key = buffer.toString();
      if (key == '\u001B\u005B\u0041') {
        this.emit("press", 'up')
        this.emit("up")
      }
      if (key == '\u001B\u005B\u0043') {
        this.emit("press", 'right')
        this.emit("right")
      }
      if (key == '\u001B\u005B\u0042') {
        this.emit("press", 'down')
        this.emit("down")
      }
      if (key == '\u001B\u005B\u0044') {
        this.emit("press", 'left')
        this.emit("left")
      }
      if (key == '\u0003') { 
        // get cursor back
        process.stdout.write("\x1B[?25h");
        process.exit(); 
      }    // ctrl-c
    });
  }
  onPress = (callback: (type: ArrowDirections) => void) => {
    this.callbacks.press.push(callback)
  }
  onUp = (callback: () => void) => {
    this.callbacks.up.push(callback)
  }
  onRight = (callback: () => void) => {
    this.callbacks.right.push(callback)
  }
  onDown = (callback: () => void) => {
    this.callbacks.down.push(callback)
  }
  onLeft = (callback: () => void) => {
    this.callbacks.left.push(callback)
  }
}