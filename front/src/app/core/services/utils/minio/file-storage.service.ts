import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {environment} from "../../../../../environments/environment";
import {FileUrlResponse} from "../../../../models/interfaces/utils/file-url-response.interface";
import {ApiResponse} from "../../../../models/interfaces/utils/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  private readonly API_URL = `${environment.apiUrl}/files`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, objectId: string): Observable<FileUrlResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<ApiResponse<FileUrlResponse>>(
        `${this.API_URL}/upload/${objectId}`,
        formData
      )
      .pipe(map(response => response.data));
  }

  getFilesByObjectId(objectId: string): Observable<FileUrlResponse[]> {
    return this.http
      .get<ApiResponse<FileUrlResponse[]>>(`${this.API_URL}/object/${objectId}`)
      .pipe(map(response => response.data));
  }

  deleteFile(objectId: string, fileName: string): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`${this.API_URL}/${objectId}/${fileName}`)
      .pipe(map(response => response.data));
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isValidFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.type);
  }
}
