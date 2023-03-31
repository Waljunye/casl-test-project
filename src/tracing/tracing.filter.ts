import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

@Catch()
export class TracingExceptionFilter implements ExceptionFilter {
    private readonly httpAdapter: FastifyAdapter;

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost
    ) {
        this.httpAdapter = <FastifyAdapter>httpAdapterHost.httpAdapter;
    }

    private logger = new Logger(TracingExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost): any {

        const ctx = host.switchToHttp();
        const response: FastifyReply = ctx.getResponse();

        const msg = `${exception?.name && exception.name + ' '}${exception.message}`;
        this.logger.error(msg, !(exception instanceof HttpException) && exception.stack);

        const exceptionResponse = exception?.getResponse && exception.getResponse() || null;
        const exceptionStatus = exception?.getStatus && exception.getStatus() || null;

        const body = exceptionResponse ? {
                statusCode: exceptionResponse?.statusCode,
                error: exceptionResponse?.error || exceptionResponse?.message,
                message: exceptionResponse?.message || exceptionResponse?.error
            } :
            exception instanceof HttpException && exceptionStatus ? {
                statusCode: exceptionStatus,
                error: exception?.name || 'internal_server_error',
                message: exception?.message || 'Внутренняя ошибка сервера'
            } : {
                statusCode: exception?.statusCode || 500,
                error: exception?.error || 'internal_server_error',
                message: exception?.message || 'Внутренняя ошибка сервера'
            };

        const responseBody = {
            statusCode: body.statusCode,
            error: body.error,
            message: body.message,
            timestamp: new Date().toISOString()
        };

        // @ts-ignore
        this.httpAdapter.reply(response, responseBody, responseBody.statusCode);
    }
}
