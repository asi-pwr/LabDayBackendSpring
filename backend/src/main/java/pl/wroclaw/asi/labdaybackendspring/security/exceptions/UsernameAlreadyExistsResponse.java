package pl.wroclaw.asi.labdaybackendspring.security.exceptions;




public class UsernameAlreadyExistsResponse {
    private String responseError;

    public UsernameAlreadyExistsResponse(String responseError) {
        this.responseError = responseError;
    }

    public String getResponseError() {
        return responseError;
    }

    public void setResponseError(String responseError) {
        this.responseError = responseError;
    }
}
