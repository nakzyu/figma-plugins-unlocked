# Figma Plugin React + Tailwind
This is a template project to help you setup Figma plugin along with

![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?logo=tailwind-css&logoColor=white) & 
![Webpack](https://img.shields.io/badge/webpack-%235299C8.svg?logo=webpack&logoColor=white)

# How to use

## 1. Create your Figma plugin via Figma

Follow [this guide](https://help.figma.com/hc/en-us/articles/360042786733-Create-a-plugin-for-development) to create your Figma plugin.

Then copy the `id` from `manifest.json` to the cloned project's `manifest.json`.

## 2. Run the watch script

Finally, run this command:

```bash
yarn
```
and
```bash
yarn build:watch
```

This will run webpack in the development mode.
