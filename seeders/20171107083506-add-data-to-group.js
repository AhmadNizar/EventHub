'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Groups', [{
      name_of_group : 'Hacktiv8',
      category : 'tech',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name_of_group : 'Foodies',
      category : 'food',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      name_of_group : 'JJS',
      category : 'traveling',
      createdAt : new Date(),
      updatedAt : new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

  }
};
