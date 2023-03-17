import path from "node:path";

export default {
  Arial: {
    normal: path.join(
      process.cwd(),
      "src",
      "fonts",
      "Arial",
      "Arial-Regular.ttf"
    ),
    bold: path.join(process.cwd(), "src", "fonts", "Arial", "Arial-Bold.ttf"),
    italics: path.join(
      process.cwd(),
      "src",
      "fonts",
      "Arial",
      "Arial-Italic.ttf"
    ),
    bolditalics: path.join(
      process.cwd(),
      "src",
      "fonts",
      "Arial",
      "Arial-BoldItalic.ttf"
    ),
  },
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
  Icons: {
    normal: path.join(
      process.cwd(),
      "src",
      "fonts",
      "Icons",
      "Icons-Regular.ttf"
    ),
  },
};
