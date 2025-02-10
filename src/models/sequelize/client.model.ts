import { Model, DataTypes, Sequelize } from "sequelize";

export default class Client extends Model {
  public id!: number;
  public name!: string;
  public addressLine1!: string;
  public addressLine2?: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
}

export const initClientModel = (sequelize: Sequelize) => {
  Client.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "clients",
      timestamps: false,
    }
  );
};
