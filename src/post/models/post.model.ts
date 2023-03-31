import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({tableName: 'posts', underscored: true})
export class Post extends Model<Post> {
    @PrimaryKey
    @Column({type: DataType.INTEGER, unique: true})
    id: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.TEXT, unique: false, allowNull: true})
    text: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
}
