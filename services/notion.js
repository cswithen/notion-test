const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");
// https://developers.notion.com/reference/post-database-query

//Initialize a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

module.exports = async function getClasses() {
  const payload = {
    path: `databases/${database_id}/query`,
    method: "POST",
  };
  const { results } = await notion.request(payload);

  // const tagText = [];
  // results[0].properties.Tags.multi_select.map((tag) => {
  //   tagText.push(tag.name);
  // });

  // console.log(tagText.join(", "));

  const classes = results.map((page) => {
    const tagText = [];
    const url = page.properties.UdemyURL.url.split("/learn")[0];
    page.properties.Tags.multi_select.map((tag) => {
      tagText.push(tag.name);
    });

    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      url: url,
      status: page.properties.Status.select.name,
      tags: tagText.join(", "),
    };
  });

  return classes;
};
