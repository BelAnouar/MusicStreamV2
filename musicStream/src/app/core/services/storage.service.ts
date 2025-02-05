import { Injectable, inject, PLATFORM_ID } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import { type Observable, from, of } from "rxjs"
import type { Track } from "../models/track.model"
import { openDB, type DBSchema, type IDBPDatabase } from "idb"

interface MusicStreamDB extends DBSchema {
  tracks: {
    key: string
    value: Track
  }
  audioFiles: {
    key: string
    value: {
      id: string
      data: Blob
    }
  }
}

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private platformId = inject(PLATFORM_ID)
  private dbInstance: IDBPDatabase<MusicStreamDB> | null = null

  private async getDB(): Promise<IDBPDatabase<MusicStreamDB> | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return null
    }

    if (!this.dbInstance) {
      this.dbInstance = await openDB<MusicStreamDB>("MusicStreamDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("tracks")) {
            db.createObjectStore("tracks", { keyPath: "id" })
          }
          if (!db.objectStoreNames.contains("audioFiles")) {
            db.createObjectStore("audioFiles", { keyPath: "id" })
          }
        },
      })
    }

    return this.dbInstance
  }

  getAllTracks(): Observable<Track[]> {
    return from(
      this.getDB().then((db) => {
        if (!db) return []
        return db.getAll("tracks")
      })
    )
  }

  getTrack(id: string): Observable<Track | undefined> {
    return from(
      this.getDB().then((db) => {
        if (!db) return undefined
        return db.get("tracks", id)
      })
    )
  }

  addTrack(track: Track): Observable<Track> {
    return from(
      this.getDB().then(async (db) => {
        if (!db) return track
        await db.add("tracks", track)
        return track
      })
    )
  }

  updateTrack(track: Track): Observable<Track> {
    return from(
      this.getDB().then(async (db) => {
        if (!db) return track
        await db.put("tracks", track)
        return track
      })
    )
  }

  deleteTrack(id: string): Observable<void> {
    return from(
      this.getDB().then(async (db) => {
        if (!db) return
        await db.delete("tracks", id)
        await db.delete("audioFiles", id)
      })
    )
  }

  saveAudioFile(id: string, audioBlob: Blob): Observable<string> {
    return from(
      this.getDB().then(async (db) => {
        if (!db) {
          console.error("Database not initialized.");
          return id;
        }
        try {
          await db.put("audioFiles", { id, data: audioBlob });
          return id;
        } catch (error) {
          console.error("Error saving blob to IndexedDB:", error);
          return id;
        }
      })
    );
  }

  getAudioFile(id: string): Observable<Blob | undefined> {
    return from(
      this.getDB().then(async (db) => {
        if (!db) {
          console.error("Database not initialized.");
          return undefined;
        }
        try {
          const result = await db.get("audioFiles", id);
          if (!result) {
            console.warn(`Blob with ID ${id} not found.`);
          }
          return result?.data;
        } catch (error) {
          console.error("Error retrieving blob from IndexedDB:", error);
          return undefined;
        }
      })
    );
  }

}
