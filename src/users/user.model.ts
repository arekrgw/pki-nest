import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  email: string;
}
