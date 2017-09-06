module.exports = function(sequelize, DataTypes) {

  let models = sequelize.define("models", {

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true
    },
    current_city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aff_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    }

  });
  return models;
};
