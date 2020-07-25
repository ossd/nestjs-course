import { Controller, Get, Put, Param, Body, Delete } from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller('courses')
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Partial<Course>,
  ): Promise<Course> {
    return this.coursesDB.update(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courceId: string) {
    return this.coursesDB.delete(courceId);
  }
}
