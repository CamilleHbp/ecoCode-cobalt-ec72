const users = [...Array(100000).keys()].map((i) => ({
      firstname: `User ${i + 1}`,
      lastname: `Lastname ${i + 1}`
}));

export default users;

export function getUsers(size) {
      return ([...Array(size).keys()].map((i) => ({
            firstname: `User ${i + 1}`,
            lastname: `Lastname ${i + 1}`
      })));
}



