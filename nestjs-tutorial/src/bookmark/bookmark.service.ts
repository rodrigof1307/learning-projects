import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: { userId },
    });
  }

  getBookmarkById(userId: number, id: number) {
    return this.prisma.bookmark.findFirst({
      where: { userId, id },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        ...dto,
        userId,
      },
    });

    return bookmark;
  }

  async editBookmarkbyId(userId: number, id: number, dto: EditBookmarkDto) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to Resource Denied ');
    }

    return this.prisma.bookmark.update({
      where: { id },
      data: dto,
    });
  }

  async deleteBookmarkById(userId: number, id: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to Resource Denied ');
    }

    return this.prisma.bookmark.delete({
      where: { id },
    });
  }
}
