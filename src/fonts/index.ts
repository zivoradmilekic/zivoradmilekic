import path from "node:path";

export default {
  Inter: {
    normal: path.join(
      process.cwd(),
      "src",
      "fonts",
      "Inter",
      "Inter-Regular.ttf"
    ),
    bold: path.join(
      process.cwd(),
      "src",
      "fonts",
      "Inter",
      "Inter-ExtraBold.ttf"
    ),
  },
};
