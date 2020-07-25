import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Course } from '../../../../shared/course';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel('Course')
    private courseModel: Model<Course & mongoose.Document>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }
}
