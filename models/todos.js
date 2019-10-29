'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('todos', {
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: "title must be atleast 3 characters in length"
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateActivity: DataTypes.DATE,
    completed: DataTypes.BOOLEAN
  }, {});
  Todos.associate = function (models) {
    // associations can be defined here
  };
  return Todos;
};