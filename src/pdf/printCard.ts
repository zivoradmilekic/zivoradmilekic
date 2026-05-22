import axios from "axios";

export const toDataURL = (url: string) =>
  axios({ url, responseType: "arraybuffer" })
    .then(({ data }: any) => {
      console.log({ data });

      return data;
    })
    .then(async (buffer) => {
      return buffer.toString("base64");
    });

export const printCard = async (resume: any) => {
  const { picture, name, jobTitle, contacts } = resume;

  return `
BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${name}
N;CHARSET=UTF-8:${name.split(" ").reverse().join(";")}
PHOTO;ENCODING=b;TYPE=JPEG:${await toDataURL(picture)}
TITLE:${jobTitle}
TEL;WORK;VOICE:${contacts.phoneNumber}
EMAIL;WORK;INTERNET:${contacts.emailAddress}
URL:${contacts.webAddress}
END:VCARD
  `;
};
