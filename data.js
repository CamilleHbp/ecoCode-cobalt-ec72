export const users = [];
for (let i = 0; i < 10000; i++) {
  const user = {
    firstname: `User ${i + 1}`,
    lastname: `Lastname ${i + 1}`
  };
  users.push(user);
}
