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
    return queryInterface.bulkInsert('Users', [{
      first_name : 'Jhon',
      last_name : 'Doe',
      username : 'jhondoe',
      password : '1234',
      email : 'jhondoe@mail.com',
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      first_name : 'Ahmad',
      last_name : 'Nizar',
      username : 'nizarahmad',
      password : '2345',
      email : 'nizarahmad2mail.com',
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users')
  }
};
