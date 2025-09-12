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

const WORK_QUERY_BY_SLUG = defineQuery(`
  *[_type == "work" && slug.current == $slug][0]{
    title,
    tags,
    year,
    description,
    credits,
    workPageOrder,
    "cover": select(
      defined(cover.video.file.asset) => {
        "type": "video",
        "file": cover.video.file.asset._ref,
        "thumbnail": cover.video.thumbnail.asset._ref
      },
      defined(cover.image.asset) => {
        "type": "image",
        "image": cover.image.asset._ref
      }
    ),

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
    ),

    "rows": [
      coalesce(row1, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row2, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row3, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row4, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row5, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row6, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row7, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row8, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row9, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row10, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row11, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row12, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row13, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row14, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row15, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref },
      coalesce(row16, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref }
    ]
  }
`);

const NEXT_WORK_BY_WORK_PAGE_ORDER = defineQuery(`
  *[_type == "work" && workPageOrder == $workPageOrder][0]{ "slug": slug.current }
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

export {
  HOMEPAGE_QUERY,
  WORKS_QUERY,
  ABOUT_QUERY,
  NEWS_QUERY,
  LAB_QUERY,
  WORK_QUERY_BY_SLUG,
  NEXT_WORK_BY_WORK_PAGE_ORDER,
};
