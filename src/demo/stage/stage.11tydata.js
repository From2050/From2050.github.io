// 讓 persona 資料以 `p` 的形式同時進到頁面與 layout。
export default {
  eleventyComputed: {
    p: (data) => data.demo.stage,
    home: () => "/demo/stage/",
  },
  theme: "stage",
  eleventyExcludeFromCollections: true,
};
