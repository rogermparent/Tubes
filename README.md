# Tubes

**The self-hosted website solution (Eventually, hopefully)**

Heya! This is a passion project created in hopes to combat the issue of over-centralization and deplatforming on the internet.

## Warning

**Tubes cannot be statically built at the moment** 

This is because WebTorrent depends on the mime package which [currently isn't packable by Webpack](https://github.com/google/google-auth-library-nodejs/pull/371), which is an integral part of Gatsby.

You can, however, run it just fine in development mode.  
This issue seems to be close to resolution as well, so hopefully it will be resolved by release time.

## Basics

This project is built with "off-the-shelf" open-source software- namely 
[GatsbyJS](https://www.gatsbyjs.org/) and [Netlify CMS](https://github.com/netlify/netlify-cms) 
as well as the plugins and dependencies they include. 
It aims to be an alternative to content delivery and social media sites like 
YouTube, Twitter, and Wordpress that's able to be easily hosted on any 
standard web server while still delivering the advanced capabilities of 
a web app - something GatsbyJS is designed for.

While it's built in React, I strongly hold the belief that most, 
if not all functionality should be accessible without JavaScript- 
on the user end, at least.

## How to run

```bash
git clone https://github.com/rogermparent/tubes
npm i
gatsby develop
```

## Roadmap

 - [ ] Actually decent styling (scss)
 - [ ] Video / Torrent catalog component
 - [ ] Webtorrent-based media player
 - [ ] Netlify CMS Video "Uploader" widget
 - [ ] Blogging Component
 - [ ] Microblogging functionality
 - [ ] API
 - [ ] Multi-site linking
