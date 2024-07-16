let url = "";

function log(message) {
  return message;
}

function pringDate() {
  let date = new Date();
  return date.getDate();
}

// module.exports = { log, pringDate };

const data = [
  {
    id: 1,
    title: "data one",
  },
  { id: 2, title: "data Two" },
];

// export const getData = () => data;
const getData = () => data;

export const getDataLenght = () => data.length;

export default getData;
