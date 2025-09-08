import { defineQuery } from "next-sanity";

const HOMEPAGE_QUERY = defineQuery(
  `*[_type == "home"]{
    video
  }[0]`
);

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

export { HOMEPAGE_QUERY, ABOUT_QUERY, NEWS_QUERY, LAB_QUERY };
