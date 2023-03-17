import sharp from "sharp";
import axios from "axios";
import path from "node:path";
import fs from "node:fs";

const hasOwnProperty = Array.prototype.hasOwnProperty;

function baseAssignValue(object: any, key: any, value: any) {
  if (key == "__proto__") {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true,
    });
  } else {
    object[key] = value;
  }
}

Array.prototype.groupBy = function (iteratee: any): Record<string, any[]> {
  return this.reduce((result, value, key) => {
    key = value[iteratee];
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value);
    } else {
      baseAssignValue(result, key, [value]);
    }
    return result;
  }, {});
};

type Profile = { name: string; job_title: string };

export const prepareStyle = (primaryColor: string, secondaryColor: string) => {
  return {
    styles: {
      h1: {
        fontSize: 72,
        bold: true,
      },
      h2: {
        fontSize: 32,
        bold: true,
      },
      h3: {
        fontSize: 20,
      },
      h4: {
        fontSize: 14,
        bold: true,
      },
      h5: {
        fontSize: 11,
        bold: true,
      },
      p: {
        fontSize: 9,
        alignment: "left",
      },
      li: {
        fontSize: 9,
        lineHeight: 1.5,
        alignment: "left",
      },
      date: {
        fontSize: 9,
      },
      link: {
        decoration: "underline",
      },
      icons: { font: "Icons", characterSpacing: 2 },
      accent: {
        color: "#1E64E8",
      },
    },
    defaultStyle: {
      font: "Arial",
    },
  };
};

export const prepareInfo = ({ name, job_title }: Profile) => {
  return {
    title: `Resume — ${name}`,
    author: name,
    subject: "Resume",
    creator: "Resumo",
    producer: "Resumo",
    keywords: `${job_title}, Resume, Resumo`,
  };
};

const displayProfile = ({ picture, name, meta, contacts }: any) => {
  return {
    fillColor: "#1E64E8",
    color: "#E6E6E6",

    table: {
      widths: [113, "*"],
      body: [
        [
          {
            stack: [
              {
                rowSpan: 4,
                image: picture,
                width: 123,
                height: 188,
                margin: [-5, -2.5, 0, -2.5],
              },
            ],
          },
          {
            margin: 10,
            stack: [
              {
                table: {
                  body: [
                    [
                      {
                        text: "Name",
                        style: "p",
                        bold: true,
                      },
                      {
                        text: name,
                        style: "p",
                      },
                    ],
                    [
                      {
                        text: "Nationality",
                        style: "p",
                        bold: true,
                      },
                      {
                        text: "Serbian",
                        style: "p",
                      },
                    ],
                    [
                      {
                        text: meta.nationality,
                        style: "p",
                        bold: true,
                      },
                      {
                        text: contacts.email_address,
                        link: `mailto:${contacts.email_address}`,
                        style: ["p", "link"],
                      },
                    ],
                    [
                      {
                        text: "Mobile",
                        style: "p",
                        bold: true,
                      },
                      {
                        text: contacts.phone_number,
                        link: `tel:${contacts.phone_number}`,
                        style: ["p", "link"],
                      },
                    ],
                  ],
                },
                layout: {
                  defaultBorder: false,
                },
              },
            ],
          },
        ],
      ],
    },
    layout: {
      defaultBorder: false,
    },
  };
};

const displayDescription = (description: string) => {
  return [
    {
      text: "Profile",
      style: "h4",
    },
    {
      text: description
        .replace(/<[a-z]+>/g, "")
        .replace(/<\/p>/g, "\n")
        .replace(/<br\/>/g, "\n")
        .replace(/<\/[a-z]+>/g, ""),
      style: "p",
    },
  ];
};

const displayProjects = (
  projects: {
    project: string;
    job_title: string;
    start_date: string;
    end_date: string;
    description: string;
  }[]
) => {
  if (projects?.length)
    return [
      { text: "Project experience", style: "h4" },
      projects.map((project) => {
        return [
          {
            table: {
              widths: [80, "*"],
              body: [
                [
                  {
                    text: displayDate(project.start_date, project.end_date),
                    style: "h5",
                  },
                  {
                    text: `${project.project} - ${project.job_title}`,
                    style: "h5",
                  },
                ],
              ],
            },
            layout: "headerLineOnly",
          },
          {
            text: project.description.replace(/<[a-z]+\s\/>/g, "\n"),
            style: "p",
          },
        ];
      }),
    ];
};

const displayExperience = (
  experience: {
    job_title: string;
    company: string;
    start_date: string;
    end_date: string;
    description: string;
  }[],
  education: {
    degree: string;
    start_date: string;
    end_date: string;
    institution: string;
  }[]
) => {
  if (experience?.length)
    return [
      { text: "Career overview", style: "h4" },
      {
        table: {
          widths: [80, "*"],
          body: [
            ...experience.map((exp) => {
              return [
                { text: displayDate(exp.start_date, exp.end_date), style: "p" },
                {
                  text: exp.job_title + " - " + exp.company,
                  style: "p",
                  bold: true,
                },
              ];
            }),
            ...education.map((exp) => {
              return [
                { text: displayDate(exp.start_date, exp.end_date), style: "p" },
                {
                  text: exp.degree + " - " + exp.institution,
                  style: "p",
                  bold: true,
                },
              ];
            }),
          ],
        },
        layout: "headerLineOnly",
      },
    ];
};

