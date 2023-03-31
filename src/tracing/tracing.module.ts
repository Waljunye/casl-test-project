import { Module } from '@nestjs/common';
import { TracingExceptionFilter } from './tracing.filter';

@Module({
    exports: [TracingExceptionFilter],
    providers: [TracingExceptionFilter]
})
export class TracingModule {}
