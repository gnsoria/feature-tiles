# Feature Tiles

A simple set of React components for creating tiles to show off site features.

## How to add it to your project

It doesn't have any dependencies, so the easiest way is to just git submodule it into your project:

```
git submodule add [github-ssh-link] /path/to/submodule/
```

At some point I'll package it up, but at the moment I'm just splitting it into a new repo so that I can use it across some of my personal projects.

## useFeatureTiles hook

The main two components are `DefaultTile` and `TileGrid`, both of which are available via the `useFeatureTiles` hook. This hook allows you to pass in a color scheme and a render function for the tile text.
* There are three available color customizations:
 * `mediaBorderColor`: The border color of media on tiles (images and video).
 * `calloutBgColor`: The background color of callout tiles. Ideally this would be something eye-catching so that the callout tiles stand out from the rest.
 * `calloutBorderColor`: A border color for callout tiles to help them stand out even more.
* Tile Text
 * By default, the tile text is simply wrapped in a `<p>` tag.
 * If you want to handle the text with a custom component, you can use this prop to pass in a render function.
 * Great for rendering a custom Markdown component, for example.

### Example


```
import { useFeatureTiles, MEDIA_TYPES } from "feature-tiles"

const myColorScheme = {
    mediaBorderColor: "gray",
    calloutBgColor: "darkgray",
    calloutBorderColor: "aqua",
}

const FeatureTilesExample = () => {
    const { TileGrid } = useFeatureTiles({
        colorScheme: myColorScheme,
        renderTileText: (text) => <ReactMarkdown text={text} />
    })

    const allTileData = [
        {
            header: "Something Really Special!",
            description: "This is a callout tile! It'll automatically be styled differently, just by adding `useCallout` to its args.",
            mediaType: MEDIA_TYPES.image,
            mediaPath: mediaPathGetter(`a-special-feature.png`),
            useCallout: true,
        },
        {
            header: "My cool feature",
            description: `This is some cool feature! You can see how cool it is in the image above!`,
            mediaType: MEDIA_TYPES.image,
            mediaPath: mediaPathGetter(`my-cool-feature.png`),
        },
        {
            header: "Feature Tiles can have videos too!",
            description: `It's often much more engaging to show a video in a feature presentation. You can pass in an array of video paths to support multiple video types (i.e. webm, mp4, etc).`,
            mediaType: MEDIA_TYPES.video,
            mediaPath: [media(`an-engaging-video.webm`), media(`an-engaging-video.mp4`)],
            mediaVideoPoster: media(`my-loading-image.png`),
        },
        {
            header: "This tile has no media",
            description: `Sometimes there's nothing to show. That's ok too! This tile will still work.`,
        },
    ]

    return (
        <TileGrid allTileData={allTileData} />
    )
}
```




# API

## `useFeatureTiles`

The hook that gives you access to the tiles. Returns `{ TileGrid, DefaultTile }`

| prop | type | default | description |
|---|---|---|---|
| colorScheme | `ColorScheme` | `{}` | Color overrides |
| renderTileText | `function` | `(text) => <p>{text}</p>` | A custom rendering function for the tile text |

## `TileGrid`

This is probably the component you're looking for. It'll fit the tiles into a neat grid. Pass in an array of tile data and it'll format it all for you. 

The breakpoints are:
* Small: >0px - 1 tile
* Medium: >=768px - 2 tiles
* Large: >=992px - 3 tiles


| prop | type | default | description |
|---|---|---|---|
| allTileData | `TileData[]` | | The data you want to tiled in this grid |
| colorScheme | `ColorScheme` | `{}` | Color overrides |
| renderTileText | `function` | `(text) => <p>{text}</p>` | A custom rendering function for the tile text |

## `DefaultTile`

`DefaultTile` accepts the following props:

| prop | type | default | description |
|---|---|---|---|
| header | `string` | | The header text you want for this tile |
| description | `string` | | The tile text |
| mediaType | `string` | `""` | "image" or "video". The type of media you'll be passing in. Omit if there's no media |
| mediaPath | `string` or `string[]` | `""` | The path to the media. For if `mediaType="video"`, accepts an array of paths so you can utilize different media for different browsers. |
| mediaVideoPoster | `string` | `""` | The path to the poster image for videos |
| mediaAltText | `string` | `""` | Alt text for the media |
| className | `string` | `""` | Any additional classes you want for this component |
| style | `object` | `null` | Any additional styles you want for this component |
| useCallout | `boolean` | `false` | Whether you want this to use the callout tile styles or not |
| textFirst | `boolean` | `false` | Toggle to `true` if you want the text to be above the media |
| colorScheme | `ColorScheme` | `{}` | Color overrides |
| renderTileText | `function` | `(text) => <p>{text}</p>` | A custom rendering function for the tile text |
