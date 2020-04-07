package main

import (
	"fmt"
	"github.com/b-esc/carolyns-web/server/router"
	"log"
	"net/http"
)

func main() {
	r := router.Router()
	fmt.Println("Starting server on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
