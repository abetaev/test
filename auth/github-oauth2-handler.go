package lib

import (
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

const GITHUB_OAUTH_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"

// given authorization code request access token
func Authenticate(w http.ResponseWriter, r *http.Request) {

	// read configuration

	clientSecret, set := os.LookupEnv("GITHUB_APP_CLIENT_SECRET")
	if !set {
		panic("env: CLIENT_SECRET not set")
	}

	clientId, set := os.LookupEnv("GITHUB_APP_CLIENT_ID")
	if !set {
		panic("env: CLIENT_ID not set")
	}

	baseURL, set := os.LookupEnv("BASE_URL")
	if !set {
		panic("env: BASE_URL not set")
	}

	// read input

	code, set := r.URL.Query()["code"]
	if !set {
		panic("input: code is not provided")
	}

	// execute request
	urlParams := url.Values{
		"client_id":     {clientId},
		"client_secret": {clientSecret},
		"code":          code,
	}
	resp, err := http.Post(
		GITHUB_OAUTH_ACCESS_TOKEN_URL,
		"application/x-www-form-urlencoded",
		strings.NewReader(urlParams.Encode()),
	)
	if err != nil {
		panic(err)
	}

	// parse response
	token, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	// respond with token
	w.Header().Set("Access-Control-Allow-Origin", baseURL)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Cache-Control", "no-cache")
	w.Write(token)

}
