# ecoCode-cobalt-ec72
Testing the EC72 rule for the ecoCode challenge

Linked to [ecoCode Challenge Issue #101](https://github.com/green-code-initiative/ecoCode-challenge/issues/101)

# Main idea

The idea is to run SQL insertion into a database, and mesure CPU, RAM and Network consumption in a docker engine.

For two cases, we generate an array of user to insert, number can be set in __db.js__.

First case, each insertion is done in a loop, with a dedicated sql insertion

Second case, all users are inserted in a singla sql query.


# Install prerequisites

You can run the code in a devcontainer, which will launch the database and the metrics service [cAdvisor](https://github.com/google/cadvisor)

To run the version with a forEach loop :
```bash
$npm run loop
```
To run the version with a single SQL insert:
```bash
$npm run noloop
```
# Measure


