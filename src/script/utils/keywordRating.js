export default function keywordRating(data) {
  const keywords = [];
  data.forEach((article) => {
    if (!keywords.some(word => {return word === article.keyword})) {
      keywords.push(article.keyword)
    }
  })
  return keywords;
}