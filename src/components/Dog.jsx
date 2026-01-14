import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useEffect } from 'react'
import { OrbitControls, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { normalMap, texture } from 'three/tsl'

const Dog = () => {
  const model = useGLTF('/models/dog.drc.glb')

  useThree(({camera, scene, gl}) => {
    camera.position.z = 0.55
    gl.toneMapping = THREE.ReinhardToneMapping    // originally used for better lighting(HDR)
    gl.outputColorSpace = THREE.SRGBColorSpace   // setting sRGB color space for accurate color representation(HD)
  })

  const {actions} = useAnimations(model.animations, model.scene)

  useEffect(() => {
    actions["Take 001"].play()
  }, [actions])

  const[ normalMap, sampleMatCap, branchMap, branchNormalMap ] = (useTexture(['/dog_normals.jpg','/matcap/mat-2.png', '/branches_diffuse.jpg','/branches_normals.jpg'])).map(texture => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })

  const dogMaterial = new THREE.MeshMatcapMaterial({
      normalMap: normalMap,
      matcap: sampleMatCap   // applying matcap texture
  })

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  })
 

  model.scene.traverse((child) => {
    if(child.name.includes("DOG")){
      child.material = dogMaterial
    }
    else{
      child.material = branchMaterial
    }
  })
  return (
      <>
        <primitive object={model.scene} position={[0.18, -0.55, 0]} rotation={[0, Math.PI/4.7, 0]} />
        <directionalLight position={[0,5,5]} color={0xFFFFFF} intensity={10} />
      </>
  )
}

export default Dog