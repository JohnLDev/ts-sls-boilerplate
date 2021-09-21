/* eslint-disable @typescript-eslint/naming-convention */
import { IUserEntity } from '@domain/entities/userEntity'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@framework/database'

export class UserModel extends Model {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserModel extends IUserEntity {}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    sequelize,
  },
)
