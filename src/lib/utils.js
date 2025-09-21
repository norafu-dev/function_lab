export function getImageInfo(url) {
  const extension = url.substring(url.lastIndexOf("-") + 1);
  const fileNameRegex = new RegExp("image-(.*?)-" + extension);
  const resolutionRegex = new RegExp("-(\\d+x\\d+)-");

  const fileName = url.match(fileNameRegex);
  const imgUrl =
    `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/` +
    fileName[1] +
    "." +
    extension;

  const resolution = url.match(resolutionRegex);

  const ratio =
    parseInt(resolution[1].split("x")[0]) /
    parseInt(resolution[1].split("x")[1]);

  return { imgUrl, ratio };
}

export function formatDate(dateString) {
  const [year, month] = dateString.split("-");
  const paddedMonth = month.padStart(2, "0");

  return `${year}_${paddedMonth}`;
}

export function getVideoUrl(url) {
  const extension = url.substring(url.lastIndexOf("-") + 1);
  const fileNameRegex = new RegExp("file-(.*?)-" + extension);
  const fileName = url.match(fileNameRegex);
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${fileName[1]}.${extension}`;
}

export function renderStarEmphasis(text) {
  const parts = [];
  let last = 0;
  const re = /\*(.+?)\*/g;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last)
      parts.push(<span key={i++}>{text.slice(last, m.index)}</span>);
    parts.push(
      <span key={i++} className="text-secondary">
        {m[1]}
      </span>
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(<span key={i++}>{text.slice(last)}</span>);
  return parts;
}
