import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from './user.model';

@Table({tableName: 'user_tokens', underscored: true})
export class UserToken extends Model<UserToken>{
    @PrimaryKey
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    refresh_token: string;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column({type: DataType.STRING, unique: false})
    user_id: string;

    @CreatedAt
    @Column({type: DataType.DATE, allowNull: false})
    created_at: Date;

    @UpdatedAt
    @Column({type: DataType.DATE, allowNull: false})
    updated_at: Date;
}
