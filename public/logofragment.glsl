precision lowp float;

uniform float time;
uniform float patternIntensity;

varying vec2 position;

#define M_PI 3.1415926535897932384626433832795

float sharpStep(float edge, float x) {
  return smoothstep(edge - 0.5, edge + 0.5, x);
}

float circle(vec2 uv, vec2 circlePosition, float radius) {
  return 1.0 - sharpStep(radius, distance(uv, circlePosition));
}

float lineSegment(vec2 uv, vec2 p0, vec2 p1, float width) {
  vec2 direction = normalize(p1 - p0);
  vec2 orthogonal = vec2(-direction.y, direction.x);
  float t = dot((uv - p0), direction);
  vec2 orthProjection = dot((uv - p0), orthogonal) * orthogonal;
  
  float onLine = 1.0 - sharpStep(width, length(orthProjection));
  float onSegment = min(sharpStep(0.0, t), sharpStep(t, distance(p0, p1)));
  
  return min(onSegment, onLine);
}

float roundedLineSegment(vec2 uv, vec2 p0, vec2 p1, float width) {
  return max(
          max(
            lineSegment(uv, p0, p1, width),
            circle(uv, p0, width)
          ),
          circle(uv, p1, width)
        );
}
    
float patternTile(vec2 uv, vec2 center, vec2 rectSize, float width) {
    vec2 size = 2.0/3.0 * rectSize;    
    vec2 d4 = size * (1.0+2.0 * cos(2.0 * M_PI/5.0))/2.0;
    vec2 d2 = size * sin(4.0*M_PI/5.0);
    vec2 offset = center - rectSize / 2.0; 
    float line1 = roundedLineSegment(uv, offset, offset + vec2(d4.x, d2.y), width);
    float line2 = roundedLineSegment(
      uv, offset + vec2(rectSize), offset + vec2(rectSize) - vec2(d4.x, d2.y), width
    );
    float line3 = roundedLineSegment(
      uv, offset + vec2(size.x, 0), offset + vec2(size.x/2.0, rectSize.y), width
    );
    float line4 = roundedLineSegment(
      uv, offset + vec2(0.0, rectSize.y), offset + vec2(0.5 * size.x, rectSize.y), width
    );
    float line5 = roundedLineSegment(
      uv, offset + vec2(rectSize.x, 0.0), offset + vec2(rectSize.x, 0.0) - vec2(0.5 * size.x, 0.0), width
    );

    return line1 + line2 + line3 + line4 + line5;
}

float variablePatternTile(vec2 uv, vec2 center, vec2 rectSize, float alpha, float beta, float crossOffset, float width) {
  vec2 a = vec2(-0.5 * tan(alpha), 0.5);
  
  float k1 = -1.0 / tan(alpha);
  float k2 = tan(beta);
  
  float x = ((0.5 + crossOffset) - 0.5*k2)/(k1 - k2);
  vec2 b = vec2(x, k1 * x);
                                      
  vec2 wholeLineTopLeft = center + rectSize * a;
  vec2 wholeLineBottomRight = center - rectSize * a;
  vec2 segment1BottomLeft = center + rectSize * b;
  vec2 segment2TopRight = center - rectSize * b;
    
  vec2 topLeft = center + rectSize * vec2(-0.5, 0.5);
  vec2 topRight = center + rectSize * (vec2(0.5, 0.5) + vec2(0.0, crossOffset));
  vec2 bottomLeft = center + rectSize * (vec2(-0.5, -0.5) - vec2(0.0, crossOffset));
  vec2 bottomRight = center + rectSize * vec2(0.5, -0.5);
    
  vec2 mirrorSegment1BottomLeft = topRight + vec2(1.0, -1.0)*(segment1BottomLeft - topRight);
  vec2 mirrorSegment2TopRight = bottomLeft + vec2(1.0, -1.0)*(segment2TopRight - bottomLeft);
                                                                 
  float line1 = lineSegment(uv, topLeft, wholeLineTopLeft, width);
  float line2 = lineSegment(uv, wholeLineTopLeft, wholeLineBottomRight, width);
  float line3 = lineSegment(uv, topRight, segment1BottomLeft, width);
  float line4 = lineSegment(uv, bottomLeft, segment2TopRight, width);
    
  float line3Mirror = lineSegment(uv, topRight, mirrorSegment1BottomLeft, width);
  float line4Mirror = lineSegment(uv, bottomLeft, mirrorSegment2TopRight, width);

  float line5 = lineSegment(uv, bottomRight, wholeLineBottomRight, width);
                
  return min(line1 + line2 + line3 + line3Mirror + line4 + line4Mirror + line5, 1.0);
}


float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);
  
  float res = mix(
    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
    mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}

void main() {    
  float strokeWidth = 2.0;
  
  float modifiedTime = time + sin(time + position.x) * cos(time + position.y);

  // For squares
  float beta1 =  M_PI / 2.0;
  float alpha1 = M_PI / 2.0;
  
  // for tilted squares
  float beta2 =  M_PI / 4.0;
  float alpha2 = M_PI / 4.0;
  
  // for pentagon pattern
  float beta5 =  M_PI / 5.0;
  float alpha5 = M_PI / 10.0;

  // for something else
  float beta4 =  0.0;//M_PI / 2.0;
  float alpha4 = M_PI / 2.0;
  
  // for something else
  float beta6 =  M_PI / 2.0;
  float alpha6 = 0.0;

  float alpha = mix(alpha1, alpha5, abs(cos(modifiedTime * 0.2)));
  float beta = mix(beta1, beta5, abs(sin(modifiedTime * 0.3)));

  vec2 size = vec2(50.0);
  vec2 rectSize = 1.5 * size;

  vec2 movingCoords = gl_FragCoord.xy;
  vec2 signedPatternUv = mod(movingCoords, rectSize*2.0) - rectSize;
  vec2 patternUv = abs(signedPatternUv);
     
  float tile = variablePatternTile(
    patternUv - vec2(rectSize / 2.0),
    vec2(0.0),
    vec2(rectSize),
    alpha,
    beta,
    0.0,
    strokeWidth
  );

  vec3 color1 = vec3(0.0, 0.0, 0.2);
  vec3 color2 = vec3(0.0, 0.2, 0.2);
  vec3 bg = mix(color1, color2, clamp(position.y / 2.0 + 0.5, 0.0, 1.0));
  vec3 lineFill = vec3(1.0) * 0.05 * tile * clamp(position.y / 2.0 + 0.5, 0.1, 1.0) * patternIntensity;
  
  vec3 color = bg + lineFill;
  color += vec3((noise(gl_FragCoord.xy) - vec3(0.5)) / 255.0);

  gl_FragColor = vec4(color, 1.0);
}
