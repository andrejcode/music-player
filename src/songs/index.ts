type Song = {
  id: number
  name: string
  artist: string
  duration: string
  fileName: string
}

const songs: Song[] = [
  {
    id: 1,
    name: 'Dancing in the Starrdust',
    artist: 'Free-Sound-Server',
    duration: '01:58',
    fileName: 'dancing-in-the-stardust.mp3',
  },
  {
    id: 2,
    name: 'Tokyo Cafe',
    artist: 'TVARI',
    duration: '02:33',
    fileName: 'tvari-tokyo-cafe.mp3',
  },
  {
    id: 3,
    name: 'Cold Sad Pianos',
    artist: 'makesoundmusic',
    duration: '02:21',
    fileName: 'cold-sad-pianos.mp3',
  },
  {
    id: 4,
    name: 'Beyond Horizons',
    artist: 'imagineaudio',
    duration: '01:58',
    fileName: 'beyond-horizons.mp3',
  },
  {
    id: 5,
    name: 'Lay It Out',
    artist: 'Cateholic',
    duration: '02:38',
    fileName: 'cateholic-lay-it-out.mp3',
  },
]

export default songs
