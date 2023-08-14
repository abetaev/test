package p

import (
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

const BASE_URL = "https://github.com/login/oauth/access_token"

// minimal github oauth2 flow integration function
func Authenticate(w http.ResponseWriter, r *http.Request) {

	// read configuration

	client_secret, set := os.LookupEnv("CLIENT_SECRET")
	if !set {
		panic("env: CLIENT_SECRET not set")
	}

	client_id, set := os.LookupEnv("CLIENT_ID")
	if !set {
		panic("env: CLIENT_ID not set")
	}

	cors_origin, set := os.LookupEnv("CORS_ORIGIN")
	if !set {
		panic("env: CORS_ORIGIN not set")
	}

	// read input

	code, set := r.URL.Query()["code"]
	if !set {
		panic("input: code is not provided")
	}

	// execute request
	urlParams := url.Values{
		"client_id":     {client_id},
		"client_secret": {client_secret},
		"code":          code,
	}
	resp, err := http.Post(BASE_URL, "application/x-www-form-urlencoded", strings.NewReader(urlParams.Encode()))
	if err != nil {
		panic(err)
	}

	// parse response
	token, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	// respond with token
	w.Header().Set("Access-Control-Allow-Origin", cors_origin)
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Cache-Control", "no-cache")
	w.Write(token)

}
