import { Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';

interface PostCreationAttrs{
    id: string;
    user_id: string;
    title: string;
    text: string;
}
@Table({tableName: 'posts', underscored: true})
export class Post extends Model<Post, PostCreationAttrs> {
    @PrimaryKey
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column
    user_id: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.TEXT, unique: false, allowNull: true})
    text: string;

    @CreatedAt
    @Column({type: DataType.DATE, allowNull: false})
    created_at: Date;

    @UpdatedAt
    @Column({type: DataType.DATE, allowNull: false})
    updated_at: Date;
}
