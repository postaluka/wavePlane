precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix; // viewMatrix * modelMatrix
uniform float uTime;

attribute vec3 position;
attribute vec2 uv;
attribute float aRandom; 
attribute float aNoise;

varying vec2 vUv;
varying float vRandom;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

void main() 
{
    vUv = uv;
    vRandom = aRandom;
    vec3 pos = position;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += cos(modelPosition.x * 3.0) * 0.7;

    // modelPosition.z += aRandom;
    float noiseScale = 1.0;
    vec3 noisePos = vec3(pos.x * 1.5 + uTime, pos.y, pos.z);
    




    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;



    gl_Position = projectionPosition;

    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

}


// Basic example
/*

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}

*/