import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { ValidationException } from "src/exeptions/validation.exeption";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors: ValidationError[] = await validate(obj);

    if (errors.length) {
      let messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      })
      throw new ValidationException(messages)
    }
    return value;
  }
}