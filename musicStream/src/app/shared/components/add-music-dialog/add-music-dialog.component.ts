import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MusicCategory, TrackForm} from "../../../core/models/track.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-music-dialog',
  templateUrl: './add-music-dialog.component.html',
  styleUrl: './add-music-dialog.component.scss'
})
export class AddMusicDialogComponent implements OnInit {
  trackForm: FormGroup
  categories = Object.values(MusicCategory)
  coverImage: File | null = null
  audioFile: File | null = null

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddMusicDialogComponent>,
  ) {
    this.trackForm = this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(50)]],
      artist: ["", [Validators.required]],
      description: ["", [Validators.maxLength(200)]],
      category: ["", [Validators.required]],
      coverImage: [null],
      audioFile: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.trackForm.valid) {
      const formData = new FormData()
      Object.keys(this.trackForm.controls).forEach((key) => {
        const control = this.trackForm.get(key)
        if (control?.value) {
          formData.append(key, control.value)
        }
      })
      if (this.coverImage) {
        formData.append("coverImage", this.coverImage, this.coverImage.name)
      }
      if (this.audioFile) {
        formData.append("audioFile", this.audioFile, this.audioFile.name)
      }
      this.dialogRef.close(formData)
    }
  }

  onFileSelected(event: Event, fileType: "coverImage" | "audioFile"): void {
    const element = event.currentTarget as HTMLInputElement
    const fileList: FileList | null = element.files
    if (fileList) {
      const file = fileList[0]
      if (fileType === "coverImage") {
        this.coverImage = file
      } else {
        this.audioFile = file
      }
      this.trackForm.patchValue({ [fileType]: file.name })
      this.trackForm.get(fileType)?.updateValueAndValidity()
    }
  }
}

