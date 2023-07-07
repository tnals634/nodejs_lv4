'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('count_likes', {
      count_like_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'posts', // posts 모델을 참조합니다.
          key: 'post_id', // posts 모델의 post_id를 참조합니다.
        },
        onDelete: 'CASCADE',
      },
      count: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('count_likes');
  },
};
