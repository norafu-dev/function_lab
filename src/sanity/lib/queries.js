import { defineQuery } from "next-sanity";

const HOMEPAGE_QUERY = defineQuery(
  `*[_type == "home"]{
    video
  }[0]`
);

const WORKS_QUERY = defineQuery(`
*[_type == "work"] | order(workPageOrder asc, title asc){
    title,
    "slug": slug.current,
    category,
    "hero": select(
      defined(hero.video.file.asset) => {
        "type": "video",
        "file": hero.video.file.asset._ref,
        "thumbnail": hero.video.thumbnail.asset._ref
      },
      defined(hero.image.asset) => {
        "type": "image",
        "image": hero.image.asset._ref
      }
    )
  }
`);

const ABOUT_QUERY = defineQuery(
  `
*[_type == "about"][0]{
  specialties[]{
    category,
    items
  },
  manifesto[]{
    title,
    content
  },
  clients[]{
    name,
    industry
  },
  awards[]{
    title,
    year
  }
}
`
);

const NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(date desc){
    title,
    date,
    "cover": cover.asset._ref
  }
  `);

const LAB_QUERY = defineQuery(`
  *[_type == "lab"] | order(date desc){
    title,
    size,
    "cover": cover.asset._ref,
    "video": video.asset._ref,
  }
  `);

export { HOMEPAGE_QUERY, WORKS_QUERY, ABOUT_QUERY, NEWS_QUERY, LAB_QUERY };
