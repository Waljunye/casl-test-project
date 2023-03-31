import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponseSchemaHost } from '@nestjs/swagger/dist/decorators/api-response.decorator';

const buildErrorSchema = (exception: any): ApiResponseSchemaHost => {
    const response = exception.getResponse();
    const status = exception.getStatus();
    const error = response?.error || `Ошибка ${status}`;
    const message = response?.message || response?.error;

    return {
        status: status,
        description: `<b>${error}</b>: ${message}`,
        schema: {
            type: 'object',
            properties: {
                statusCode: {type: 'integer', example: status},
                error: {type: 'string', example: error},
                message: {type: 'string', example: message}
            }
        }
    };
};


export class UnauthorizedException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: 'unauthorized',
            message: message || 'Необходима авторизация'
        };
        super(schema, schema.statusCode);
    }
}

export class InvalidSessionException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.UNAUTHORIZED,
            error: 'invalid_session',
            message: message || 'Недействительная сессия. Необходима повторная авторизация'
        };
        super(schema, schema.statusCode);
    }
}

export class AccessDeniedException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.FORBIDDEN,
            error: 'access_denied',
            message: message || 'Недостаточно прав'
        };
        super(schema, schema.statusCode);
    }
}

export class UserNotFoundException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'user_not_found',
            message: message || 'Пользователь не найден'
        };
        super(schema, schema.statusCode);
    }
}

export class IncorrectPasswordException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.FORBIDDEN,
            error: 'incorrect_password',
            message: message || 'Неверный пароль'
        };
        super(schema, schema.statusCode);
    }
}

export class ProductNotFoundException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'product_not_found',
            message: message || 'Продукт не найден'
        };
        super(schema, schema.statusCode);
    }
}

export class ProductAlreadyExistException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'product_already_exist',
            message: message || 'Продукт уже существует'
        };
        super(schema, schema.statusCode);
    }
}

export class TagAlreadyExistException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'tag_already_exist',
            message: message || 'Тэг уже существует'
        };
        super(schema, schema.statusCode);
    }
}

export class TagNotFoundException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'tag_not_found',
            message: message || 'Тэг не найден'
        };
        super(schema, schema.statusCode);
    }
}

export class RoleNotFoundException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'role_not_found',
            message: message || 'Роль не найдена'
        };
        super(schema, schema.statusCode);
    }
}

export class TransactionException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'transaction_exception(WTF)',
            message: message || 'Транзакция не выполнена'
        };
        super(schema, schema.statusCode);
    }
}

export class RelationNotFoundException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'relation_not_found_exception',
            message: message || 'Связь не найдена'
        };
        super(schema, schema.statusCode);
    }
}

export class OrderNotFoundException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'order_not_found_exception',
            message: message || 'Заказ не найден'
        };
        super(schema, schema.statusCode);
    }
}

export class OrderCreationException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'order_creation_error',
            message: message || 'ошибка создания заказа'
        };
        super(schema, schema.statusCode);
    }
}

export class AttrNotRequestedException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Attribute_not_requested_exception',
            message: message || 'ошибка создания заказа'
        };
        super(schema, schema.statusCode);
    }
}

export class AttributeException extends HttpException {
    constructor(message: string = '') {
        const schema = {
            statusCode: HttpStatus.CONFLICT,
            error: 'Attribute_exception',
            message: message || 'Неправильно указан тип параметра'
        };
        super(schema, schema.statusCode);
    }
}

export const Errors = {
    UnauthorizedException: buildErrorSchema(new UnauthorizedException()),
    InvalidSessionException: buildErrorSchema(new InvalidSessionException()),
    AccessDeniedException: buildErrorSchema(new AccessDeniedException()),
    UserNotFoundException: buildErrorSchema(new UserNotFoundException()),
    IncorrectPasswordException: buildErrorSchema(new IncorrectPasswordException()),
    ProductNotFoundException: buildErrorSchema(new ProductNotFoundException()),
    ProductAlreadyExist: buildErrorSchema(new ProductAlreadyExistException()),
    TagAlreadyExist: buildErrorSchema(new TagAlreadyExistException()),
    TagNotFoundException: buildErrorSchema(new TagNotFoundException()),
    RelationNotFoundException: buildErrorSchema(new TagNotFoundException('Связь не найдена')),
    TransactionException: buildErrorSchema(new TransactionException()),
    RoleNotFoundException: buildErrorSchema(new RoleNotFoundException()),
    ProductRelationNotFoundException: buildErrorSchema(new RelationNotFoundException()),
    OrderNotFoundException: buildErrorSchema(new OrderNotFoundException()),
    OrderCreationException: buildErrorSchema(new OrderCreationException()),
    AttrNotRequestedException: buildErrorSchema(new AttrNotRequestedException()),
    AttributeException: buildErrorSchema(new AttributeException())
};
