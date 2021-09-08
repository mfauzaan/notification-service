import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassType<T> {
  new (): T;
}

export interface Response<T> {
  data: T;
}

@Injectable()
export class SerializerInterceptor<T>
  implements NestInterceptor<Response<T>, T> {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map(data => {
        return plainToClass(
          this.classType,
          classToPlain(JSON.parse(JSON.stringify(data))),
          {
            excludeExtraneousValues: true,
            enableImplicitConversion: false,
          },
        );
      }),
    );
  }
}
