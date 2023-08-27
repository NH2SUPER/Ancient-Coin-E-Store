import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  private apiUrl = "https://localhost:7084/api/Coin/upload";

  constructor(private http: HttpClient) {}

  public upload(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
}