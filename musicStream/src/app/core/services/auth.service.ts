import { Injectable, Inject, PLATFORM_ID } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable } from "rxjs"
import { map } from "rxjs/operators"
import { JwtHelperService } from "@auth0/angular-jwt"
import { isPlatformBrowser } from "@angular/common"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8084/api/auth"
  private currentUserSubject: BehaviorSubject<any>
  public currentUser: Observable<any>
  private jwtHelper = new JwtHelperService()
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    let storedUser = null;
    if (this.isBrowser) {
      storedUser = localStorage.getItem('currentUser');
    }
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { login, password }).pipe(
      map((response) => {
        if (response && response.token) {
          if (this.isBrowser) {
            localStorage.setItem("currentUser", JSON.stringify(response))
          }
          this.currentUserSubject.next(response)
        }
        return response
      }),
    )
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password })
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem("currentUser")
    }
    this.currentUserSubject.next(null)
  }

  isAuthenticated(): boolean {
    const token = this.currentUserValue?.token
    return token ? !this.jwtHelper.isTokenExpired(token) : false
  }
}

