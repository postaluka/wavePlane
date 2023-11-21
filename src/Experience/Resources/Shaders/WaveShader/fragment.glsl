precision mediump float;

uniform vec3 uColor;
uniform float uTime;

varying vec2 vUv;
varying float vRandom;

void main () {

    //Ramp
    // gl_FragColor = vec4( sin(vUv.x + uTime) * uColor, 1.0 );

    //Color
    gl_FragColor = vec4(uColor, 1.0);

}



