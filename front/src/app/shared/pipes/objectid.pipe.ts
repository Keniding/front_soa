// objectid.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { ObjectId } from 'mongodb';

@Pipe({
  standalone: true,
  name: 'objectId'
})
export class ObjectidPipe implements PipeTransform {
  transform(value: ObjectId): string {
    return value.toString();
  }
}
