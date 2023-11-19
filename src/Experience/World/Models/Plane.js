import * as THREE from "three"
import utils from 'canvas-sketch-util'

import PARAMS from "../../Utils/PARAMS"

import Experience from "../../Experience"

export default class Plane
{
    constructor()
    {

        this.experience = new Experience()

        this.materials = this.experience.materials
        this.time = this.experience.time

        this.geometry = new THREE.PlaneGeometry(PARAMS.planeWidth, PARAMS.planeHeight, 32, 32)

        // Set plane
        this.instance = new THREE.Mesh(
            this.geometry,
            this.materials.munk
        )
        this.instance.receiveShadow = true
        this.instance.castShadow = true

        this.count = this.geometry.attributes.position.count
        this.pointsCoordinates = this.geometry.attributes.position.array
        this.randoms = new Float32Array(this.count)
        this.noise = new Float32Array(this.count)

        for (let i = 0; i < this.count; i++)
        {
            this.randoms[i] = Math.random()

        }

        console.log(this.geometry.attributes.position.array);

        let j = 0

        for (let i = 0; i < this.count; i++)
        {

            let posX, posY, posZ

            posX = this.pointsCoordinates[i]
            posY = this.pointsCoordinates[i + 1]
            posZ = this.pointsCoordinates[i + 2]

            // console.log(posX, posY, posZ);


            const n = utils.random.noise3D(posX, posY, this.time.elapsed, 100, 0.01)

            this.noise[j] = n
            j++

        }



        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(this.randoms, 1))
        this.geometry.setAttribute('aNoise', new THREE.BufferAttribute(this.noise, 1))

        this.debug()

    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(PARAMS, 'planeWidth', 2, 10, 0.01).name('planeWidth').onChange((value) =>
            {
                PARAMS.planeWidth = value
                this.instance.scale.x = utils.math.mapRange(value, 2, 10, 0.5, 2.5)
            })
            this.debug.ui.add(PARAMS, 'planeHeight', 2, 10, 0.01).name('planeHeight').onChange((value) =>
            {
                PARAMS.planeHeight = value
                this.instance.scale.x = utils.math.mapRange(value, 2, 10, 0.333, 1.667)
            })
            this.debug.ui.add(PARAMS, 'speed', 0.0005, 0.005, 0.0001).name('speed')
            this.debug.ui.add(PARAMS, 'freq', 0.025, 0.5, 0.0001).name('freq')
            this.debug.ui.add(PARAMS, 'amp', 0.1, 15, 0.001).name('amp')
        }
    }

    update()
    {
        const now = Date.now / 300
        for (let i = 0; i < this.count; i++)
        {
            const x = this.geometry.attributes.position.getX(i)
            const y = this.geometry.attributes.position.getY(i)
            const z = this.geometry.attributes.position.getZ(i)

            const n = utils.random.noise3D(x, y, this.time.elapsed * PARAMS.speed, PARAMS.freq, PARAMS.amp)
            // const xsin = Math.sin(-x + this.time.elapsed * 0.003)
            this.geometry.attributes.position.setZ(i, n)
        }
        // this.geometry.computeVertexNormals()
        this.geometry.attributes.position.needsUpdate = true
    }
}
