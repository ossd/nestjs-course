import { Controller, Get } from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller()
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Get('/api/courses')
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }
}
