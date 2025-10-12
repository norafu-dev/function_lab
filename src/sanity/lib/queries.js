import { defineQuery } from "next-sanity";

const HOMEPAGE_QUERY = defineQuery(
  `*[_type == "home"]{
    "file": video.file.asset._ref,
    "thumbnail": video.thumbnail.asset._ref
  }[0]`
);

const WORKS_QUERY = defineQuery(`
  *[_type == "work"] | order(workPageOrder asc, title asc){
      title,
      "slug": slug.current,
      "category": coalesce(category, []),
      "hero": select(
        defined(cover.video.file.asset) => {
          "type": "video",
          "file": cover.video.file.asset._ref,
          "thumbnail": cover.video.thumbnail.asset._ref
        },
        defined(cover.image.asset) => {
          "type": "image",
          "image": cover.image.asset._ref
        }
      )
    }
  `);

const WORKS_QUERY_IN_HOMEPAGE = defineQuery(`
  *[_type == "work" && homepage == true] | order(homepageOrder asc, title asc){
    title,
    "slug": slug.current,
    "hero": select(
      defined(cover.video.file.asset) => {
        "type": "video",
        "file": cover.video.file.asset._ref,
        "thumbnail": cover.video.thumbnail.asset._ref
      },
      defined(cover.image.asset) => {
        "type": "image",
        "image": cover.image.asset._ref
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
      coalesce(row1, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row2, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row3, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row4, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row5, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row6, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay  },
      coalesce(row7, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row8, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row9, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row10, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row11, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row12, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row13, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row14, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row15, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row16, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row17, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row18, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row19, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay },
      coalesce(row20, [])[]{ "type": select(defined(video.file.asset) => "video", defined(image.asset) => "image"), "image": image.asset._ref, "file": video.file.asset._ref, "thumbnail": video.thumbnail.asset._ref, "autoplay": video.autoplay }
    ]
  }
`);

const NEXT_WORK_BY_WORK_PAGE_ORDER = defineQuery(`
  *[_type == "work" && workPageOrder == $workPageOrder][0]{ "slug": slug.current }
`);

const FIRST_WORK_BY_WORK_PAGE_ORDER = defineQuery(`
  *[_type == "work"] | order(workPageOrder asc)[0]{ "slug": slug.current }
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

const NEWS_QUERY_IN_HOMEPAGE = defineQuery(`
  *[_type == "news"] | order(date desc)[0...6]{
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

const INFO_QUERY_BY_KEY = defineQuery(
  `*[_type == "info" && key == $key][0]{
    content,
    mobileContent,
    secondaryContent
  }`
);

export {
  HOMEPAGE_QUERY,
  WORKS_QUERY,
  ABOUT_QUERY,
  NEWS_QUERY,
  LAB_QUERY,
  WORK_QUERY_BY_SLUG,
  WORKS_QUERY_IN_HOMEPAGE,
  NEXT_WORK_BY_WORK_PAGE_ORDER,
  FIRST_WORK_BY_WORK_PAGE_ORDER,
  NEWS_QUERY_IN_HOMEPAGE,
  INFO_QUERY_BY_KEY,
};
