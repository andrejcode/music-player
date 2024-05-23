# Music Player

A simple music player created with React and Typescript. User can use left and right arrows
to change songs and up and down arrows to adjust the volume. Spacebar can be used to play/pause the song.

## Getting Started

1. **Clone the repository:**

```bash
    git clone https://github.com/andrejcode/music-player.git
```

2. **Install dependencies:**

```bash
    npm install
```

3. **Prepare songs:**

- Unzip the songs located in `public/songs`.

  Note: These songs are royalty-free and were downloaded from Pixabay.

4. **Start the development server:**

```bash
    npm run dev
```

## Adding new songs

To add new song:

1. Place the song file in the `public/songs` folder.
2. Add the song object to the list in `src/songs`.

   Note: If you don't include correct audio file that you declared in songs list you will get an error.

## Future Development

- The songs will be fetched from the API
- App will be mobile friendly and will have full screen audio controls option with album cover (also from API)
- Errors will be handled better
- Add autoplay feature
- Same song will be played if user presses on previous song button while song time is bigger then 5s for example
