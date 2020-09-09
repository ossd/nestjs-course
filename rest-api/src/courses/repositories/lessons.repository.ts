import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../../../../shared/lesson';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectModel('Lesson')
    private lessonsModel: Model<Lesson & mongoose.Document>,
  ) {}

  search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  ) {
    return this.lessonsModel.find({ course: courseId }, null, {
      skip: pageNumber * pageSize,
      limit: pageSize,
      sort: {
        seqNo: sortOrder,
      },
    });
  }
}
