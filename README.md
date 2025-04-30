# Feature Tiles

A simple set of React components for creating tiles to show off site features.

## How to add it to your project

It doesn't have any dependencies, so the easiest way is to just git submodule it into your project:

```
git submodule add [github-ssh-link] /path/to/submodule/
npm install react-lazy-load-image-component
```

At some point I'll package it up, but at the moment I'm just splitting it into a new repo so that I can use it across some of my personal projects.

## useFeatureTiles hook

The main components are `DefaultTile`, `TileGrid`, and `FeatureSection`. These are available via the `useFeatureTiles` hook. This hook allows you to pass in a color scheme and a render function for the tile text.
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
    calloutTextColor: "white",
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
| SpecialIcon | `React.Component` | `null` | This icon appears in the top-right corner of tiles when `isSpecial=true`. Use it for marking tiles as premium features, or otherwise special. |
| mediaLazyLoad | `boolean` | `false` | Whether or not to lazy load the `<img>` tags. Does not lazy-load videos. To lazy-load an entire `TileGrid`, consider something like [`'react-lazy-load-image-component'`](https://www.npmjs.com/package/react-lazy-load-image-component), as see in [this answer](https://stackoverflow.com/a/49437449/3761310) |

## `FeatureSection`

This component allows you to group feature tiles together into a cohesive section. Sections allow you to describe related features, anchor to them using the URL, and indicate whether the entire feature list is special.

| prop | type | default | description |
|---|---|---|---|
| headerId | `string` | | An ID for the section, applied to the header |
| headerText | `string` | | The text of the header |
|---|---|---|---|
| HeaderSvg | `React.Component` | `undefined` | An SVG to show before the header text |
| headerHref | `string` | `undefined` | Converts the header to a link. Useful for pointing to the page that the feature lives on. |
| description | `string` or `React.Component` | `undefined` | Describes the feature section. If `string`, it will be wrapped with a single `<p>` tag. |
| heroMediaProps | `MediaProps` | `undefined` | Media props if you want some hero image / video under the description |
| lazyLoad | `boolean` | `false` | Whether you want the tiles to lazy-load. ONLY AFFECTS THE TILES (this allows you to still anchor to the section). |
| specialText | `string` | `undefined` | Sub-text to the header indicating that this section is special |
| SpecialIcon | `React.Component` | `undefined` | An icon related to your special theme |
| SpecialDescription | `React.Component` | `undefined` | An extra description below the section description describing how it is special |
| backToTopAnchor | `string` | `"#top"` | The anchor link for the top. Defaults to the top of the page |
| colorScheme | `ColorScheme` | `{}` | Color overrides |
| children | `React.ReactNode` | `undefined` | The tiles in this section. |

## `TileGrid`

This is probably the component you're looking for. It'll fit the tiles into a neat grid. Pass in an array of tile data and it'll format it all for you. 

The breakpoints are:
* Small: >0px - 1 tile
* Medium: >=768px - 2 tiles
* Large: >=992px - 3 tiles

`TileGrid` accepts the following props (note: `allTileData` is required; all others are passed on to the children `DefaultTiles`):

| prop | type | default | description |
|---|---|---|---|
| allTileData | `TileData[]` | | The data you want to tiled in this grid |
|---|---|---|---|
| colorScheme | `ColorScheme` | `{}` | Color overrides |
| renderTileText | `function` | `(text) => <p>{text}</p>` | A custom rendering function for the tile text |
| SpecialIcon | `React.Component` | `null` | This icon appears in the top-right corner of tiles when `isSpecial=true`. Use it for marking tiles as premium features, or otherwise special. |
| mediaLazyLoad | `boolean` | `false` | Whether or not to lazy load the `<img>` tags. Does not lazy-load videos. To lazy-load an entire `TileGrid`, consider something like [`'react-lazy-load-image-component'`](https://www.npmjs.com/package/react-lazy-load-image-component), as see in [this answer](https://stackoverflow.com/a/49437449/3761310) |

## `DefaultTile`

`DefaultTile` accepts the following props:

| prop | type | default | description |
|---|---|---|---|
| header | `string` or `React.Component` | | Either the header text or a custom React Component. If only text is given, it will render as an `<h3>` |
| description | `string` | | The tile text |
| renderTileText | `function` | `(text) => <p>{text}</p>` | A custom rendering function for the tile text |
| mediaType | `string` | `""` | "image" or "video". The type of media you'll be passing in. Omit if there's no media |
| mediaPath | `string` or `string[]` | `""` | The path to the media. For if `mediaType="video"`, accepts an array of paths so you can utilize different media for different browsers. |
| mediaVideoPoster | `string` | `""` | The path to the poster image for videos |
| mediaAltText | `string` | `""` | Alt text for the media |
| mediaLazyLoad | `boolean` | `false` | Whether or not to lazy load the `<img>` tags. Does not lazy-load videos. To lazy-load an entire `TileGrid`, consider something like [`'react-lazy-load-image-component'`](https://www.npmjs.com/package/react-lazy-load-image-component), as see in [this answer](https://stackoverflow.com/a/49437449/3761310) |
| className | `string` | `""` | Any additional classes you want for this component |
| style | `object` | `null` | Any additional styles you want for this component |
| colorScheme | `ColorScheme` | `{}` | Color overrides |
| textFirst | `boolean` | `false` | Toggle to `true` if you want the text to be above the media |
| useCallout | `boolean` | `false` | Whether you want this to use the callout tile styles or not |
| isSpecial | `boolean` | `false` | Toggles whether to show the SpecialIcon or not |
| SpecialIcon | `React.Component` | `null` | This icon appears in the top-right corner of tiles when `isSpecial=true`. Use it for marking tiles as premium features, or otherwise special. |
| linkHref | `string` | `""` | A URL that you want to show on the card |
| linkText | `string` | `"Go there now!"` | The text for the link |

### Special Tile Types

There are a few special tile types that you can utilize when using `TileGrid`. Add the param to your tile data and `TileGrid` will style the tile appropriately.

| param | description |
|---|---|
| `useDoubleWide` | Makes the tile take up two columns. Only applies to layouts where there are two or more columns. |
| `useDoubleTall` | Same as `useDoubleWide` except for rows |
| `useShowcase` | Makes the tile span all columns on all screen sizes. Great for really big and/or important features. Consider using with `useCallout`. |

### Special Tile Classes

There are a few special tile classes that you can add to `DefaultTile` or include with the `className` param in your tile data.

| className | description |
|---|---|
| `content-side-by-side` <br> `content-side-by-side-md` <br> `content-side-by-side-lg` | Switches the tile content layout from a column (media above text) to being a row. Use the `-md` and `-lg` versions limit it to just those specific screen sizes. <br><br> This is particularly useful in conjunction with `TileGrid` and options like `useDoubleWide` and `useShowcase`. |

## SectionJumpButtons

A navigation component that contains links to different sections. You pass in the feature section data and it will generate a link for each one using the headerId, headerText, and HeaderSvg (if present).

| prop | type | default | description |
|---|---|---|---|
| features | `FeatureSectionProps[]` | | An array of Feature Section prop arguments. Really only needs `headerId`, `headerText`, and optionally `HeaderSVG` |
|---|---|---|---|
| btnComponent | `React.Component` | `JumpButton` | A custom `<a>` tag component to use for the links. This is useful if you're using a custom component library like Bootstrap. |

## `useFilteredFeatures`

This hook gives you two parameters to filter out tiles (or even entire sections). It's designed such that you can create the filter form in whichever way makes the most sense for you and then simply tell the hook what values to use for the parameters.

The hook takes a single `features` argument, which is an array of `FeatureSectionProps` objects. It then returns three values:

* `filteredFeatures`: A new array of `FeatureSectionProps` that you should use instead of your original value. (By default, it will be unfiltered.)
* `filter()`: A function that triggers the filter.
* `SPECIALTY_TYPES`: A simple object of valild values for the `specialty` argument on `filter()`

### `filteredFeatures`

You should use this array in place of your original array of feature section data (i.e. pass it into `SectionJumpButtons` and `FeatureSection`).

When filters are applied, sections with no matching data (or tiles with matching data) will be excluded from the array entirely. This shortens the page and also reduces the number of jump buttons (if applicable).

### `filter()`

This function is how you update the array of feature sections. It accepts two arguments:

| prop | type | description |
|---|---|---|
| query | `string` | Some text you want to search for. The hook will look in the section header and description, as well as in each tile's header and description. If the text is found in the section data, it will include all tiles from that section. Otherwise, it will only include tiles that match. |
| specialty | `All` \| `Regular` \| `Special` | One of `SPECIALTY_TYPES`. This allows you to filter based on the `isSpecial` property of a tile. |
