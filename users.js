const users = [...Array(10).keys()].map((i) => ({
      firstname: `User ${i + 1}`,
      lastname: `Lastname ${i + 1}`
}));

export default users;
