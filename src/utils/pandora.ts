import { encodePacked, keccak256 } from 'viem'

const GREEN_IMAGE_URL = 'https://raw.githubusercontent.com/0xacme/pandora/main/1.gif'
const BLUE_IMAGE_URL = 'https://raw.githubusercontent.com/0xacme/pandora/main/2.gif'
const PURPLE_IMAGE_URL = 'https://raw.githubusercontent.com/0xacme/pandora/main/3.gif'
const ORANGE_IMAGE_URL = 'https://raw.githubusercontent.com/0xacme/pandora/main/4.gif'
const RED_IMAGE_URL = 'https://raw.githubusercontent.com/0xacme/pandora/main/5.gif'

export function getPandoraBoxTraits(id: bigint): { id: bigint, image: string, color: string } {
  const seed = Number(BigInt(keccak256(encodePacked(['uint256'], [id]))) >> BigInt(256 - 8))

  if (seed <= 100) {
    return {
      id,
      image: GREEN_IMAGE_URL,
      color: 'Green',
    }
  } else if (seed <= 160) {
    return {
      id,
      image: BLUE_IMAGE_URL,
      color: 'Blue',
    }
  } else if (seed <= 210) {
    return {
      id,
      image: PURPLE_IMAGE_URL,
      color: 'Purple',
    }
  } else if (seed <= 240) {
    return {
      id,
      image: ORANGE_IMAGE_URL,
      color: 'Orange',
    }
  } else {
    return {
      id,
      image: RED_IMAGE_URL,
      color: 'Red',
    }
  }
}
