

import * as THREE from 'three'
import Time from '../Utils/Time'

import Textures from './Texture'

import waveShaderVertex from './Shaders/WaveShader/vertex.glsl'
import waveShaderFragment from './Shaders/WaveShader/fragment.glsl'



export default class Materials
{
    constructor()
    {
        this.time = new Time()
        this.textures = new Textures()

        this.basic = new THREE.MeshStandardMaterial({
            metalness: 0.45,
            roughness: 0.65,
            side: THREE.DoubleSide,
            wireframe: true
        })

        this.munk = new THREE.MeshBasicMaterial({
            map: this.textures.munk
        })

        this.setWaveShader()


    }

    setWaveShader()
    {
        this.waveShader = new THREE.RawShaderMaterial({

            // Vertex Shader
            vertexShader: waveShaderVertex,

            // Fragment shader
            fragmentShader: waveShaderFragment,

            // Uniforms
            uniforms: {
                uColor: { value: new THREE.Color('blue') },
                uTime: { value: 0 }
            },
            transparent: true,
            wireframe: true,
            side: THREE.DoubleSide
        })
    }

    updateWaveShader()
    {
        this.waveShader.uniforms.uTime.value = this.time.elapsed * 0.001

    }
}