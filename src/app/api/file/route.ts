import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { error: '' },
        { status: 400 }
      );
    }

    const mockDataDir = path.join(process.cwd(), 'mock-data');
    const filePath = path.join(mockDataDir, fileName);

    if (!filePath.startsWith(mockDataDir)) {
      return NextResponse.json(
        { error: '' },
        { status: 403 }
      );
    }

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      
      const ext = path.extname(fileName);
      let contentType = 'text/plain';
      
      if (ext === '.json') {
        contentType = 'application/json';
      } else if (ext === '.ts' || ext === '.js') {
        contentType = 'application/javascript';
      }

      return new NextResponse(fileContent, {
        headers: {
          'Content-Type': contentType,
        },
      });
    } catch (error) {
      return NextResponse.json(
        "empty file",
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: '' },
      { status: 500 }
    );
  }
} 