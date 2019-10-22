attribute vec2 coordinates;
varying vec2 position;

void main() {
  position = coordinates;
  gl_Position = vec4(coordinates, 0.0, 1.0);
}
