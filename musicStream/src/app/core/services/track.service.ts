import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable } from "rxjs"
import  { Track } from "../models/track.model"

@Injectable({
  providedIn: "root",
})
export class TrackService {
  private apiUrl = "http://localhost:8080/api/chanson"

  constructor(private http: HttpClient) {}

  addTrack(formData: FormData): Observable<Track> {
    return this.http.post<Track>(this.apiUrl, formData)
  }

  getTracks(pageNo = 0, pageSize = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?pageNo=${pageNo}&pageSize=${pageSize}`)
  }

  updateTrack(id: string, formData: FormData): Observable<Track> {
    return this.http.put<Track>(`${this.apiUrl}/${id}`, formData)
  }

  deleteTrack(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  getTrackByTitle(title: string): Observable<Track> {
    return this.http.get<Track>(`${this.apiUrl}/title?title=${title}`)
  }

  getAudioFile(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/audio`, { responseType: "blob" })
  }
}

