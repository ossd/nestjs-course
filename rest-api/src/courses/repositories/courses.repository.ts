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

  async update(courseId: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
      new: true,
    });
  }
}
