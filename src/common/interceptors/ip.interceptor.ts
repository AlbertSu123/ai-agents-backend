import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const headers = context.switchToHttp().getRequest().headers;

    let realIp: string;
    if (headers['x-real-ip']) {
      realIp = headers['x-real-ip'];
    } else if (headers['x-forwarded-for']) {
      realIp = headers['x-forwarded-for'].split(',')[0];
    }
    context.switchToHttp().getRequest().realIp = realIp;

    return next.handle();
  }
}
