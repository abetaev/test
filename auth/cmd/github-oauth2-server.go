package main

import (
	"log"
	"net/http"

	lib "a.betaev.pub/auth"
)

func main() {
	log.Default().Print("starting auth server")
	http.HandleFunc("/oauth", lib.Authenticate)
	log.Fatal(http.ListenAndServe(":4320", nil))
}
