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

  async add(course: Partial<Course>): Promise<Course> {
    const newCourse = await this.courseModel.create(course);
    newCourse.save();
    return newCourse.toObject({ versionKey: false });
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findCourseByUrl(courceUrl: string): Promise<Course> {
    return this.courseModel.findOne({ url: courceUrl });
  }

  async update(courseId: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
      new: true,
    });
  }

  delete(courseId: string) {
    return this.courseModel.deleteOne({ _id: courseId });
  }
}
