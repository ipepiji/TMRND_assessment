'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('task', {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      hour: {
        type: Sequelize.DataTypes.DOUBLE(24, 2),
        allowNull: false
      },
      req_hour: {
        type: Sequelize.DataTypes.DOUBLE(24, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('task');
  }
};