const displaySkills = (
  rowSkills: { skill: string; category: string; level: number }[]
) => {
  const groupedSkills = rowSkills.groupBy("category");

  if (rowSkills?.length)
    return [
      { text: "Skills and expertise", style: "h4" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto"],

          body: [
            [
              { text: "Key skills", bold: true },
              { text: "Proficiency level", bold: true },
            ],
            ...Object.entries(groupedSkills).map(([key, skills]) => {
              return [
                {
                  stack: [
                    { text: key, style: ["p", "accent"] },
                    {
                      ul: skills.map((skill) => ({
                        text: skill.skill,
                        style: ["p"],
                      })),
                    },
                  ],
                },
                {
                  margin: [0, 10, 0, 0],
                  stack: skills.map((skill) => {
                    return skill?.rate > 0
                      ? {
                          // text: "",
                          text: Array.from(
                            { length: skill?.rate },
                            () => ""
                          ).join(""),
                          style: ["p", "icons"],
                        }
                      : { text: "   ", style: ["p", "icons"] };
                  }),
                },
              ];
            }),
          ],
        },
      },
      { text: "Proficiency levels:", style: "h4" },
      {
        text: [
          { text: "   ", style: ["p", "icons"] },
          { text: "No experience", style: "p" },
        ],
      },
      {
        text: [
          { text: "   ", style: ["p", "icons"] },
          {
            text: "Basic Experience – average practical proficiency",
            style: "p",
          },
        ],
      },
      {
        text: [
          { text: "  ", style: ["p", "icons"] },
          {
            text: "On good theoretical and practical level. Can work independent",
            style: "p",
          },
        ],
      },
      {
        text: [
          { text: " ", style: ["p", "icons"] },
          {
            text: "Above average in experience and knowledge. Ability to lead and coach",
            style: "p",
          },
        ],
      },
      {
        text: [
          { text: "", style: ["p", "icons"] },
          {
            text: "Expert. Ability to architect, consult and advice end-to-end",
            style: "p",
          },
        ],
      },
    ];
};

const cropImageBuffer = async (buffer: any) => {
  return await sharp(buffer)
    .resize(123 * 2, 188 * 2, {
      fit: "cover",
    })
    .jpeg()
    .toBuffer();
};

const displayDate = (start: string, end: string) =>
  `${start?.split("-").at(0) || "Past"} - ${
    end?.split("-").at(0) || "Present"
  }`;

export const toDataURL = (url: string) =>
  url?.endsWith(".svg")
    ? axios({ url })
        .then(({ data }: any) => data)
        .then((text) => {
          return { svg: text, alignment: "right", fit: [150, 150] };
        })
    : axios({ url, responseType: "arraybuffer" })
        .then(({ data }: any) => data)
        .then(async (buffer) => {
          const roundedBuffer = await cropImageBuffer(buffer);

          const base64 = roundedBuffer.toString("base64");

          return `data:image/jpg;base64,${base64}`;
        });

export const prepareContent = async (resume: any) => {
  const {
    picture,
    name,
    job_title,
    meta,
    description,
    services,
    projects,
    experience,
    education,
    skills,
    languages,
    contacts,
  } = resume;

  const profilePicture = await toDataURL(picture);

  return {
    footer: function (currentPage: number) {
      const svg = fs.readFileSync(
        path.join(
          process.cwd(),
          "src",
          "pdf",
          "valcon",
          "assets",
          "valcon-logo.svg"
        ),
        { encoding: "utf8", flag: "r" }
      );

      return currentPage > 1
        ? {
            columns: [
              {
                text: currentPage,
                style: "p",
                margin: [0, 4.5],
              },
              {
                svg,
                alignment: "right",
              },
            ],
            margin: [40, 0],
          }
        : null;
    },

    background: function (currentPage: number, pageSize: any) {
      const svg = fs.readFileSync(
        path.join(
          process.cwd(),
          "src",
          "pdf",
          "valcon",
          "assets",
          "valcon-cover.svg"
        ),
        { encoding: "utf8", flag: "r" }
      );

      return currentPage === 1
        ? {
            width: pageSize.width,
            svg,
          }
        : null;
    },

    content: [
      {
        text: "Curriculum vitae",
        style: "h5",
      },
      {
        text: "Implementing the future",
        style: "h1",
      },
      {
        text: name,
        style: "h3",
        pageBreak: "after",
      },
      {
        columns: [
          {
            width: "20%",
            stack: [],
          },
          {
            width: "80%",
            stack: [
              { text: "Curriculum vitae", style: "h2" },
              displayProfile({
                picture: profilePicture,
                name,
                meta,
                contacts,
              }),
              displayExperience(experience, education),
              displayDescription(description),
              displayProjects(projects),
              displaySkills(skills),
            ],
          },
        ],
      },
    ],
  };
};
