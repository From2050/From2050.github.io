// 讓 persona 資料以 `p` 的形式同時進到頁面與 layout。
export default {
  eleventyComputed: {
    p: (data) => data.demo.journal,
    home: () => "/demo/journal/",
  },
  theme: "journal",
  eleventyExcludeFromCollections: true,
};
