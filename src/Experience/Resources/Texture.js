import * as THREE from 'three'

import Loaders from '../Utils/Loaders'

export default class Textures
{
    constructor()
    {
        this.loader = new Loaders()

        this.munk = this.loader.textures.load('/textures/munk.jpg')

    }
}