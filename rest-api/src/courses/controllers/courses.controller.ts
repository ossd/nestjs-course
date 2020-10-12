import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Delete,
  Post,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';
import { AuthentitationGuard } from '../../guards/authentication.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('courses')
@UseGuards(AuthentitationGuard)
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Post()
  @UseGuards(AdminGuard)
  async createCourse(@Body() course: Course): Promise<Course> {
    return this.coursesDB.add(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Get(':courseUrl')
  async findCourseByUrl(
    @Param('courseUrl') courseUrl: string,
  ): Promise<Course> {
    const course = await this.coursesDB.findCourseByUrl(courseUrl);

    if (!course) {
      throw new NotFoundException('Could not find course for url ' + courseUrl);
    }

    return course;
  }

  @Put(':courseId')
  @UseGuards(AdminGuard)
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Course,
  ): Promise<Course> {
    if (changes._id) {
      throw new BadRequestException("Can't update course id");
    }

    return this.coursesDB.update(courseId, changes);
  }

  @Delete(':courseId')
  @UseGuards(AdminGuard)
  async deleteCourse(@Param('courseId') courceId: string) {
    return this.coursesDB.delete(courceId);
  }
}
