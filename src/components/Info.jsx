const Info = ({ info }) => {
  const renderStarEmphasis = (text) => {
    const parts = [];
    let last = 0;
    const re = /\*(.+?)\*/g;
    let m;
    let i = 0;

    while ((m = re.exec(text)) !== null) {
      if (m.index > last) {
        parts.push(<span key={i++}>{text.slice(last, m.index)}</span>);
      }
      parts.push(
        <span key={i++} className="text-[#8C8C8C]">
          {m[1]}
        </span>
      );
      last = re.lastIndex;
    }
    if (last < text.length) {
      parts.push(<span key={i++}>{text.slice(last)}</span>);
    }
    return parts;
  };

  return (
    <h1 className="w-full px-[15px] md:px-[30px] mt-[400px] mb-[200px] text-md">
      {renderStarEmphasis(info)}
    </h1>
  );
};

export default Info;
