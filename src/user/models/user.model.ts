import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({tableName: 'users', underscored: true})
export class User extends Model<User> {
    @PrimaryKey
    @Column({type: DataType.STRING, unique: true})
    id: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string;


    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}
