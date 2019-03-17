package pl.wroclaw.asi.labdaybackendspring.security;



import java.util.Objects;


public class UserTokenResponse {
    String token;

    public UserTokenResponse(String token) {
        this.token = token;
    }

    public UserTokenResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserTokenResponse that = (UserTokenResponse) o;
        return Objects.equals(token, that.token);
    }

    @Override
    public int hashCode() {

        return Objects.hash(token);
    }

    @Override
    public String toString() {
        return "UserTokenResponse{" +
                "token='" + token + '\'' +
                '}';
    }
}
